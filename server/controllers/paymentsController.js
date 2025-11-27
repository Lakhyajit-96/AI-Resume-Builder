import axios from 'axios';
import Subscription from '../models/Subscription.js';
import Entitlement from '../models/Entitlement.js';

const PAYPAL_API_BASE = (process.env.PAYPAL_MODE === 'live') ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  const { data } = await axios.post(`${PAYPAL_API_BASE}/v1/oauth2/token`, params, {
    auth: { username: clientId, password: secret },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  return data.access_token;
}

export const getConfig = async (req, res) => {
  return res.json({
    clientId: process.env.PAYPAL_CLIENT_ID || '',
    mode: process.env.PAYPAL_MODE || 'sandbox',
    plans: {
      pro: process.env.PAYPAL_PLAN_ID_PRO || '',
      premium: process.env.PAYPAL_PLAN_ID_PREMIUM || ''
    }
  });
};

export const getEntitlement = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const ent = await Entitlement.findOne({ userId, status: 'active' }).sort({ updatedAt: -1 });
    return res.json({ active: !!ent, planKey: ent?.planKey || null });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const verifySubscription = async (req, res) => {
  try {
    const { subscriptionId, planId, planKey } = req.body;
    const userId = req.userId;
    if (!subscriptionId) return res.status(400).json({ message: 'subscriptionId is required' });

    const token = await getAccessToken();
    const { data } = await axios.get(`${PAYPAL_API_BASE}/v1/billing/subscriptions/${subscriptionId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const status = data.status;
    const nextBillingTime = data.billing_info?.next_billing_time ? new Date(data.billing_info.next_billing_time) : undefined;

    const sub = await Subscription.findOneAndUpdate(
      { subscriptionId },
      { userId, subscriptionId, planId: planId || data.plan_id, status, startTime: data.start_time ? new Date(data.start_time) : undefined, nextBillingTime, raw: data },
      { upsert: true, new: true }
    );

    if (status === 'ACTIVE') {
      await Entitlement.findOneAndUpdate(
        { userId, planKey: planKey || data.plan_id },
        { userId, planKey: planKey || data.plan_id, status: 'active' },
        { upsert: true, new: true }
      );
    }

    return res.json({ status, subscription: sub });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const webhook = async (req, res) => {
  try {
    // Optional: verify webhook signature with PayPal API for higher integrity
    // If PAYPAL_WEBHOOK_ID is present, attempt verification
    if (process.env.PAYPAL_WEBHOOK_ID) {
      try {
        const token = await getAccessToken();
        const verifyBody = {
          transmission_id: req.headers['paypal-transmission-id'],
          transmission_time: req.headers['paypal-transmission-time'],
          cert_url: req.headers['paypal-cert-url'],
          auth_algo: req.headers['paypal-auth-algo'],
          transmission_sig: req.headers['paypal-transmission-sig'],
          webhook_id: process.env.PAYPAL_WEBHOOK_ID,
          webhook_event: req.body,
        };
        const { data: verifyRes } = await axios.post(`${PAYPAL_API_BASE}/v1/notifications/verify-webhook-signature`, verifyBody, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        if (verifyRes.verification_status !== 'SUCCESS') {
          return res.status(400).json({ message: 'Invalid webhook' });
        }
      } catch (err) {
        return res.status(400).json({ message: 'Webhook verification failed' });
      }
    }

    const event = req.body;
    if (event.event_type && event.resource) {
      if (event.event_type.startsWith('BILLING.SUBSCRIPTION.')) {
        const subscriptionId = event.resource.id;
        const status = event.resource.status;
        await Subscription.findOneAndUpdate(
          { subscriptionId },
          { status, raw: event.resource },
          { upsert: true }
        );
      }
    }

    return res.json({ ok: true });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

// Helpers for bootstrap
async function findOrCreateProduct(token, name = 'Resume Builder', description = 'Resume Builder Subscriptions') {
  // Try list products and find by name
  try {
    const { data } = await axios.get(`${PAYPAL_API_BASE}/v1/catalogs/products?page_size=20&total_required=true`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const list = data.products || data.items || [];
    const found = list.find(p => p.name === name);
    if (found) return found.id;
  } catch {}
  // Create
  const body = { name, type: 'SERVICE', category: 'SOFTWARE', description };
  const { data: created } = await axios.post(`${PAYPAL_API_BASE}/v1/catalogs/products`, body, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  return created.id;
}

async function findPlanByName(token, productId, name) {
  try {
    const { data } = await axios.get(`${PAYPAL_API_BASE}/v1/billing/plans?product_id=${encodeURIComponent(productId)}&page_size=20&total_required=true`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const plans = data.plans || data.items || [];
    return plans.find(p => p.name === name);
  } catch { return undefined; }
}

async function createPlan(token, { product_id, name, currency = 'USD', price = '9.99', trial_days = 0 }) {
  const billing_cycles = [];
  if (trial_days && Number(trial_days) > 0) {
    billing_cycles.push({
      frequency: { interval_unit: 'DAY', interval_count: Number(trial_days) },
      tenure_type: 'TRIAL',
      sequence: 1,
      total_cycles: 1
    });
  }
  billing_cycles.push({
    frequency: { interval_unit: 'MONTH', interval_count: 1 },
    tenure_type: 'REGULAR',
    sequence: billing_cycles.length + 1,
    total_cycles: 0,
    pricing_scheme: { fixed_price: { value: String(price), currency_code: currency } }
  });

  const body = {
    product_id,
    name,
    status: 'ACTIVE',
    billing_cycles,
    payment_preferences: {
      auto_bill_outstanding: true,
      setup_fee: { value: '0', currency_code: currency },
      setup_fee_failure_action: 'CONTINUE',
      payment_failure_threshold: 3
    }
  };
  const { data } = await axios.post(`${PAYPAL_API_BASE}/v1/billing/plans`, body, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  return data;
}

export const bootstrapPlans = async (req, res) => {
  try {
    const token = await getAccessToken();
    const {
      currency = 'USD',
      proPrice = '9.99',
      premiumPrice = '19.99',
      trialDays = 7,
      productName = 'Resume Builder'
    } = req.body || {};

    const productId = await findOrCreateProduct(token, productName);

    // Pro
    const proName = 'Pro Monthly';
    let proPlan = await findPlanByName(token, productId, proName);
    if (!proPlan) {
      const created = await createPlan(token, { product_id: productId, name: proName, currency, price: proPrice, trial_days: trialDays });
      proPlan = created;
    }

    // Premium
    const premiumName = 'Premium Monthly';
    let premiumPlan = await findPlanByName(token, productId, premiumName);
    if (!premiumPlan) {
      const created = await createPlan(token, { product_id: productId, name: premiumName, currency, price: premiumPrice, trial_days: trialDays });
      premiumPlan = created;
    }

    return res.json({
      productId,
      pro: { id: proPlan.id || proPlan.plan_id || '', name: proName },
      premium: { id: premiumPlan.id || premiumPlan.plan_id || '', name: premiumName }
    });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

import React, { useEffect, useMemo, useState } from 'react'
import api from '../../configs/api'

const loadScript = (src) => new Promise((resolve, reject) => {
  const s = document.createElement('script')
  s.src = src
  s.onload = resolve
  s.onerror = reject
  document.body.appendChild(s)
})

const Checkout = () => {
  const [config, setConfig] = useState(null)
  const [ready, setReady] = useState(false)
  const [status, setStatus] = useState('')

  const token = useMemo(() => localStorage.getItem('token'), [])

  useEffect(()=>{
    const init = async () => {
      const { data } = await api.get('/api/payments/config')
      setConfig(data)
      if (data.clientId) {
        const qs = new URLSearchParams({ 'client-id': data.clientId, components: 'buttons', intent: 'subscription', vault: 'true' })
        const url = `https://www.paypal.com/sdk/js?${qs.toString()}`
        await loadScript(url)
      }
      setReady(true)
      document.title = 'Checkout | Resume Builder'
    }
    init()
  }, [])

  useEffect(()=>{
    if (!ready || !window.paypal || !config) return
    const container = document.getElementById('paypal-buttons-pro')
    if (container && config.plans?.pro) {
      window.paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'subscribe' },
        createSubscription: (data, actions) => actions.subscription.create({ plan_id: config.plans.pro }),
        onApprove: async (data) => {
          try {
            const res = await api.post('/api/payments/verify-subscription', { subscriptionId: data.subscriptionID, planId: config.plans.pro, planKey: 'pro' }, { headers: { Authorization: token } })
            setStatus(`Subscription active: ${res.data.status}`)
          } catch (e) { setStatus(e?.response?.data?.message || e.message) }
        },
        onCancel: () => setStatus('Payment cancelled'),
        onError: (err) => setStatus(err?.message || 'Payment error')
      }).render('#paypal-buttons-pro')
    }
    const container2 = document.getElementById('paypal-buttons-premium')
    if (container2 && config.plans?.premium) {
      window.paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'subscribe' },
        createSubscription: (data, actions) => actions.subscription.create({ plan_id: config.plans.premium }),
        onApprove: async (data) => {
          try {
            const res = await api.post('/api/payments/verify-subscription', { subscriptionId: data.subscriptionID, planId: config.plans.premium, planKey: 'premium' }, { headers: { Authorization: token } })
            setStatus(`Subscription active: ${res.data.status}`)
          } catch (e) { setStatus(e?.response?.data?.message || e.message) }
        },
        onCancel: () => setStatus('Payment cancelled'),
        onError: (err) => setStatus(err?.message || 'Payment error')
      }).render('#paypal-buttons-premium')
    }
  }, [ready, config, token])

  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 lg:px-12 py-10">
      <h1 className="text-2xl font-semibold text-slate-800">Upgrade</h1>
      <p className="text-slate-600 mt-1">Subscribe securely with PayPal.</p>

      {!config?.clientId && (
        <div className="mt-4 text-sm text-slate-700 rounded-md border border-yellow-200 bg-yellow-50 p-3">PayPal is not configured. Provide PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_PLAN_ID_PRO/PREMIUM on the server.</div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <p className="text-lg font-semibold text-slate-800">Pro</p>
          <div id="paypal-buttons-pro" className="mt-3" />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <p className="text-lg font-semibold text-slate-800">Premium</p>
          <div id="paypal-buttons-premium" className="mt-3" />
        </div>
      </div>

      {!!status && <p className="mt-6 text-green-700">{status}</p>}
    </div>
  )
}

export default Checkout


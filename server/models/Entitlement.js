import mongoose from 'mongoose';

const EntitlementSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  planKey: { type: String },
  status: { type: String, default: 'active' },
  source: { type: String, default: 'paypal' },
  expiresAt: { type: Date },
}, { timestamps: true });

const Entitlement = mongoose.model('Entitlement', EntitlementSchema);
export default Entitlement;

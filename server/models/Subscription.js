import mongoose from 'mongoose';

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  subscriptionId: { type: String, unique: true, index: true },
  planId: { type: String },
  status: { type: String },
  startTime: { type: Date },
  nextBillingTime: { type: Date },
  raw: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

const Subscription = mongoose.model('Subscription', SubscriptionSchema);
export default Subscription;

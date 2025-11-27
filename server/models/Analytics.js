import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', index: true },
  event: { type: String, enum: ['view', 'download', 'share'], index: true },
  meta: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

const Analytics = mongoose.model('Analytics', AnalyticsSchema);
export default Analytics;

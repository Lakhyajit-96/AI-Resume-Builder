import mongoose from 'mongoose';

const ShareLinkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', index: true },
  token: { type: String, unique: true, index: true },
  role: { type: String, default: 'comment' },
  expiresAt: { type: Date },
}, { timestamps: true });

ShareLinkSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, partialFilterExpression: { expiresAt: { $type: 'date' } } });

const ShareLink = mongoose.model('ShareLink', ShareLinkSchema);
export default ShareLink;

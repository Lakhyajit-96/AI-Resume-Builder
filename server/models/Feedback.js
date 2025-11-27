import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  shareLinkId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShareLink', index: true },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', index: true },
  authorName: { type: String },
  authorEmail: { type: String },
  comment: { type: String, required: true },
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', FeedbackSchema);
export default Feedback;

import mongoose from 'mongoose';

const CoverLetterSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', index: true },
  jobText: { type: String },
  language: { type: String, default: 'en' },
  content: { type: String, required: true },
}, { timestamps: true });

const CoverLetter = mongoose.model('CoverLetter', CoverLetterSchema);
export default CoverLetter;

import mongoose from 'mongoose';

const ResumeTranslationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', index: true },
  language: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true, minimize: false });

const ResumeTranslation = mongoose.model('ResumeTranslation', ResumeTranslationSchema);
export default ResumeTranslation;

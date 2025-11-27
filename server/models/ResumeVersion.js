import mongoose from 'mongoose';

const ResumeVersionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', index: true },
  title: { type: String },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
}, { timestamps: true, minimize: false });

const ResumeVersion = mongoose.model('ResumeVersion', ResumeVersionSchema);
export default ResumeVersion;

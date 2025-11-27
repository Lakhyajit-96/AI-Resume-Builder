import mongoose from 'mongoose';

const AIAuditSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resume', index: true },
  action: { type: String, required: true },
  jobText: { type: String },
  input: { type: mongoose.Schema.Types.Mixed },
  score: { type: Number },
  insights: { type: mongoose.Schema.Types.Mixed },
  result: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

const AIAudit = mongoose.model('AIAudit', AIAuditSchema);
export default AIAudit;

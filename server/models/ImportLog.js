import mongoose from 'mongoose';

const ImportLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  filename: { type: String },
  filetype: { type: String },
  size: { type: Number },
  status: { type: String, enum: ['success', 'error'] },
  error: { type: String },
  mappedCounts: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

const ImportLog = mongoose.model('ImportLog', ImportLogSchema);
export default ImportLog;

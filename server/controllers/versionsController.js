import Resume from '../models/Resume.js';
import ResumeVersion from '../models/ResumeVersion.js';

export const createSnapshot = async (req, res) => {
  try {
    const { resumeId, title } = req.body;
    const userId = req.userId;
    if (!resumeId) return res.status(400).json({ message: 'resumeId required' });
    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    const data = JSON.parse(JSON.stringify(resume));
    delete data._id;
    delete data.__v;
    const ver = await ResumeVersion.create({ userId, resumeId, title: title || `Snapshot ${new Date().toISOString()}`, data });
    return res.json({ id: ver._id });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const listSnapshots = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const userId = req.userId;
    const items = await ResumeVersion.find({ resumeId, userId }).sort({ createdAt: -1 }).limit(50);
    return res.json({ items });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const restoreSnapshot = async (req, res) => {
  try {
    const { versionId } = req.params;
    const userId = req.userId;
    const ver = await ResumeVersion.findOne({ _id: versionId, userId });
    if (!ver) return res.status(404).json({ message: 'Version not found' });
    const resumeId = ver.resumeId;
    const data = JSON.parse(JSON.stringify(ver.data));
    await Resume.findOneAndUpdate({ _id: resumeId, userId }, data, { new: true });
    return res.json({ ok: true });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

import crypto from 'crypto';
import ShareLink from '../models/ShareLink.js';
import Feedback from '../models/Feedback.js';
import Resume from '../models/Resume.js';

export const createLink = async (req, res) => {
  try {
    const { resumeId, role = 'comment', expiresInDays } = req.body;
    const userId = req.userId;
    if (!resumeId) return res.status(400).json({ message: 'resumeId required' });
    const token = crypto.randomBytes(16).toString('hex');
    let expiresAt;
    if (expiresInDays) {
      const d = new Date();
      d.setDate(d.getDate() + Number(expiresInDays));
      expiresAt = d;
    }
    const link = await ShareLink.create({ userId, resumeId, token, role, expiresAt });
    return res.json({ token: link.token, role: link.role, expiresAt: link.expiresAt });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const resolveLink = async (req, res) => {
  try {
    const { token } = req.params;
    const link = await ShareLink.findOne({ token });
    if (!link) return res.status(404).json({ message: 'Not found' });
    return res.json({ resumeId: link.resumeId, role: link.role });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const addFeedback = async (req, res) => {
  try {
    const { token } = req.params;
    const { authorName, authorEmail, comment } = req.body;
    const link = await ShareLink.findOne({ token });
    if (!link) return res.status(404).json({ message: 'Not found' });
    const fb = await Feedback.create({ shareLinkId: link._id, resumeId: link.resumeId, authorName, authorEmail, comment });
    return res.json({ id: fb._id });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const listFeedback = async (req, res) => {
  try {
    const { token } = req.params;
    const link = await ShareLink.findOne({ token });
    if (!link) return res.status(404).json({ message: 'Not found' });
    const items = await Feedback.find({ shareLinkId: link._id }).sort({ createdAt: -1 });
    return res.json({ items });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

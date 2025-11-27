import Analytics from '../models/Analytics.js';
import mongoose from 'mongoose';

export const track = async (req, res) => {
  try {
    const { resumeId, event, meta } = req.body;
    if (!resumeId || !event) return res.status(400).json({ message: 'resumeId and event are required' });
    const userId = req.userId || undefined;
    const rec = await Analytics.create({ userId, resumeId, event, meta });
    return res.json({ id: rec._id });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const summary = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const agg = await Analytics.aggregate([
      { $match: { resumeId: new mongoose.Types.ObjectId(resumeId) } },
      { $group: { _id: '$event', count: { $sum: 1 } } }
    ]);
    const out = agg.reduce((acc, cur) => { acc[cur._id] = cur.count; return acc; }, {});
    return res.json(out);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

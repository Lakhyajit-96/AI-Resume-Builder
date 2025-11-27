import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs';
import ImportLog from '../models/ImportLog.js';

export const uploadAndExtract = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.userId;
    if (!file) return res.status(400).json({ message: 'file is required' });

    let text = '';
    try {
      if (file.mimetype === 'application/pdf') {
        const data = await pdfParse(fs.readFileSync(file.path));
        text = data.text || '';
      } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.originalname.endsWith('.docx')) {
        const result = await mammoth.extractRawText({ buffer: fs.readFileSync(file.path) });
        text = result.value || '';
      } else {
        text = fs.readFileSync(file.path, 'utf8');
      }
    } catch (err) {
      await ImportLog.create({ userId, filename: file.originalname, filetype: file.mimetype, size: file.size, status: 'error', error: err.message });
      return res.status(400).json({ message: 'Failed to parse file' });
    }

    // naive mapping preview (non-AI): split into lines and detect email/phone
    const preview = { professional_summary: '', skills: [], personal_info: {}, experience: [], education: [], project: [] };
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const email = (text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [])[0];
    if (email) preview.personal_info.email = email;

    await ImportLog.create({ userId, filename: file.originalname, filetype: file.mimetype, size: file.size, status: 'success', mappedCounts: { lines: lines.length } });
    return res.json({ text, preview });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

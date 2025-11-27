import axios from 'axios';
import { load } from 'cheerio';

export const fetchJob = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: 'url required' });
    const { data: html } = await axios.get(url, { timeout: 6000, headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $ = load(html);
    const text = $('body').text().replace(/\s+/g, ' ').trim();
    const jobText = text.slice(0, 20000);
    return res.json({ jobText });
  } catch (e) {
    return res.status(400).json({ message: 'Failed to fetch job page' });
  }
};

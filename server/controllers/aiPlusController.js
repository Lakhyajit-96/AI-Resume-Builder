import ai from '../configs/ai.js';
import Resume from '../models/Resume.js';
import AIAudit from '../models/AIAudit.js';
import CoverLetter from '../models/CoverLetter.js';
import ResumeTranslation from '../models/ResumeTranslation.js';

export const scoreResumeVsJob = async (req, res) => {
  try {
    const { resumeId, jobText } = req.body;
    const userId = req.userId;
    if (!resumeId || !jobText) return res.status(400).json({ message: 'resumeId and jobText are required' });

    const resume = await Resume.findById(resumeId);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    const system = 'You are an ATS and recruiter expert. Score how well the resume fits the job description. Return JSON with keys: score (0-100), insights (array of strings), skill_gaps (array of strings). Only return JSON.';
    const user = `Resume JSON: ${JSON.stringify(resume)}\nJob Description: ${jobText}`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [ { role: 'system', content: system }, { role: 'user', content: user } ],
      response_format: { type: 'json_object' }
    });

    let out = {};
    try { out = JSON.parse(response.choices?.[0]?.message?.content || '{}'); } catch {}

    await AIAudit.create({ userId, resumeId, action: 'score', jobText, input: {}, score: out.score, insights: { insights: out.insights, skill_gaps: out.skill_gaps }, result: out });
    return res.json(out);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const metricizeBullets = async (req, res) => {
  try {
    const { bullets } = req.body;
    const userId = req.userId;
    if (!Array.isArray(bullets) || bullets.length === 0) return res.status(400).json({ message: 'bullets array required' });

    const system = 'Rewrite each resume bullet to include impactful, quantified results when possible. Return JSON { improved: string[] } with the same order. No extra text.';
    const user = JSON.stringify({ bullets });
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [ { role: 'system', content: system }, { role: 'user', content: user } ],
      response_format: { type: 'json_object' }
    });
    let out = {};
    try { out = JSON.parse(response.choices?.[0]?.message?.content || '{}'); } catch {}

    await AIAudit.create({ userId, action: 'metricize', input: { bullets }, result: out });
    return res.json(out);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const generateCoverLetter = async (req, res) => {
  try {
    const { resumeId, jobText, language = 'en' } = req.body;
    const userId = req.userId;
    if (!resumeId || !jobText) return res.status(400).json({ message: 'resumeId and jobText are required' });

    const resume = await Resume.findById(resumeId);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    const system = 'Write a concise, personalized cover letter (150-250 words) based on the resume JSON and job description. Use a professional tone and the given language. Only return the letter text, no salutations if not provided.';
    const user = `Language: ${language}\nResume JSON: ${JSON.stringify(resume)}\nJob Description: ${jobText}`;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [ { role: 'system', content: system }, { role: 'user', content: user } ]
    });
    const content = response.choices?.[0]?.message?.content || '';

    const letter = await CoverLetter.create({ userId, resumeId, jobText, language, content });
    await AIAudit.create({ userId, resumeId, action: 'cover_letter', jobText, input: { language }, result: { content } });
    return res.json({ id: letter._id, content });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const translateResume = async (req, res) => {
  try {
    const { resumeId, language } = req.body;
    const userId = req.userId;
    if (!resumeId || !language) return res.status(400).json({ message: 'resumeId and language are required' });

    const resume = await Resume.findById(resumeId);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    const system = 'Translate the provided resume JSON into the requested language. Preserve structure and keys, only translate string values. Return pure JSON.';
    const user = `Language: ${language}\nResume JSON: ${JSON.stringify(resume)}`;
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [ { role: 'system', content: system }, { role: 'user', content: user } ],
      response_format: { type: 'json_object' }
    });

    let data = {};
    try { data = JSON.parse(response.choices?.[0]?.message?.content || '{}'); } catch {}

    const saved = await ResumeTranslation.create({ userId, resumeId, language, data });
    await AIAudit.create({ userId, resumeId, action: 'translate', input: { language }, result: data });
    return res.json({ id: saved._id, language, data });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const projectCards = async (req, res) => {
  try {
    const { projects } = req.body;
    if (!Array.isArray(projects) || projects.length === 0) return res.status(400).json({ message: 'projects array required' });
    const system = 'For each project (name, type, description), generate a concise card description and 2-3 achievement bullets. Return JSON { cards: Array<{ name, summary, bullets: string[] }> }.';
    const user = JSON.stringify({ projects });
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [ { role: 'system', content: system }, { role: 'user', content: user } ],
      response_format: { type: 'json_object' }
    });
    let out = {};
    try { out = JSON.parse(response.choices?.[0]?.message?.content || '{}'); } catch {}
    return res.json(out);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const normalizeTone = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'text required' });
    const system = 'Rewrite text for clarity, active voice, and professional tone, preserving meaning. Only return the improved text.';
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [ { role: 'system', content: system }, { role: 'user', content: text } ]
    });
    const improved = response.choices?.[0]?.message?.content || '';
    return res.json({ improved });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

export const a11yCheck = async (req, res) => {
  try {
    const { sections } = req.body;
    if (!sections) return res.status(400).json({ message: 'sections required' });
    // Lightweight local checks
    const warnings = [];
    const text = JSON.stringify(sections).toLowerCase();
    if (text.includes('click here')) warnings.push('Avoid link text like "click here"; use descriptive labels.');
    if ((text.match(/\bvery\b/g) || []).length > 10) warnings.push('Reduce filler words for concision.');
    return res.json({ warnings });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

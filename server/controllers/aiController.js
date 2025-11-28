import ai from '../configs/ai.js';
import Resume from '../models/Resume.js';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs/promises';
import path from 'path';

const buildFallbackResumeData = (resumeText = '') => {
    const lines = resumeText.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    const summary = lines.slice(0, 4).join(' ').slice(0, 800);
    const emailMatch = resumeText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    const phoneMatch = resumeText.match(/(\+?\d[\d\s().-]{7,})/);
    const skillLine = lines.find(line => /skills?/i.test(line));
    const skills = skillLine
        ? skillLine.replace(/skills?:/i, '')
            .split(/[,•|]/)
            .map(skill => skill.trim())
            .filter(Boolean)
            .slice(0, 20)
        : [];

    return {
        professional_summary: summary,
        skills,
        personal_info: {
            full_name: '',
            image: '',
            email: emailMatch?.[0] || '',
            phone: phoneMatch?.[0]?.trim() || '',
            location: '',
            profession: '',
            linkedin: '',
            website: '',
        },
        experience: [],
        project: [],
        education: [],
    };
};

const extractionInstructions = `You are an expert AI Agent. Extract every possible resume detail and return ONLY valid JSON matching this schema:
{
  professional_summary: string,
  skills: string[],
  personal_info: {
    full_name: string,
    image: string,
    email: string,
    phone: string,
    location: string,
    profession: string,
    linkedin: string,
    website: string,
  },
  experience: [{ position: string, company: string, start_date: string, end_date: string, description: string, is_current: boolean }],
  project: [{ name: string, type: string, description: string }],
  education: [{ institution: string, degree: string, field: string, graduation_date: string, gpa: string }]
}`;

const callGeminiExtraction = async (resumeText) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL;
    if (!apiKey || !model) {
        return null;
    }

    const base = process.env.GEMINI_API_BASE || 'https://generativelanguage.googleapis.com/v1beta';
    const normalizedModel = model.startsWith('models/') ? model : `models/${model}`;
    const endpoint = `${base}/${normalizedModel}:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: `${extractionInstructions}\nResume Content:\n${resumeText}`,
                        },
                    ],
                },
            ],
            generationConfig: {
                responseMimeType: 'application/json',
            },
        }),
    });

    if (!response.ok) {
        throw new Error(`Gemini extraction failed: ${response.status} ${response.statusText}`);
    }

    const payload = await response.json();
    const content = payload?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) {
        throw new Error('Gemini extraction returned empty content');
    }
    return JSON.parse(content);
};

async function extractTextFromFile(file) {
    if (!file) return '';
    const ext = path.extname(file.originalname || '').toLowerCase();
    const buffer = await fs.readFile(file.path);
    if (ext === '.pdf') {
        const parsed = await pdfParse(buffer);
        return parsed?.text || '';
    }
    if (ext === '.docx') {
        const result = await mammoth.extractRawText({ buffer });
        return result?.value || '';
    }
    throw new Error('Unsupported file format. Please upload a PDF or DOCX resume.');
}

const extractResumeDataWithAI = async (resumeText) => {
    if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
        return { data: null, source: 'fallback' };
    }

    const systemPrompt = 'You are an expert AI Agent to extract data from resume.';
    const userPrompt = `${extractionInstructions}\nResume Content:\n${resumeText}`;

    try {
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            response_format: { type: 'json_object' },
        });

        const extractedData = response.choices[0].message.content;
        return { data: JSON.parse(extractedData), source: 'openai' };
    } catch (openAIError) {
        console.warn('OpenAI compatible extraction failed, attempting Gemini:', openAIError.message);
        try {
            const geminiData = await callGeminiExtraction(resumeText);
            if (geminiData) {
                return { data: geminiData, source: 'gemini' };
            }
        } catch (geminiError) {
            console.warn('Gemini extraction failed:', geminiError.message);
        }
        return { data: null, source: 'fallback' };
    }
};

// controller for enhancing a resume's professional summary
// POST:: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else." },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// controller for enhancing a resume's job description
// POST: /api/ai/enhance/job-description
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;

        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentence also highlighting key responsibilities, and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. and only return text no options or anything else." },
                {
                    role: "user",
                    content: userContent,
                },
            ],
        })

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// controller for uploading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        const { resumeText: incomingText, title } = req.body;
        const userId = req.userId;
        let resumeText = incomingText;

        try {
            if (req.file) {
                resumeText = await extractTextFromFile(req.file);
            }
        } catch (fileErr) {
            return res.status(400).json({ message: fileErr.message });
        } finally {
            if (req.file?.path) {
                fs.unlink(req.file.path).catch(()=>{});
            }
        }

        resumeText = resumeText?.toString().trim();

        // If we couldn't extract any text on the client (e.g. image-only/scanned PDF),
        // still create a minimal resume instead of failing the request.
        if (!resumeText) {
            const fallbackData = buildFallbackResumeData('');
            const newResume = await Resume.create({
                ...fallbackData,
                title: title?.trim() || 'Imported Resume',
                userId,
            });
            return res.json({ resumeId: newResume._id, parsedWith: 'fallback-empty' });
        }

        let parsedData = null;
        let source = 'fallback';

        try {
            const aiResult = await extractResumeDataWithAI(resumeText);
            parsedData = aiResult.data;
            source = aiResult.source;
        } catch (aiError) {
            console.warn('AI extraction failed, using fallback parser:', aiError.message);
        }

        if (!parsedData) {
            parsedData = buildFallbackResumeData(resumeText);
        }

        const newResume = await Resume.create({
            ...parsedData,
            title: title?.trim() || 'Imported Resume',
            userId,
        });

        res.json({ resumeId: newResume._id, parsedWith: source });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
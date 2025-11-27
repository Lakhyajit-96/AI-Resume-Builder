import ai from '../configs/ai.js';
import Resume from '../models/Resume.js';

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

const extractResumeDataWithAI = async (resumeText) => {
    if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
        return { data: null, source: 'fallback' };
    }

    const systemPrompt = 'You are an expert AI Agent to extract data from resume.';
    const userPrompt = `extract data from this resume: ${resumeText} 
        Provide data in the following JSON format with no additional text before or after:
        {
        professional_summary: {type: String, default: ""},
        skills: [{type: String}],
        personal_info: {
            full_name: {type: String, default: ""},
            image: {type: String, default: ""},
            email: {type: String, default: ""},
            phone: {type: String, default: ""},
            location: {type: String, default: ""},
            profession: {type: String, default: ""},
            linkedin: {type: String, default: ""},
            website: {type: String, default: ""},
        },
        experience: [
            {
                position: {type: String},
                company: {type: String},
                start_date: {type: String},
                end_date: {type: String},
                description: {type: String},
                is_current: {type: Boolean},
            }
        ],
        project: [
            {
                name: {type: String},
                type: {type: String},
                description: {type: String},
            }
        ],
        education: [
            {
                institution: {type: String},
                degree: {type: String},
                field: {type: String},
                graduation_date: {type: String},
                gpa: {type: String},
            }
        ],
        }`;

    const response = await ai.chat.completions.create({
        model: process.env.OPENAI_MODEL,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
    });

    const extractedData = response.choices[0].message.content;
    return { data: JSON.parse(extractedData), source: 'ai' };
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
        const { resumeText, title } = req.body;
        const userId = req.userId;

        if (!resumeText) {
            return res.status(400).json({ message: 'Missing required fields' });
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
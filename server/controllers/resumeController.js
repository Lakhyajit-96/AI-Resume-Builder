import Resume from '../models/Resume.js';
import imagekit from '../configs/imageKit.js';
import fs from 'fs';

// controller for creating a new resume
// POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const {title} = req.body;

        // create new resume
        const newResume = await Resume.create({title, userId});
        // return success message
        return res.status(201).json({message: 'Resume created successfully', resume: newResume});
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for deleting a resume
// DELETE: /api/resumes/delete
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const {resumeId} = req.params;

        await Resume.findOneAndDelete({_id: resumeId, userId});

        // return success message
        return res.status(200).json({message: 'Resume deleted successfully'});
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// get user resume by id
// GET: /api/resumes/get
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const {resumeId} = req.params;

        const resume = await Resume.findOne({_id: resumeId, userId});

        if(!resume) {
            return res.status(404).json({message: 'Resume not found'});
        }

        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({resume});

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// get resume by id public
// GET: /api/resumes/public
export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({_id: resumeId, public: true});

        if(!resume) {
            return res.status(404).json({message: 'Resume not found'});
        }

        return res.status(200).json({resume});

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for updating a resume
// PUT: /api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        let resumeDataCopy = JSON.parse(resumeData);
        // make sure personal_info object always exists so we don't crash on image assignment
        if (!resumeDataCopy.personal_info || typeof resumeDataCopy.personal_info !== 'object') {
            resumeDataCopy.personal_info = {};
        }

        if (image) {
            const imageBufferData = fs.createReadStream(image.path);
            try {
                const response = await imagekit.files.upload({
                    file: imageBufferData,
                    fileName: 'resume.png',
                    folder: 'user-resumes',
                    transformation: {
                        pre: 'w-300, h-300, fo-face, z-0.75' + (removeBackground ? ',e-bgremove' : '')
                    }
                });

                // only overwrite image if we actually received a valid URL
                if (response && response.url) {
                    resumeDataCopy.personal_info.image = response.url;
                }
            } catch (uploadErr) {
                // if upload fails, keep existing image and continue with other updates
                console.warn('Image upload failed, keeping existing avatar:', uploadErr.message || uploadErr);
            }
        }

        const resume = await Resume.findByIdAndUpdate({ _id: resumeId, userId}, resumeDataCopy, {new: true});

        return res.status(200).json({message: 'Saved successfully', resume});
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}
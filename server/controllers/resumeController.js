import Resume from '../models/Resume.js';
import imagekit from '../configs/imageKit.js';
import fs from 'fs';
import fsPromises from 'fs/promises';

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
        if (!resumeId) {
            return res.status(400).json({ message: 'Resume ID is required' });
        }
        if (!resumeData) {
            return res.status(400).json({ message: 'Missing resume data' });
        }

        const shouldRemoveBackground = removeBackground === 'true' || removeBackground === true;
        const image = req.file;

        let resumeDataCopy = JSON.parse(resumeData);
        if (!resumeDataCopy.personal_info || typeof resumeDataCopy.personal_info !== 'object') {
            resumeDataCopy.personal_info = {};
        }

        // Store existing image before any modifications
        let existingImage = null;
        
        // Use findOneAndUpdate for atomic check-and-update to prevent race conditions
        // First, fetch existing resume to get current image
        const existingResume = await Resume.findOne({ _id: resumeId, userId });
        if (!existingResume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        
        existingImage = existingResume.personal_info?.image;
        const personalInfo = resumeDataCopy.personal_info;
        const userProvidedImageField = Object.prototype.hasOwnProperty.call(personalInfo, 'image');

        // Always preserve existing image unless explicitly removed or replaced
        if (!userProvidedImageField && existingImage) {
            personalInfo.image = existingImage;
        }

        if (image) {
            // New image file provided - attempt upload
            const imageBufferData = fs.createReadStream(image.path);
            try {
                const response = await imagekit.files.upload({
                    file: imageBufferData,
                    fileName: `resume-${resumeId}-${Date.now()}.png`,
                    folder: 'user-resumes',
                    transformation: {
                        pre: 'w-300, h-300, fo-face, z-0.75' + (shouldRemoveBackground ? ',e-bgremove' : '')
                    }
                });

                if (response && response.url) {
                    personalInfo.image = response.url;
                } else {
                    // Upload succeeded but no URL returned - preserve existing image
                    personalInfo.image = existingImage || personalInfo.image || '';
                }
            } catch (uploadErr) {
                console.warn('Image upload failed, keeping existing avatar:', uploadErr.message || uploadErr);
                // Always preserve existing image on upload failure - never delete when upload was attempted
                personalInfo.image = existingImage || personalInfo.image || '';
            }
        } else {
            // No new image file uploaded - only delete if user explicitly removed it
            // This check ensures we only delete when !image (no upload was attempted)
            if (userProvidedImageField && (!personalInfo.image || personalInfo.image === '')) {
                // User explicitly removed image (sent empty/null) AND no file was uploaded
                delete personalInfo.image;
            } else if (!userProvidedImageField && existingImage) {
                // User didn't touch image field - preserve existing
                personalInfo.image = existingImage;
            }
            // If userProvidedImageField is true and personalInfo.image has a value, keep it
        }

        delete resumeDataCopy._id;
        delete resumeDataCopy.userId;
        delete resumeDataCopy.__v;
        delete resumeDataCopy.createdAt;
        delete resumeDataCopy.updatedAt;

        // Use findOneAndUpdate for atomic operation to prevent race conditions
        // If resume is deleted between check and update, this will return null
        const updatedResume = await Resume.findOneAndUpdate(
            { _id: resumeId, userId },
            { $set: resumeDataCopy },
            { new: true, runValidators: true }
        );

        if (!updatedResume) {
            return res.status(404).json({ message: 'Resume not found or was deleted' });
        }

        return res.status(200).json({message: 'Saved successfully', resume: updatedResume});
    } catch (error) {
        return res.status(400).json({message: error.message})
    } finally {
        if (req?.file?.path) {
            fsPromises.unlink(req.file.path).catch(()=>{});
        }
    }
}
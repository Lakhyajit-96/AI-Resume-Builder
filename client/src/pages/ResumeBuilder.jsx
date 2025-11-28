import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from "../assets/assets.js";
import api from "../configs/api.js";
import { toast } from 'react-hot-toast';
import {
    ArrowLeftIcon, User, FileText, Briefcase, GraduationCap, FolderIcon, Sparkles, ChevronLeftIcon,
    ChevronRightIcon, Share2Icon, EyeIcon, EyeOffIcon, DownloadIcon, LoaderCircleIcon
} from "lucide-react";
import {Link} from "react-router-dom";
import PersonalInfoForm from '../components/PersonalInfoForm';
import ResumePreview from "../components/ResumePreview.jsx";
import TemplateSelector from "../components/TemplateSelector.jsx";
import ColorPicker from "../components/ColorPicker.jsx";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm.jsx";
import ExperienceForm from "../components/ExperienceForm.jsx";
import EducationForm from "../components/EducationForm.jsx";
import ProjectForm from "../components/ProjectForm.jsx";
import SkillsForm from "../components/SkillsForm.jsx";

const ResumeBuilder = () => {

    const { resumeId } = useParams()

    const [resumeData, setResumeData] = useState({
        _id: '',
        title: '',
        personal_info: {},
        professional_summary: "",
        experience: [],
        education: [],
        project: [],
        skills: [],
        template: "classic",
        accent_color: "#3B82F6",
        public: false,
    })

    const [activeSectionIndex, setActiveSectionIndex] = useState(0)
    const [removeBackground, setRemoveBackground] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [hasEntitlement, setHasEntitlement] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const previewUrlRef = useRef(null);

    const cleanupPreviewUrl = useCallback(()=>{
        if(previewUrlRef.current){
            URL.revokeObjectURL(previewUrlRef.current);
            previewUrlRef.current = null;
        }
    },[])

    // remove standalone loadExistingResume and call it inside useEffect to satisfy hooks lint rule

    useEffect(()=>{
        const loadExistingResume = async () => {
            // First try to load from backend using real resumeId
            try {
                const token = localStorage.getItem('token')
                if (token) {
                    const { data } = await api.get(`/api/resumes/get/${resumeId}`, { headers: { Authorization: token } })
                    if (data?.resume) {
                        cleanupPreviewUrl();
                        setAvatarFile(null);
                        const normalizedResume = {
                            ...data.resume,
                            personal_info: data.resume.personal_info || {}
                        };
                        setResumeData(normalizedResume)
                        document.title = normalizedResume.title || 'Resume Builder'
                        return
                    }
                }
            } catch (e) {
                // silently fall back to local defaults/dummy data
            }

            // Fallback: try from dummy data (keeps previous behavior for non-auth flows)
            const resume = dummyResumeData.find(resume => resume._id === resumeId)
            if(resume){
                cleanupPreviewUrl();
                setAvatarFile(null);
                setResumeData({
                    ...resume,
                    personal_info: resume.personal_info || {}
                })
                document.title = resume.title
            } else {
                // if no resume loaded, attempt to apply locally saved template
                try{
                    const stored = localStorage.getItem('selected_template')
                    if(stored){
                        setResumeData(prev => ({...prev, template: stored}))
                    }
                }catch(e){}
                // try to restore accent color as well
                try{
                    const accent = localStorage.getItem('selected_accent')
                    if(accent){
                        setResumeData(prev => ({...prev, accent_color: accent}))
                    }
                }catch(e){}
            }
        }
        loadExistingResume()
    },[resumeId, cleanupPreviewUrl])

    useEffect(()=>{
        return ()=> cleanupPreviewUrl()
    },[cleanupPreviewUrl])

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token) return
        const run = async ()=>{
            try{
                const { data } = await api.get('/api/payments/entitlement', { headers: { Authorization: token }})
                setHasEntitlement(!!data?.active)
            }catch(e){}
        }
        run()
    },[])

    const handleAvatarSelect = useCallback((file)=>{
        cleanupPreviewUrl()
        if(!file){
            setAvatarFile(null)
            setResumeData(prev => ({
                ...prev,
                personal_info: {
                    ...(prev.personal_info || {}),
                    image: ''
                }
            }))
            return
        }
        const previewUrl = URL.createObjectURL(file)
        previewUrlRef.current = previewUrl
        setAvatarFile(file)
        setResumeData(prev => ({
            ...prev,
            personal_info: {
                ...(prev.personal_info || {}),
                image: previewUrl
            }
        }))
    },[cleanupPreviewUrl])

    const sections = [
        { id: "personal", name: "Personal Info", icon: User },
        { id: "summary", name: "Summary", icon: FileText },
        { id: "experience", name: "Experience", icon: Briefcase },
        { id: "education", name: "Education", icon: GraduationCap },
        { id: "projects", name: "Projects", icon: FolderIcon },
        { id: "skills", name: "Skills", icon: Sparkles },
    ]

    const activeSection = sections[activeSectionIndex]

    const saveResume = useCallback(async ({ silent = false, forceBackgroundProcessing = false } = {})=>{
        if(isSaving) return;
        const token = localStorage.getItem('token');
        if(!token){
            toast.error('Please log in to save your resume');
            return;
        }
        const shouldRemoveBg = forceBackgroundProcessing ? true : removeBackground;
        try{
            setIsSaving(true);
            const formData = new FormData();
            const payload = JSON.parse(JSON.stringify({
                ...resumeData,
                personal_info: { ...(resumeData.personal_info || {}) }
            }));
            if(payload.personal_info?.image){
                const previewValue = payload.personal_info.image;
                if(previewValue.startsWith('blob:') || previewValue.startsWith('data:')){
                    delete payload.personal_info.image;
                }
            }
            delete payload._id;
            delete payload.userId;
            delete payload.__v;
            delete payload.createdAt;
            delete payload.updatedAt;
            formData.append('resumeId', resumeId);
            formData.append('resumeData', JSON.stringify(payload));

            let imageFile = avatarFile;
            const currentImage = resumeData.personal_info?.image;
            if(!imageFile && shouldRemoveBg && currentImage){
                try{
                    const response = await fetch(currentImage);
                    const blob = await response.blob();
                    imageFile = new File([blob], 'resume-avatar.png', { type: blob.type || 'image/png' });
                }catch(fetchErr){
                    console.warn('Failed to refetch avatar for background removal', fetchErr);
                }
            }

            if(imageFile){
                formData.append('image', imageFile);
                if(shouldRemoveBg){
                    formData.append('removeBackground', 'true');
                }
            }

            const { data } = await api.put('/api/resumes/update', formData, { headers: { Authorization: token }});
            if(data?.resume){
                cleanupPreviewUrl();
                setAvatarFile(null);
                setResumeData({
                    ...data.resume,
                    personal_info: data.resume.personal_info || {}
                });
            }
            if(shouldRemoveBg){
                setRemoveBackground(false);
            }
            if(!silent){
                toast.success(data?.message || 'Saved successfully');
            }
        }catch(error){
            toast.error(error?.response?.data?.message || error.message || 'Failed to save');
        }finally{
            setIsSaving(false);
        }
    },[avatarFile, cleanupPreviewUrl, isSaving, removeBackground, resumeData, resumeId])

    useEffect(()=>{
        const hasProcessableImage = avatarFile || resumeData.personal_info?.image;
        if(removeBackground && hasProcessableImage){
            saveResume({ silent: true, forceBackgroundProcessing: true });
        }
    },[avatarFile, removeBackground, resumeData.personal_info?.image, saveResume])

    const changeResumeVisibility = async () => {
        setResumeData({...resumeData, public: !resumeData.public})
    }

    const handleShare = () => {
        const frontendUrl = window.location.href.split('/app/')[0]
        const resumeUrl = frontendUrl + '/view/' + resumeId;

        // track share intent
        try{ api.post('/api/analytics/track', { resumeId, event: 'share', meta: { type: 'native' } }) }catch(e){}

        if(navigator.share){
            navigator.share({
                text: 'My Resume',
                url: resumeUrl
            })
        } else {
            alert('Share not supported on this browser.')
        }
    }

    const downloadResume = async () => {
        try{ api.post('/api/analytics/track', { resumeId, event: 'download', meta: { route: 'builder' } }) }catch(e){}
        const isLocalPreview = resumeData.personal_info?.image?.startsWith?.('blob:');
        if(isLocalPreview && !isSaving){
            await saveResume({ silent: true });
        }
        window.print();
    }

    const createShareLink = async () => {
        try{
            const token = localStorage.getItem('token');
            const { data } = await api.post('/api/share-links/create', { resumeId, role: 'comment', expiresInDays: 14 }, { headers: { Authorization: token } })
            const url = `${window.location.origin}/feedback/${data.token}`
            await navigator.clipboard.writeText(url)
            try{ await api.post('/api/analytics/track', { resumeId, event: 'share', meta: { type: 'link' } }) }catch(e){}
            toast.success('Feedback link copied to clipboard')
        }catch(error){
            toast.error(error?.response?.data?.message || error.message || 'Failed to create link')
        }
    }

    return (
        <div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <Link to={'/app'} className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all">
                    <ArrowLeftIcon className="size-4" /> Back to Dashboard
                </Link>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-8">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Panel - Form */}
                    <div className="relative lg:col-span-5 rounded-lg overflow-visible">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">
                            {/* progress bar using activeSectionIndex */}
                            <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
                            <hr className="absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000" style={{width: `${activeSectionIndex * 100 / (sections.length - 1)}%`}} />

                            {/* Section Navigation */}
                            <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                                <div className="flex items-center gap-2">
                                    <TemplateSelector selectedTemplate={resumeData.template} onChange={(template)=> setResumeData(prev => ({...prev, template}))} />
                                    <ColorPicker selectedColor={resumeData.accent_color} onChange={(color)=>setResumeData(prev => ({...prev, accent_color: color}))} />
                                </div>
                                <div className="flex items-center">
                                    {activeSectionIndex !== 0 && (
                                        <button onClick={()=> setActiveSectionIndex((prevIndex)=> Math.max(prevIndex - 1, 0))} className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all" disabled={activeSectionIndex === 0}>
                                            <ChevronLeftIcon className="size-4" /> Previous
                                        </button>
                                    )}
                                    <button onClick={()=> setActiveSectionIndex((prevIndex)=> Math.min(prevIndex + 1, sections.length - 1))} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`} disabled={activeSectionIndex === sections.length - 1}>
                                        Next <ChevronRightIcon className="size-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Form Content - moved inside the white panel so it appears under the Next button */}
                            <div className="space-y-6 mt-4">
                                {activeSection.id === 'personal' && (
                                    <PersonalInfoForm
                                        data={resumeData.personal_info}
                                        onChange={(data) => setResumeData(prev => ({...prev, personal_info: data}))}
                                        removeBackground={removeBackground}
                                        setRemoveBackground={setRemoveBackground}
                                        onImageSelect={handleAvatarSelect}
                                        accentColor={resumeData.accent_color}
                                    />
                                )}
                                {activeSection.id === 'summary' && (
                                   <ProfessionalSummaryForm data={resumeData.professional_summary} onChange={(data)=> setResumeData(prev=> ({...prev, professional_summary: data}))} setResumeData={setResumeData}/>
                                )}
                                {activeSection.id === 'experience' && (
                                    <ExperienceForm data={resumeData.experience} onChange={(data)=> setResumeData(prev=> ({...prev, experience: data}))} />
                                )}
                                {activeSection.id === 'education' && (
                                    <EducationForm data={resumeData.education} onChange={(data)=> setResumeData(prev=> ({...prev, education: data}))} />
                                )}
                                {activeSection.id === 'projects' && (
                                    <ProjectForm data={resumeData.project} onChange={(data)=> setResumeData(prev=> ({...prev, project: data}))} />
                                )}
                                {activeSection.id === 'skills' && (
                                    <SkillsForm data={resumeData.skills} onChange={(data)=> setResumeData(prev=> ({...prev, skills: data}))} />
                                )}
                            </div>
                            <button onClick={()=> saveResume()} disabled={isSaving} className={`bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm inline-flex items-center gap-2 ${isSaving ? 'opacity-60 cursor-not-allowed' : ''}`}>
                                {isSaving && <LoaderCircleIcon className="size-4 animate-spin" />}
                                {isSaving ? 'Saving…' : 'Save Changes'}
                            </button>
                        </div>

                        {/* previously form content was outside the white panel; we've moved it inside */}
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="lg:col-span-7 max-lg:mt-6">
                        <div className="relative w-full">
                            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                                {resumeData.public && (
                                    <button onClick={handleShare} className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors">
                                        <Share2Icon className="size-4" /> Share
                                    </button>
                                )}
                                <button onClick={createShareLink} className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-700 rounded-lg ring-emerald-300 hover:ring transition-colors">
                                    Get feedback link
                                </button>
                                <button onClick={changeResumeVisibility} className="flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 rounded-lg ring-purple-300 hover:ring transition-colors">
                                    {resumeData.public ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
                                    {resumeData.public ? 'Public' : 'Private'}
                                </button>
                                <button onClick={downloadResume} className="flex items-center py-2 px-6 gap-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors">
                                    <DownloadIcon className="size-4" /> Download
                                </button>
                            </div>
                        </div>

                        <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} watermark={!hasEntitlement} />
                    </div>
                </div>
            </div>

        </div>
    )
}
export default ResumeBuilder

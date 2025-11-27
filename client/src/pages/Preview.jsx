import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from "react";
import { dummyResumeData } from "../assets/assets.js";
import { useEffect } from "react";
import ResumePreview from "../components/ResumePreview.jsx";
import Loader from "../components/Loader.jsx";
import {ArrowLeftIcon} from "lucide-react";
import api from "../configs/api.js";

const Preview = () => {
    const { resumeId } = useParams();

    const [isLoading, setIsLoading] = useState(true);

    const [resumeData, setResumeData] = useState(null);

    useEffect(()=> {
        const loadResume = async () => {
            const found = dummyResumeData.find(resume => resume._id === resumeId || null)
            setResumeData(found)
            try{ if(found){ await api.post('/api/analytics/track', { resumeId, event: 'view', meta: { route: 'preview' } }) } }catch(e){}
            setIsLoading(false)
        }
        loadResume();
    },[resumeId])

    return resumeData ? (
        <div className="bg-slate-100">
            <div className="max-w-3xl mx-auto py-10">
                <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} classes="py-4 bg-white"/>
            </div>
        </div>
    ) : (
        <div>
            {isLoading ? <Loader /> : (
                <div className="flex flex-col items-center justify-center h-screen">
                    <p className="text-center text-6xl text-slate-400 font-medium">Resume not found</p>
                    <a href="/" className="mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors">
                        <ArrowLeftIcon className="mr-2 size-4" />
                        Go to Homepage
                    </a>
                </div>
            )}
        </div>
    )
}
export default Preview

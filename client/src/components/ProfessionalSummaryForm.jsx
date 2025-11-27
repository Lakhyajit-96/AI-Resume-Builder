import React, { useState } from 'react'
import { LoaderCircleIcon, Sparkles } from 'lucide-react';
import api from "../configs/api.js";
import { toast } from 'react-hot-toast';

const ProfessionalSummaryForm = ({ data = "", onChange = () => {} }) => {
    const [isEnhancing, setIsEnhancing] = useState(false);

    const handleEnhance = async () => {
        if (isEnhancing) return;
        try {
            setIsEnhancing(true);
            const token = localStorage.getItem('token');
            const userContent = (data && data.trim()) ? data : 'Generate a concise, ATS-friendly professional summary based on my resume. Keep it to 1-2 sentences.';
            const { data: res } = await api.post('/api/ai/enhance-pro-sum', { userContent }, { headers: { Authorization: token } });
            if (res?.enhancedContent) {
                onChange(res.enhancedContent);
                toast.success('Summary enhanced');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message || 'Failed to enhance');
        } finally {
            setIsEnhancing(false);
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900"> Professional Summary </h3>
                    <p className="text-sm text-gray-500">Add summary for your resume here</p>
                </div>
                <button type="button" onClick={handleEnhance} disabled={isEnhancing} className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
                    {isEnhancing ? <LoaderCircleIcon className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                    {isEnhancing ? 'Enhancing…' : 'AI Enhance'}
                </button>
            </div>

            <div className="mt-6">
                <textarea
                    className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                    placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
                    onChange={(e) => onChange(e.target.value)}
                    value={data || ""}
                    rows={7}
                />
                <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.</p>
            </div>
        </div>
    )
}
export default ProfessionalSummaryForm

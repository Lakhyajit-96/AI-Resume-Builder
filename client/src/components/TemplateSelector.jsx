import React, { useState, useEffect, useRef } from 'react'
import {Layout, Check} from "lucide-react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const handleDocClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false)
            }
        }
        const handleDropdownOpen = (e) => {
            const id = e?.detail?.id
            // if another dropdown opened, close this one
            if (id && id !== 'templateSelector') setIsOpen(false)
        }
        document.addEventListener('click', handleDocClick)
        document.addEventListener('dropdown-open', handleDropdownOpen)
        return () => {
            document.removeEventListener('click', handleDocClick)
            document.removeEventListener('dropdown-open', handleDropdownOpen)
        }
    }, [])

    const templates = [
        {
            id: "classic",
            name: "Classic",
            preview: "A clean, traditional resume format with clear sections and professional typography"
        },
        {
            id: "modern",
            name: "Modern",
            preview: "Sleek design with strategic use of color and modern font choices"
        },
        {
            id: "minimal-image",
            name: "Minimal Image",
            preview: "Minimal design with a single image and clean typography"
        },
        {
            id: "minimal",
            name: "Minimal",
            preview: "Ultra-clean design that puts your content front and center"
        },
        {
            id: "premium-elegant",
            name: "Premium Elegant",
            preview: "A refined layout with elegant typography and subtle accent treatments"
        },
        {
            id: "premium-card",
            name: "Premium Card",
            preview: "Card-style layout with profile card and content areas for a modern look"
        },
        {
            id: "premium-creative",
            name: "Premium Creative",
            preview: "Creative layout with bold accents and profile emphasis"
        },
        {
            id: "premium-dark",
            name: "Premium Dark",
            preview: "Professional dark theme with high contrast and clean typography"
        },
        {
            id: "premium-minimalistic",
            name: "Premium Minimalistic",
            preview: "A minimalist, airy design that puts emphasis on content and whitespace"
        },
        {
            id: "premium-darkelegant",
            name: "Premium Dark Elegant",
            preview: "Elegant two-column dark layout ideal for senior professionals"
        },
        {
            id: "premium-aesthetic",
            name: "Premium Aesthetic",
            preview: "Soft gradient aesthetic layout with subtle accents and card sections"
        }
    ]

    const svgThumb = (accent = '#CBD5E1', dark=false, withImage=false) => (
        <svg width="80" height="48" viewBox="0 0 80 48" xmlns="http://www.w3.org/2000/svg" className="rounded-md overflow-hidden border">
            <rect x="0" y="0" width="80" height="48" fill={dark ? '#1f2937' : '#ffffff'} />
            <rect x="0" y="0" width="80" height="6" fill={accent} />
            {withImage ? (
                <>
                    <rect x="6" y="10" width="18" height="18" rx="3" fill={dark ? '#374151' : '#e5e7eb'} />
                    <rect x="28" y="12" width="46" height="6" rx="2" fill={dark ? '#374151' : '#e5e7eb'} />
                    <rect x="28" y="22" width="36" height="6" rx="2" fill={dark ? '#374151' : '#e5e7eb'} />
                </>
            ) : (
                <>
                    <rect x="6" y="12" width="68" height="6" rx="2" fill={dark ? '#374151' : '#e5e7eb'} />
                    <rect x="6" y="22" width="50" height="6" rx="2" fill={dark ? '#374151' : '#e5e7eb'} />
                </>
            )}
        </svg>
    )

    const renderThumb = (id) => {
        switch(id){
            case 'classic':
                return svgThumb('#111827')
            case 'modern':
                return svgThumb('#3B82F6')
            case 'minimal-image':
                return svgThumb('#6B7280', false, true)
            case 'minimal':
                return svgThumb('#6B7280')
            case 'premium-elegant':
                return svgThumb('#8B5CF6')
            case 'premium-card':
                return svgThumb('#10B981', false, true)
            case 'premium-creative':
                return svgThumb('#F97316')
            case 'premium-dark':
                return svgThumb('#111827', true)
            case 'premium-minimalistic':
                return svgThumb('#10B981')
            case 'premium-darkelegant':
                return svgThumb('#0ea5a6', true)
            case 'premium-aesthetic':
                return svgThumb('#8B5CF6')
            default:
                return svgThumb('#CBD5E1')
        }
    }

    return (
        <div className="relative" ref={ref}>
            <button onClick={() => {
                const next = !isOpen
                setIsOpen(next)
                if (next) document.dispatchEvent(new CustomEvent('dropdown-open', { detail: { id: 'templateSelector' } }))
                if(next) console.log('TemplateSelector templates:', templates)
            }} className="flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg">
                <Layout size={14} /> <span className="max-ssm:hidden">Template</span>
            </button>
            {isOpen && (
                <div className="absolute top-full w-96 p-3 mt-2 space-y-3 z-50 bg-white rounded-md border border-gray-200 shadow-sm max-h-80 overflow-y-auto">
                    {templates.map((template) => (
                        <div key={template.id} onClick={()=> {
                            onChange(template.id);
                            try{ localStorage.setItem('selected_template', template.id) }catch(e){}
                            setIsOpen(false)
                        }} className={`relative p-3 border rounded-md cursor-pointer transition-all flex items-start gap-3 ${selectedTemplate === template.id ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"}`}>
                            <div className="shrink-0">
                                {renderThumb(template.id)}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-gray-800">{template.name}</h4>
                                    {selectedTemplate === template.id && (
                                        <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center p-1">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic">{template.preview}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
export default TemplateSelector

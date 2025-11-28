import React from 'react'
import {User, Mail, Phone, MapPin, BriefcaseBusiness, Linkedin, Globe} from "lucide-react";

const PersonalInfoForm = ({
                              data = {},
                              onChange = ()=>{},
                              removeBackground = false,
                              setRemoveBackground = ()=>{},
                              onImageSelect = ()=>{},
                              accentColor = '#e2e8f0'
                          }) => {

    const handleChange = (field, value)=>{
        onChange({...data, [field]: value})
    }

    const handleFileChange = (event)=>{
        const file = event.target.files?.[0] || null;
        onImageSelect(file);
        // reset the input so selecting the same file twice still triggers change
        event.target.value = '';
    }

    const fields = [
        {key: "full_name", label: "Full Name", type: "text", icon: User, required: true},
        {key: "email", label: "Email Address", type: "email", icon: Mail, required: true},
        {key: "phone", label: "Phone Number", type: "tel", icon: Phone},
        {key: "location", label: "Location", type: "text", icon: MapPin},
        {key: "profession", label: "Profession", type: "text", icon: BriefcaseBusiness},
        {key: "linkedin", label: "LinkedIn Profile", type: "url", icon: Linkedin},
        {key: "website", label: "Personal Website", type: "url", icon: Globe},
    ]

    const hasImage = Boolean(data.image);

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                <p className="text-sm text-gray-600">Get Started with the personal information</p>
                <div className="flex items-center gap-4 mt-3 flex-wrap">
                    <label className="cursor-pointer flex items-center gap-3">
                        {hasImage ? (
                            <div className="relative">
                                <img
                                    src={data.image}
                                    alt="user avatar"
                                    className="w-20 h-20 rounded-full object-cover object-center ring ring-slate-200 hover:opacity-90 transition-all duration-200"
                                    style={{ backgroundColor: removeBackground ? accentColor : '#f8fafc' }}
                                />
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[11px] text-slate-500 bg-white px-2 rounded-full shadow">Change</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-slate-600">
                                <User className="size-10 p-2.5 border rounded-full" />
                                <span className="text-sm">Upload user image</span>
                            </div>
                        )}
                        <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={handleFileChange} />
                    </label>
                    {hasImage && (
                        <div className="flex flex-col gap-1 text-sm text-gray-700">
                            <p className="font-medium">Remove Background</p>
                            <label className="inline-flex items-center cursor-pointer gap-3">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        onChange={()=> setRemoveBackground(prev => !prev)}
                                        checked={!!removeBackground}
                                    />
                                    <div className="w-10 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 transition-colors duration-200"></div>
                                    <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                </div>
                                <span className="text-xs text-slate-500">Instantly align & blend avatar</span>
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {fields.map((field)=>{
               const Icon = field.icon;
               return (
                   <div key={field.key} className="space-y-1 mt-5">
                       <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                           <Icon className="size-4" />
                           {field.label}
                           {field.required && <span className="text-red-500">*</span>}
                       </label>
                       <input type={field.type} value={data[field.key] || ""} onChange={(e)=>handleChange(field.key, e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm" placeholder={`Enter your ${field.label.toLowerCase()}`} required={field.required} />
                   </div>
               )
            })}

        </div>
    )
}
export default PersonalInfoForm

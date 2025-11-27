import React from 'react'
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import PremiumElegant from "./templates/PremiumElegant";
import PremiumCard from "./templates/PremiumCard";
import PremiumCreative from "./templates/PremiumCreative";
import PremiumDark from "./templates/PremiumDark";
import PremiumMinimalistic from "./templates/PremiumMinimalistic";
import PremiumDarkElegant from "./templates/PremiumDarkElegant";
import PremiumAesthetic from "./templates/PremiumAesthetic";

const ResumePreview = ({data, template, accentColor, classes = "", className = "", watermark = false}) => {

    const effectiveClasses = `${classes} ${className}`.trim();

    const renderTemplate = ()=>{
        switch (template) {
            case "modern":
                return <ModernTemplate data={data} accentColor={accentColor} />;
            case "minimal":
                return <MinimalTemplate data={data} accentColor={accentColor} />;
            case "minimal-image":
                return <MinimalImageTemplate data={data} accentColor={accentColor} />;
            case "premium-elegant":
                return <PremiumElegant data={data} accentColor={accentColor} />;
            case "premium-card":
                return <PremiumCard data={data} accentColor={accentColor} />;
            case "premium-creative":
                return <PremiumCreative data={data} accentColor={accentColor} />;
            case "premium-dark":
                return <PremiumDark data={data} accentColor={accentColor} />;
            case "premium-minimalistic":
                return <PremiumMinimalistic data={data} accentColor={accentColor} />;
            case "premium-darkelegant":
                return <PremiumDarkElegant data={data} accentColor={accentColor} />;
            case "premium-aesthetic":
                return <PremiumAesthetic data={data} accentColor={accentColor} />;
            default:
                return <ClassicTemplate data={data} accentColor={accentColor} />;
        }
    }

    return (
        <div className="w-full bg-gray-100">
            <div id="resume-preview" className={"border border-gray-200 print:shadow-none print:border-none " + (effectiveClasses ? ` ${effectiveClasses}` : "") }>
                {renderTemplate()}
                {watermark && (
                    <div className="wm">
                        <div className="wm-text">Resume Builder</div>
                    </div>
                )}
            </div>

            <style jsx>
                {`
                @page {
                    size: letter;
                    margin: 0;
                }
                @media print {
                    html, body {
                        width: 8.5in;
                        height: 11in;
                        overflow: hidden;
                    }
                    body * {
                        visibility: hidden;
                    }
                    #resume-preview, #resume-preview * {
                        visibility: visible;
                    }
                    #resume-preview {
                        position: absolute;
                        left: 50%;
                        top: 0;
                        transform: translateX(-50%);
                        width: 8.5in;
                        height: auto;
                        margin: 0;
                        padding: 0;
                        box-shadow: none !important;
                        border: none !important;
                        background: white !important;
                    }
                    #resume-preview .wm {
                        display: block;
                        position: absolute;
                        left: 0;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        z-index: 50;
                        pointer-events: none;
                        background-image: url('/logo.svg');
                        background-size: 220px 220px;
                        background-repeat: repeat;
                        opacity: 0.06;
                    }
                    #resume-preview .wm .wm-text {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%) rotate(-30deg);
                        font-size: 64px;
                        font-weight: 700;
                        color: #0f172a;
                        opacity: 0.08;
                        letter-spacing: 2px;
                        text-transform: uppercase;
                    }
                }
                @media screen {
                    #resume-preview .wm { display: none; }
                }
                `}
            </style>
        </div>
    )
}
export default ResumePreview

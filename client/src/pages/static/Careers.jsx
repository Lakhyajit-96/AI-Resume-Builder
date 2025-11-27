import React from 'react'
import Navbar from '../../components/Navbar'

const roles = [
  {
    title: 'Frontend Engineer (React)',
    location: 'Remote • Full‑time',
    about: 'Build delightful, accessible UI for our resume editor and templates.',
    requirements: [
      '3+ years with React/TypeScript',
      'Strong CSS skills (Tailwind or equivalent)',
      'Experience shipping production apps'
    ],
  },
  {
    title: 'Product Designer',
    location: 'Remote • Full‑time',
    about: 'Own end‑to‑end flows from research to polished UI for web.',
    requirements: [
      'Portfolio demonstrating shipped product work',
      'Comfort with prototyping and usability testing',
      'Figma expertise'
    ],
  },
  {
    title: 'Customer Support Specialist',
    location: 'Remote • Full‑time',
    about: 'Help users succeed with timely, empathetic support and clear docs.',
    requirements: [
      'Excellent written communication',
      'Experience with help desks (Zendesk/Intercom)',
      'Availability across US/EU time zones'
    ],
  },
]

const Careers = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-16 text-slate-800">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold">Careers</h1>
        <p className="text-slate-600 mt-2">Help us build the AI copilot trusted by 92 countries. We operate as a remote-first team across North America, Europe, and India, shipping weekly to keep candidates ahead of hiring shifts.</p>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-6 md:gap-8">
        <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-base font-semibold text-slate-800">Why work with us</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
            <li>Ship features that boost interview conversion rates by double digits.</li>
            <li>Lean, product-led squads with direct access to recruiters and users.</li>
            <li>Remote-first with core overlap hours and quarterly in-person summits.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-base font-semibold text-slate-800">Benefits</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
            <li>Competitive salary, equity refreshers, and annual compensation reviews.</li>
            <li>Health coverage or stipends in your country of residence.</li>
            <li>Learning budget ($1,500/yr) and paid time for conferences or certifications.</li>
            <li>Flexible time off with a 20-day minimum plus regional holidays.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-base font-semibold text-slate-800">Process</h2>
          <ol className="list-decimal ml-5 mt-2 text-sm text-slate-700 space-y-1">
            <li>Intro call (30 min) to explore fit and answer role questions.</li>
            <li>Role-specific exercise (2–3 hrs) with async feedback and debrief.</li>
            <li>Panel interviews with cross-functional partners and leadership.</li>
            <li>Offer with transparent leveling rubric and compensation banding.</li>
          </ol>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-slate-800 mt-10">Open roles</h2>
      <div className="mt-4 grid md:grid-cols-2 gap-6 md:gap-8">
        {roles.map((r) => (
          <div key={r.title} className="rounded-xl border border-slate-200 bg-white/70 p-6">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-slate-800">{r.title}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">{r.location}</span>
            </div>
            <p className="text-sm text-slate-700 mt-2">{r.about}</p>
            <p className="text-xs text-slate-500 mt-3 font-medium">Requirements</p>
            <ul className="list-disc ml-5 mt-1 text-sm text-slate-700 space-y-1">
              {r.requirements.map(req => <li key={req}>{req}</li>)}
            </ul>
            <a href="mailto:careers@resumebuilder.app" className="inline-block mt-4 text-sm rounded-md bg-green-600 hover:bg-green-700 text-white px-4 py-2">Apply</a>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white/60 p-6">
        <p className="text-sm text-slate-700">Don’t see a role that fits? Send your portfolio or resume to <a className="text-green-700 hover:underline" href="mailto:careers@resumebuilder.app">careers@resumebuilder.app</a> with the subject “General Application”. Tell us what problems you want to solve and the data or stories that back your impact.</p>
      </div>
      </div>
    </>
  )
}
export default Careers

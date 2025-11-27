import React from 'react'
import Navbar from '../../components/Navbar'

const Company = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 py-16 text-slate-800">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold">Our Company</h1>
        <p className="text-slate-600 mt-2">Resume Builder is the AI career copilot used by scale-ups, universities, and workforce agencies to help candidates convert faster. We combine recruiter-grade templates with adaptive prompts, analytics, and compliance tooling so every resume meets hiring signals.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-10">
        <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <p className="text-sm text-slate-500">Founded</p>
          <p className="text-2xl font-semibold text-slate-800">2023</p>
          <p className="text-xs text-slate-500 mt-1">Built by alumni from LinkedIn, Grammarly, and Google Brain.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <p className="text-sm text-slate-500">Organizations served</p>
          <p className="text-2xl font-semibold text-slate-800">420+</p>
          <p className="text-xs text-slate-500 mt-1">Including Ironhack, General Assembly, EMEA Tech Coalition.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <p className="text-sm text-slate-500">Resumes created</p>
          <p className="text-2xl font-semibold text-slate-800">1.4M+</p>
          <p className="text-xs text-slate-500 mt-1">45% of which feed into our anonymized improvement dataset.</p>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="rounded-xl border border-slate-200 bg-white/60 p-6">
          <h2 className="text-lg font-semibold text-slate-800">Mission</h2>
          <p className="text-sm text-slate-700 mt-2">Equip every job seeker with the evidence, structure, and insight to tell their story. We translate recruiter scorecards into AI guidance so candidates can demonstrate impact, not just responsibilities.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/60 p-6">
          <h2 className="text-lg font-semibold text-slate-800">Values</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
            <li>Evidence first – every suggestion references hiring outcomes or recruiter interviews.</li>
            <li>Privacy by default – granular consent controls and strict data minimization.</li>
            <li>Accessibility – WCAG 2.1 AA support, keyboard shortcuts, and live screen reader audits.</li>
            <li>Ship together – we co-design features with customers through monthly roadmap councils.</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white/70 p-6">
        <h2 className="text-lg font-semibold text-slate-800">Timeline</h2>
        <ul className="mt-2 text-sm text-slate-700 space-y-1">
          <li><span className="font-medium text-slate-800">2023:</span> Private beta with 12 career coaches validating AI prompt accuracy.</li>
          <li><span className="font-medium text-slate-800">2024:</span> Launched analytics dashboard and SOC 2 Type II controls.</li>
          <li><span className="font-medium text-slate-800">2025:</span> Expanded to workforce agencies, introduced multilingual templates, and surpassed 1M resumes created.</li>
        </ul>
      </div>
      </div>
    </>
  )
}
export default Company

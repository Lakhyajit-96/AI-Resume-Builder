import React from 'react'
import Navbar from '../../components/Navbar'

const Community = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-16 text-slate-800">
      <h1 className="text-3xl md:text-4xl font-semibold">Community</h1>
      <p className="text-slate-600 mt-2 max-w-3xl">Join 28,000+ operators, recruiters, and bootcamp grads trading interview breakdowns, resume tear-downs, and market intel. Our community runs daily coworking pods, weekly critique rooms, and live hiring manager AMAs.</p>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-8">
        <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-base font-semibold text-slate-800">Channels</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
            <li>#resume-desk — live AI prompt swaps and recruiter feedback sessions.</li>
            <li>#job-leads — daily feed of curated product, engineering, and GTM roles with referral tags.</li>
            <li>#interview-labs — mock interview flashcards, STAR templates, and peer practice signups.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-base font-semibold text-slate-800">Code of Conduct</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
            <li>Provide actionable feedback grounded in data—quote specific bullets or metrics.</li>
            <li>Zero tolerance for harassment, recruiting spam, or scraping member profiles.</li>
            <li>Respect confidentiality: redact employer names if under NDA and use anonymous mode when needed.</li>
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-base font-semibold text-slate-800">Get involved</h2>
          <p className="text-sm text-slate-700 mt-2">Host a teardown, lead a salary transparency session, or mentor in our #first-role cohort. Submit programming ideas to <a className="text-green-700 hover:underline" href="mailto:community@resumebuilder.app">community@resumebuilder.app</a> and our community team will help you schedule.</p>
        </div>
      </div>
      </div>
    </>
  )
}
export default Community

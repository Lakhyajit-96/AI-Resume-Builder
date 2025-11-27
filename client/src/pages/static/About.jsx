import React from 'react'
import Navbar from '../../components/Navbar'

const About = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 py-16 text-slate-800">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold">About Resume Builder</h1>
        <p className="text-slate-600 mt-2">We power AI-assisted resume creation for over a million professionals worldwide. Our platform blends recruiter-backed structure with large language models tuned on 40M+ anonymized job outcomes so you can move from blank page to interview-ready application in minutes.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-8">
        <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <p className="text-sm text-slate-500">Resumes generated</p>
          <p className="text-2xl font-semibold text-slate-800">1.4M+</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <p className="text-sm text-slate-500">Global footprint</p>
          <p className="text-2xl font-semibold text-slate-800">92 countries</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <p className="text-sm text-slate-500">Average build time</p>
          <p className="text-2xl font-semibold text-slate-800">08:17 minutes</p>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="rounded-xl border border-slate-200 bg-white/60 p-6">
          <h2 className="text-lg font-semibold text-slate-800">Our story</h2>
          <p className="text-sm text-slate-700 mt-2">Resume Builder launched in 2023 after our founding team—former LinkedIn recruiters, a Grammarly PM, and two AI researchers—saw candidates fail due to inconsistent storytelling. We trained models on high-performing resumes, partnered with hiring managers to codify scorecards, and shipped an editor that guides users line-by-line with contextual prompts.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/60 p-6">
          <h2 className="text-lg font-semibold text-slate-800">What we believe</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
            <li>Hiring managers scan for impact, so every suggestion highlights measurable outcomes.</li>
            <li>Diversity matters: our models are audited quarterly to reduce bias across industries and geographies.</li>
            <li>Your career data is sacred—we provide granular consent controls and zero data resale.</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white/70 p-6">
        <h2 className="text-lg font-semibold text-slate-800">Behind the product</h2>
        <p className="text-sm text-slate-700 mt-2">We’re a globally distributed team operating out of San Francisco, Toronto, Berlin, and Bengaluru. Writers and career coaches ship weekly prompt packs, data scientists monitor anonymized placement rates, and engineers run continuous accessibility audits so every user—desktop or mobile—can build a flawless application.</p>
      </div>
      </div>
    </>
  )
}
export default About

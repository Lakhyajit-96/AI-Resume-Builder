import React from 'react'
import Navbar from '../../components/Navbar'

const Affiliate = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-16 text-slate-800">
      <h1 className="text-3xl md:text-4xl font-semibold">Affiliate Program</h1>
      <p className="text-slate-600 mt-2 max-w-2xl">Help job seekers land interviews while earning predictable revenue. Promote Resume Builder’s AI workflow to your community, newsletter, or course audience and receive lifetime revenue share on every subscription.</p>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-8">
        <div className="rounded-xl border border-slate-200 bg-white/70 p-5">
          <p className="text-sm text-slate-500">Commission</p>
          <p className="text-2xl font-semibold text-slate-800">30% recurring</p>
          <p className="text-xs text-slate-500 mt-1">Applies to Pro & Premium tiers for the lifetime of the subscription.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/70 p-5">
          <p className="text-sm text-slate-500">Cookie window</p>
          <p className="text-2xl font-semibold text-slate-800">60 days</p>
          <p className="text-xs text-slate-500 mt-1">Renewed on each click; last-touch attribution with fraud monitoring.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/70 p-5">
          <p className="text-sm text-slate-500">Payouts</p>
          <p className="text-2xl font-semibold text-slate-800">Monthly via PayPal</p>
          <p className="text-xs text-slate-500 mt-1">$50 minimum threshold, net-30. Direct deposit available in US/EU.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-10">
        <div className="rounded-xl border border-slate-200 bg-white/60 p-6">
          <h2 className="text-lg font-semibold text-slate-800">How it works</h2>
          <ol className="list-decimal ml-5 mt-2 text-sm text-slate-700 space-y-1">
            <li>Submit your profile, channels, and audience metrics. Approvals are processed within 48 hours.</li>
            <li>Access UTMs, creative assets, resume teardown scripts, and onboarding sequences in the partner hub.</li>
            <li>Earn 30% on every Pro or Premium renewal, plus quarterly bonuses when you cross 50 new activations.</li>
          </ol>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/60 p-6">
          <h2 className="text-lg font-semibold text-slate-800">Guidelines</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
            <li>Promote authentic use cases—share dashboards, AI prompts, or before/after resume examples.</li>
            <li>No paid search campaigns targeting Resume Builder, ResumeBuilder.app, or misspellings.</li>
            <li>Comply with FTC disclosure requirements and link to our current landing pages.</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white/70 p-6">
        <h3 className="text-base font-semibold text-slate-800">Apply now</h3>
        <p className="text-sm text-slate-600 mt-1">Send a short intro with your channels, monthly reach, and sample content to <a className="text-green-700 hover:underline" href="mailto:affiliates@resumebuilder.app">affiliates@resumebuilder.app</a>. We prioritize coaches, bootcamps, and creators who specialize in tech, healthcare, finance, and emerging talent programs.</p>
      </div>
      </div>
    </>
  )
}
export default Affiliate

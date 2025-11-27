import React from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    highlight: 'Best for exploring the editor',
    features: [
      '1 active resume project',
      'Core templates and manual editing',
      'AI rewrite suggestions (5/mo)',
      'PDF export with watermark'
    ],
    cta: 'Start for free',
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: 'per month',
    highlight: 'For active job searches • 7-day free trial',
    features: [
      '7-day free trial',
      'Unlimited resumes & cover letters',
      'Full template library + brand colors',
      'AI bullet generator & tailoring (120/mo)',
      'PDF/DOCX export without watermark',
      'Interview tracker & email support'
    ],
    popular: true,
    cta: 'Upgrade to Pro',
  },
  {
    name: 'Premium',
    price: '$19.99',
    period: 'per month',
    highlight: 'Teams and power users • 7-day free trial',
    features: [
      '7-day free trial',
      'Workspace collaboration & shared libraries',
      'Advanced template editor + custom fonts',
      'AI rewrites, translations & tailoring (400/mo)',
      'ATS optimization scorecard & recruiter review',
      'Priority support with live chat',
      'LinkedIn profile optimizer'
    ],
    cta: 'Go Premium',
  },
]

const Pricing = () => {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 py-16 text-slate-800">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold">Simple, transparent pricing</h1>
        <p className="text-slate-600 mt-2">Monthly plans with no contracts. 7-day free trial on Pro and Premium. Annual billing saves 20% and is available inside the product.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-10">
        {tiers.map((t) => (
          <div key={t.name} className={`relative rounded-2xl border ${t.popular ? 'border-green-400 shadow-lg' : 'border-slate-200'} bg-white/70 p-6 flex flex-col`}>
            {t.popular && (
              <span className="absolute -top-2 right-4 text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">Most popular</span>
            )}
            <h3 className="text-lg font-semibold text-slate-800">{t.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{t.highlight}</p>

            <div className="mt-4 flex items-end gap-1">
              <span className="text-3xl font-bold text-slate-800">{t.price}</span>
              <span className="text-sm text-slate-500">{t.period}</span>
            </div>

            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 mt-0.5"><path d="M20 6 9 17l-5-5"/></svg>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button onClick={() => {
              if (t.name === 'Pro' || t.name === 'Premium') {
                navigate('/app/checkout')
              }
            }} className={`mt-6 w-full rounded-full py-2 text-sm ${t.popular ? 'bg-green-600 hover:bg-green-700 text-white' : 'border border-slate-300 hover:bg-slate-50 text-slate-700'} transition-colors`}>
              {t.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 p-6 bg-white/60">
          <h4 className="font-medium text-slate-800">What counts as an AI credit?</h4>
          <p className="text-sm text-slate-600 mt-1">Credits cover AI rewrites, tailoring, summary generation, and LinkedIn refreshes. Each plan refreshes credits monthly; unused credits roll over for 30 days on Premium.</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-6 bg-white/60">
          <h4 className="font-medium text-slate-800">Do you offer refunds?</h4>
          <p className="text-sm text-slate-600 mt-1">Yes. Request a refund within 14 days if you’ve used fewer than 20 AI credits or haven’t exported a resume without watermark. Enterprise contracts include onboarding SLAs.</p>
        </div>
      </div>
      </div>
    </>
  )
}
export default Pricing


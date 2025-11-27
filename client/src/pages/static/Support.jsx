import React from 'react'
import Navbar from '../../components/Navbar'

const Support = () => {
  const faqs = [
    {
      q: 'How do I create my first resume?',
      a: 'From the Dashboard, choose “Create a resume.” Name your project and select a template. Our guided editor pre-fills core sections (Work History, Skills, Projects, Certifications) and recommends AI bullet prompts based on your role. You can save drafts at any time and switch templates without losing content.'
    },
    {
      q: 'Can I upload an existing resume (PDF/Word)?',
      a: 'Yes. Select “Import resume” to upload DOCX, PDF, or TXT files up to 15MB. We use an ATS-grade parser to extract sections, job titles, dates, and skills. You can review the parsed content before publishing and run an integrity check that flags missing accomplishments or inconsistent formats.'
    },
    {
      q: 'Is my data private?',
      a: 'Absolutely. Resume data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are SOC 2 Type II compliant, never sell personal information, and let you delete resumes or your account at any time. Refer to the Privacy Policy for retention schedules and subprocessors.'
    },
    {
      q: 'Why can’t I access the editor?',
      a: 'The editor requires an authenticated session. Make sure you are logged in, have verified your email, and that your subscription is active. If you are part of a team workspace, confirm your invite has been accepted. Check status.resumebuilder.app for live service updates.'
    },
    {
      q: 'How do I download my resume as PDF?',
      a: 'Open any resume, click “Preview & export,” and choose PDF, DOCX, or shareable link. PDFs are generated in 300 DPI with embedded fonts, and you can add tracking before sharing. Pro and Premium plans enable branded exports and version history.'
    },
  ]

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-16 text-slate-800">
      <h1 className="text-3xl md:text-4xl font-semibold mb-3">Support</h1>
      <p className="text-slate-600 mb-10 max-w-2xl">We’re here to help you craft a standout resume. Browse common questions, and if you still need assistance, contact us using the details below.</p>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-4 bg-white/70">
                <p className="font-medium text-slate-800">{item.q}</p>
                <p className="text-sm text-slate-600 mt-1">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="border border-slate-200 rounded-lg p-5 bg-white/70">
            <h3 className="text-base font-semibold text-slate-700">Contact</h3>
            <ul className="mt-2 text-sm text-slate-600 space-y-1">
              <li>Email: <a className="text-green-700 hover:underline" href="mailto:support@resumebuilder.app">support@resumebuilder.app</a> (avg. 2h response)</li>
              <li>Live chat: 24/7 for Pro & Premium customers</li>
              <li>Phone (US/EU): +1 (628) 239-4102, Mon–Fri 09:00–18:00 PT</li>
              <li>Status: <a className="text-green-700 hover:underline" href="https://status.resumebuilder.app">status.resumebuilder.app</a></li>
            </ul>
          </div>

          <div className="border border-slate-200 rounded-lg p-5 bg-white/70">
            <h3 className="text-base font-semibold text-slate-700">Troubleshooting</h3>
            <ul className="list-disc ml-5 mt-2 text-sm text-slate-600 space-y-1">
              <li>Use the latest Chrome, Edge, or Safari; disable aggressive ad blockers for resumebuilder.app.</li>
              <li>Confirm cookies are enabled so we can keep your secure session active.</li>
              <li>Regenerate the preview if spacing appears off—this re-syncs fonts and margins.</li>
              <li>When importing, ensure files are under 15MB and not password protected.</li>
              <li>Still stuck? Send diagnostic logs from Settings → Support to expedite resolution.</li>
            </ul>
          </div>
        </aside>
      </div>
      </div>
    </>
  )
}
export default Support

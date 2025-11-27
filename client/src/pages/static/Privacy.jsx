import React from 'react'
import Navbar from '../../components/Navbar'

const Privacy = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-16 text-slate-800">
      <h1 className="text-3xl md:text-4xl font-semibold">Privacy Policy</h1>
      <p className="text-slate-600 mt-1">Effective date: Nov 21, 2025</p>

      <div className="mt-6 space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">1. What we collect</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
            <li>Account data: name, email, password (hashed).</li>
            <li>Resume data you add in the editor (experience, education, skills, etc.).</li>
            <li>Usage data for analytics (pages visited, basic device/browser info).</li>
            <li>Files you upload (PDF/DOC/DOCX) to import resume content.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">2. How we use data</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
            <li>Provide and improve the resume editor and related features.</li>
            <li>Secure your account and prevent abuse.</li>
            <li>Communicate product updates and support responses.</li>
            <li>Generate optional AI suggestions when requested by you.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">3. Sharing</h2>
          <p className="text-sm text-slate-700 mt-2">We do not sell your personal data. We share data only with trusted processors to operate the service (e.g., hosting, analytics). When legally required, we may disclose data to comply with law or enforce policies.</p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">4. Retention</h2>
          <p className="text-sm text-slate-700 mt-2">We retain account and resume content while your account is active. You may delete resumes anytime. Upon account deletion, we delete or anonymize your data within a reasonable period unless retention is required by law.</p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">5. Security</h2>
          <p className="text-sm text-slate-700 mt-2">We use industry‑standard safeguards including encryption in transit (HTTPS), hashed passwords, and access controls. No system is 100% secure, so we continually monitor and improve our protections.</p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">6. Your rights</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
            <li>Access and update your account information.</li>
            <li>Export or delete your resume data.</li>
            <li>Request account deletion at any time.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">7. Children</h2>
          <p className="text-sm text-slate-700 mt-2">Our service is not directed to children under 13. If you believe a child has provided personal data, contact us and we will take appropriate steps to remove it.</p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">8. Contact</h2>
          <p className="text-sm text-slate-700 mt-2">For privacy inquiries, email <a className="text-green-700 hover:underline" href="mailto:privacy@resumebuilder.app">privacy@resumebuilder.app</a>.</p>
        </section>
      </div>
      </div>
    </>
  )
}
export default Privacy

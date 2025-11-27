import React from 'react'
import Navbar from '../../components/Navbar'

const Terms = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-16 text-slate-800">
      <h1 className="text-3xl md:text-4xl font-semibold">Terms of Service</h1>
      <p className="text-slate-600 mt-1">Effective date: Nov 21, 2025</p>

      <div className="mt-6 space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">1. Acceptance of terms</h2>
          <p className="text-sm text-slate-700 mt-2">By accessing or using Resume Builder, you agree to be bound by these Terms. If you do not agree, do not use the service.</p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">2. Accounts</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
            <li>You are responsible for the security of your account and all activity under it.</li>
            <li>You must provide accurate information and maintain its completeness.</li>
            <li>You must be at least 13 years old to use the service.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">3. Subscriptions & billing</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
            <li>Paid plans renew automatically each billing cycle until canceled.</li>
            <li>You can cancel at any time; access remains until the end of the current period.</li>
            <li>Refunds: we offer a 7‑day refund if no premium export was used and fewer than 5 AI credits were consumed.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">4. Acceptable use</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
            <li>No unlawful, infringing, or misleading content.</li>
            <li>No attempts to disrupt, scrape, or reverse engineer the service.</li>
            <li>Do not share others’ personal data without consent.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">5. Intellectual property</h2>
          <p className="text-sm text-slate-700 mt-2">The service, templates, and software are owned by us and protected by applicable IP laws. You retain rights to your own resume content.</p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">6. Disclaimers</h2>
          <p className="text-sm text-slate-700 mt-2">The service is provided “as is” without warranties of any kind. We do not guarantee interviews or job offers.</p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">7. Limitation of liability</h2>
          <p className="text-sm text-slate-700 mt-2">To the maximum extent permitted by law, in no event shall we be liable for indirect, incidental, or consequential damages arising from your use of the service.</p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">8. Governing law</h2>
          <p className="text-sm text-slate-700 mt-2">These Terms are governed by the laws of your local jurisdiction unless superseded by mandatory consumer protection laws.</p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">9. Changes</h2>
          <p className="text-sm text-slate-700 mt-2">We may update these Terms from time to time. Material changes will be communicated in‑app or via email. Continued use constitutes acceptance.</p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">10. Contact</h2>
          <p className="text-sm text-slate-700 mt-2">Questions about these Terms? Contact <a className="text-green-700 hover:underline" href="mailto:legal@resumebuilder.app">legal@resumebuilder.app</a>.</p>
        </section>
      </div>
      </div>
    </>
  )
}
export default Terms

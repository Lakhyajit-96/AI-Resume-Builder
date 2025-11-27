import React from 'react'
import { motion } from 'framer-motion'

const faqs = [
  { q: 'Is the builder ATS‑friendly?', a: 'Yes. We focus on clean structure, consistent headings, and keyword visibility to help pass ATS scans.' },
  { q: 'Can I export to PDF/DOCX?', a: 'Yes. Export is available from the editor. Pro/Premium remove watermarks and add DOCX.' },
  { q: 'Do you store my data securely?', a: 'Passwords are hashed and traffic is encrypted. You control resume visibility and can delete data anytime.' },
  { q: 'How does AI use my content?', a: 'AI only runs on demand to generate suggestions. You choose what to accept. We keep an audit trail for transparency.' },
]

const FAQ = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 py-12">
      <motion.h2
        className="text-2xl md:text-3xl font-semibold text-slate-800 text-center"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.25 }}
      >
        Frequently asked questions
      </motion.h2>
      <div className="mt-6 grid md:grid-cols-2 gap-4 md:gap-6">
        {faqs.map((f, i) => (
          <motion.div
            key={f.q}
            className="rounded-xl border border-slate-200 bg-white/70 p-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
          >
            <p className="text-base font-semibold text-slate-800">{f.q}</p>
            <p className="text-sm text-slate-600 mt-1">{f.a}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FAQ

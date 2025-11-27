import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  { title: 'Choose a template', text: 'Pick from clean, recruiter‑approved designs.' },
  { title: 'Import or start fresh', text: 'Upload PDF/DOCX or begin with guided prompts.' },
  { title: 'Tailor with AI', text: 'Match any job description with targeted bullets.' },
  { title: 'Export & share', text: 'One‑click PDF/DOCX export and public share links.' },
]

const HowItWorks = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 py-12">
      <motion.h2
        className="text-2xl md:text-3xl font-semibold text-slate-800 text-center"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.25 }}
      >
        How it works
      </motion.h2>
      <div className="grid md:grid-cols-4 gap-4 md:gap-6 mt-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            className="rounded-xl border border-slate-200 bg-white/70 p-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
          >
            <p className="text-base font-semibold text-slate-800">{s.title}</p>
            <p className="text-sm text-slate-600 mt-1">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default HowItWorks

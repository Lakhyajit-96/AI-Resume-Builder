import React from 'react'
import Navbar from '../../components/Navbar'

const posts = [
  {
    title: 'We analyzed 8,000 tech hiring pipelines—here’s what got interviews',
    date: 'Nov 12, 2025',
    tags: ['Data deep dive', 'Tech'],
    excerpt: 'Product managers who quantified roadmap impact saw 42% higher callback rates. Engineers mentioning deployment frequency and incident ownership outperformed peers by 31%.',
  },
  {
    title: 'How our AI bullet generator is audited for bias every quarter',
    date: 'Oct 30, 2025',
    tags: ['AI', 'Ethics'],
    excerpt: 'We run fairness evaluations across gender-neutral names and global industries, retraining prompts that drift. Here’s the checklist our Responsible AI guild uses.',
  },
  {
    title: 'From resume to offer: a recruiter’s playbook for tailoring applications',
    date: 'Oct 9, 2025',
    tags: ['Strategy', 'Recruiting'],
    excerpt: 'Former Amazon recruiter Priya Shah outlines the 5 signals she scans—role alignment, velocity, levelling, leadership, and calibration to JD keywords.',
  },
]

const Blogs = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-16 text-slate-800">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold">Blog</h1>
        <p className="text-slate-600 mt-2">Insights on resumes, interviews, and the modern job search—curated by our team and industry recruiters.</p>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6 md:gap-8">
        {posts.map((p) => (
          <article key={p.title} className="rounded-xl border border-slate-200 bg-white/70 p-6 hover:shadow-sm transition-shadow">
            <h2 className="text-lg font-semibold text-slate-800">{p.title}</h2>
            <div className="mt-1 text-xs text-slate-500 flex items-center gap-2">
              <span>{p.date}</span>
              <span>•</span>
              <ul className="flex gap-2">
                {p.tags.map(t => (
                  <li key={t} className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">{t}</li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-slate-700 mt-3">{p.excerpt}</p>
            <button className="mt-4 text-sm text-green-700 hover:underline">Read more</button>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white/60 p-6">
        <h3 className="text-base font-semibold text-slate-800">Want updates?</h3>
        <p className="text-sm text-slate-600 mt-1">Subscribe for quarterly benchmark reports, sector-specific template releases, and live workshop invites.</p>
        <div className="mt-3 flex gap-2">
          <input className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-sm" placeholder="you@company.com" type="email" aria-label="Email address" />
          <button className="rounded-md bg-green-600 hover:bg-green-700 text-white px-4 text-sm">Subscribe</button>
        </div>
      </div>
      </div>
    </>
  )
}
export default Blogs

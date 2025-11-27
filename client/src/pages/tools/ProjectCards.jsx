import React, { useState } from 'react'
import api from '../../configs/api'

const ProjectCards = () => {
  const [projectsJson, setProjectsJson] = useState('[\n  {"name":"Project X","type":"Web App","description":"A tool for..."}\n]')
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    try {
      const projects = JSON.parse(projectsJson)
      if (!Array.isArray(projects)) throw new Error('projects must be an array')
      setLoading(true)
      const token = localStorage.getItem('token')
      const { data } = await api.post('/api/ai-plus/project-cards', { projects }, { headers: { Authorization: token } })
      setCards(data.cards || [])
      document.title = 'Project Cards | Resume Builder'
    } catch (e) {
      alert(e?.response?.data?.message || e.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-10">
      <h1 className="text-2xl font-semibold text-slate-800">Project Cards</h1>
      <p className="text-slate-600 mt-1">Generate concise project summaries and bullets.</p>

      <textarea value={projectsJson} onChange={e=>setProjectsJson(e.target.value)} className="mt-4 w-full h-48 border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400" />
      <button onClick={submit} disabled={loading} className={`mt-3 rounded-md bg-green-600 hover:bg-green-700 text-white px-5 py-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>Generate</button>

      {!!cards.length && (
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {cards.map((c, i)=> (
            <div key={i} className="rounded-xl border border-slate-200 bg-white/70 p-6">
              <h3 className="text-lg font-semibold text-slate-800">{c.name}</h3>
              <p className="text-sm text-slate-700 mt-1">{c.summary}</p>
              <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
                {(c.bullets || []).map((b, j)=> <li key={j}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectCards

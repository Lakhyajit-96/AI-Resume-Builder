import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../configs/api'

const TailorToJob = () => {
  const { resumeId } = useParams()
  const [jobText, setJobText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!jobText.trim()) return
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const { data } = await api.post('/api/ai-plus/score', { resumeId, jobText }, { headers: { Authorization: token } })
      setResult(data)
      document.title = 'Tailor to Job | Resume Builder'
    } catch (e) {
      alert(e?.response?.data?.message || e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-10">
      <h1 className="text-2xl font-semibold text-slate-800">Tailor to Job</h1>
      <p className="text-slate-600 mt-1">Paste the job description to get a fit score and actionable gaps.</p>

      <textarea value={jobText} onChange={e=>setJobText(e.target.value)} placeholder="Paste job description here" className="mt-4 w-full h-48 border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400" />

      <button onClick={submit} disabled={loading} className={`mt-3 rounded-md bg-green-600 hover:bg-green-700 text-white px-5 py-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>Analyze</button>

      {result && (
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
            <h2 className="text-lg font-semibold text-slate-800">Score</h2>
            <p className="text-3xl font-bold text-slate-800 mt-2">{result.score ?? '—'}/100</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
            <h2 className="text-lg font-semibold text-slate-800">Skill gaps</h2>
            <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
              {(result.skill_gaps || []).map((s, i)=> <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className="md:col-span-2 rounded-xl border border-slate-200 bg-white/70 p-6">
            <h2 className="text-lg font-semibold text-slate-800">Insights</h2>
            <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
              {(result.insights || []).map((s, i)=> <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default TailorToJob

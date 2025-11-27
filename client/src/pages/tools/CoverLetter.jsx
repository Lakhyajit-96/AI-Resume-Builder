import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../configs/api'

const CoverLetter = () => {
  const { resumeId } = useParams()
  const [jobText, setJobText] = useState('')
  const [language, setLanguage] = useState('en')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!jobText.trim()) return
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const { data } = await api.post('/api/ai-plus/cover-letter', { resumeId, jobText, language }, { headers: { Authorization: token } })
      setContent(data.content)
      document.title = 'Cover Letter | Resume Builder'
    } catch (e) {
      alert(e?.response?.data?.message || e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-10">
      <h1 className="text-2xl font-semibold text-slate-800">Cover Letter</h1>
      <p className="text-slate-600 mt-1">Generate a tailored cover letter.</p>

      <div className="mt-4 grid md:grid-cols-3 gap-3">
        <textarea value={jobText} onChange={e=>setJobText(e.target.value)} placeholder="Paste job description here" className="md:col-span-2 w-full h-48 border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400" />
        <div>
          <label className="block text-sm text-slate-600">Language</label>
          <select value={language} onChange={e=>setLanguage(e.target.value)} className="mt-1 w-full border border-slate-300 rounded-lg p-2">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="fr">French</option>
            <option value="hi">Hindi</option>
          </select>
          <button onClick={submit} disabled={loading} className={`mt-3 w-full rounded-md bg-green-600 hover:bg-green-700 text-white px-5 py-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>Generate</button>
        </div>
      </div>

      {!!content && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white/70 p-6 whitespace-pre-wrap text-slate-800">
          {content}
        </div>
      )}
    </div>
  )
}

export default CoverLetter

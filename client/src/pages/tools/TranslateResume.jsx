import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../configs/api'

const TranslateResume = () => {
  const { resumeId } = useParams()
  const [language, setLanguage] = useState('es')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!language) return
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const { data } = await api.post('/api/ai-plus/translate', { resumeId, language }, { headers: { Authorization: token } })
      setResult(data)
      document.title = 'Translate Resume | Resume Builder'
    } catch (e) {
      alert(e?.response?.data?.message || e.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-10">
      <h1 className="text-2xl font-semibold text-slate-800">Translate Resume</h1>
      <p className="text-slate-600 mt-1">Generate a translated version while preserving structure.</p>

      <div className="mt-4 max-w-xs">
        <label className="block text-sm text-slate-600">Language</label>
        <select value={language} onChange={e=>setLanguage(e.target.value)} className="mt-1 w-full border border-slate-300 rounded-lg p-2">
          <option value="es">Spanish</option>
          <option value="de">German</option>
          <option value="fr">French</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      <button onClick={submit} disabled={loading} className={`mt-3 rounded-md bg-green-600 hover:bg-green-700 text-white px-5 py-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>Translate</button>

      {result && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white/70 p-6">
          <pre className="text-xs whitespace-pre-wrap text-slate-800">{JSON.stringify(result.data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default TranslateResume

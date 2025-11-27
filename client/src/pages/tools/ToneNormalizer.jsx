import React, { useState } from 'react'
import api from '../../configs/api'

const ToneNormalizer = () => {
  const [text, setText] = useState('')
  const [improved, setImproved] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!text.trim()) return
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const { data } = await api.post('/api/ai-plus/tone', { text }, { headers: { Authorization: token } })
      setImproved(data.improved || '')
      document.title = 'Tone & Grammar | Resume Builder'
    } catch (e) {
      alert(e?.response?.data?.message || e.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-10">
      <h1 className="text-2xl font-semibold text-slate-800">Tone & Grammar</h1>
      <p className="text-slate-600 mt-1">Rewrite for clarity and professional tone.</p>

      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Paste text" className="mt-4 w-full h-48 border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400" />
      <button onClick={submit} disabled={loading} className={`mt-3 rounded-md bg-green-600 hover:bg-green-700 text-white px-5 py-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>Improve</button>

      {!!improved && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white/70 p-6 whitespace-pre-wrap text-slate-800">
          {improved}
        </div>
      )}
    </div>
  )
}

export default ToneNormalizer

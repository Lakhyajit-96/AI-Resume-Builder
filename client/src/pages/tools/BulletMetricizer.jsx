import React, { useState } from 'react'
import api from '../../configs/api'

const BulletMetricizer = () => {
  const [bulletsText, setBulletsText] = useState('')
  const [improved, setImproved] = useState([])
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    const bullets = bulletsText.split('\n').map(s=>s.trim()).filter(Boolean)
    if (!bullets.length) return
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const { data } = await api.post('/api/ai-plus/metricize', { bullets }, { headers: { Authorization: token } })
      setImproved(data.improved || [])
      document.title = 'Metricize Bullets | Resume Builder'
    } catch (e) {
      alert(e?.response?.data?.message || e.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-10">
      <h1 className="text-2xl font-semibold text-slate-800">Metricize Bullets</h1>
      <p className="text-slate-600 mt-1">Rewrite bullets with quantified impact.</p>

      <textarea value={bulletsText} onChange={e=>setBulletsText(e.target.value)} placeholder="Enter bullets, one per line" className="mt-4 w-full h-48 border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400" />
      <button onClick={submit} disabled={loading} className={`mt-3 rounded-md bg-green-600 hover:bg-green-700 text-white px-5 py-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}>Rewrite</button>

      {!!improved.length && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white/70 p-6">
          <h2 className="text-lg font-semibold text-slate-800">Improved Bullets</h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-slate-700 space-y-1">
            {improved.map((b,i)=> <li key={i}>{b}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

export default BulletMetricizer

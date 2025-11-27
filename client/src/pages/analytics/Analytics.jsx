import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../configs/api'

const Analytics = () => {
  const { resumeId } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const load = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        const res = await api.get(`/api/analytics/summary/${resumeId}`, { headers: { Authorization: token } })
        setData(res.data)
        document.title = 'Analytics | Resume Builder'
      } catch (e) {
        setData(null)
      } finally { setLoading(false) }
    }
    load()
  }, [resumeId])

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-10">
      <h1 className="text-2xl font-semibold text-slate-800">Analytics</h1>
      <p className="text-slate-600 mt-1">Views, downloads, and shares.</p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white/70 p-6">
        {loading ? (
          <p className="text-slate-600">Loading…</p>
        ) : data ? (
          <ul className="text-slate-800 space-y-2">
            <li><span className="font-medium">Views:</span> {data.view || 0}</li>
            <li><span className="font-medium">Downloads:</span> {data.download || 0}</li>
            <li><span className="font-medium">Shares:</span> {data.share || 0}</li>
          </ul>
        ) : (
          <p className="text-slate-600">No data.</p>
        )}
      </div>
    </div>
  )
}

export default Analytics

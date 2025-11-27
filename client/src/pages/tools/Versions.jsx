import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../configs/api'

const Versions = () => {
  const { resumeId } = useParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)

  const load = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const { data } = await api.get(`/api/versions/list/${resumeId}`, { headers: { Authorization: token } })
      setItems(data.items || [])
      document.title = 'Versions | Resume Builder'
    } catch (e) { /* noop */ } finally { setLoading(false) }
  }

  useEffect(()=>{ load() }, [resumeId])

  const createSnapshot = async () => {
    try {
      setCreating(true)
      const token = localStorage.getItem('token')
      await api.post('/api/versions/create', { resumeId }, { headers: { Authorization: token } })
      await load()
    } catch (e) { alert(e?.response?.data?.message || e.message) } finally { setCreating(false) }
  }

  const restore = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await api.post(`/api/versions/restore/${id}`, {}, { headers: { Authorization: token } })
      alert('Restored. Open the builder to see changes.')
    } catch (e) { alert(e?.response?.data?.message || e.message) }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-800">Versions</h1>
        <button onClick={createSnapshot} disabled={creating} className={`rounded-md bg-green-600 hover:bg-green-700 text-white px-5 py-2 ${creating ? 'opacity-60 cursor-not-allowed' : ''}`}>Create snapshot</button>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white/70 p-6">
        {loading ? (
          <p className="text-slate-600">Loading…</p>
        ) : (
          <ul className="space-y-3">
            {items.map(v => (
              <li key={v._id} className="flex items-center justify-between">
                <div>
                  <p className="text-slate-800 font-medium">{v.title || 'Snapshot'}</p>
                  <p className="text-xs text-slate-500">{new Date(v.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={()=>restore(v._id)} className="text-sm rounded-md border border-slate-300 px-4 py-1.5 hover:bg-slate-50">Restore</button>
              </li>
            ))}
            {!items.length && <p className="text-slate-600">No snapshots yet.</p>}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Versions

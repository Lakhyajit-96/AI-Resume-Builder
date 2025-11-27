import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../configs/api'

const FeedbackPage = () => {
  const { token } = useParams()
  const [resumeId, setResumeId] = useState(null)
  const [role, setRole] = useState('')
  const [items, setItems] = useState([])
  const [authorName, setAuthorName] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')
  const [comment, setComment] = useState('')

  const load = async () => {
    try {
      const { data: resolved } = await api.get(`/api/share-links/resolve/${token}`)
      setResumeId(resolved.resumeId)
      setRole(resolved.role)
      const { data: list } = await api.get(`/api/share-links/feedback/${token}`)
      setItems(list.items || [])
      document.title = 'Feedback | Resume Builder'
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(e?.response?.data?.message || e.message)
    }
  }

  useEffect(()=>{ load() }, [token])

  const submit = async () => {
    try {
      const { data } = await api.post(`/api/share-links/feedback/${token}`, { authorName, authorEmail, comment })
      setItems([{ _id: data.id, authorName, authorEmail, comment, createdAt: new Date().toISOString() }, ...items])
      setComment('')
    } catch (e) { alert(e?.response?.data?.message || e.message) }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 lg:px-12 py-10">
      <h1 className="text-2xl font-semibold text-slate-800">Feedback</h1>
      <p className="text-slate-600 mt-1">Leave comments for the owner.</p>

      <div className="mt-4 grid gap-3">
        <input value={authorName} onChange={e=>setAuthorName(e.target.value)} placeholder="Your name" className="border border-slate-300 rounded-lg p-2" />
        <input value={authorEmail} onChange={e=>setAuthorEmail(e.target.value)} placeholder="Your email (optional)" className="border border-slate-300 rounded-lg p-2" />
        <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Your comment" className="border border-slate-300 rounded-lg p-3 h-32" />
        <button onClick={submit} className="rounded-md bg-green-600 hover:bg-green-700 text-white px-5 py-2">Submit</button>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white/70 p-6">
        <h2 className="text-lg font-semibold text-slate-800">Comments</h2>
        <ul className="mt-2 space-y-3">
          {items.map(i => (
            <li key={i._id} className="border-b border-slate-200 pb-2">
              <p className="text-slate-800 whitespace-pre-wrap">{i.comment}</p>
              <p className="text-xs text-slate-500 mt-1">{i.authorName || 'Anonymous'} • {new Date(i.createdAt).toLocaleString()}</p>
            </li>
          ))}
          {!items.length && <p className="text-slate-600">No comments yet.</p>}
        </ul>
      </div>
    </div>
  )
}

export default FeedbackPage

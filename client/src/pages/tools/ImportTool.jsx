import React, { useState } from 'react'
import api from '../../configs/api'

const ImportTool = () => {
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const upload = async () => {
    if (!file) return
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const fd = new FormData()
      fd.append('file', file)
      const { data } = await api.post('/api/imports/upload', fd, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })
      setText(data.text || '')
      setPreview(data.preview || null)
      document.title = 'Import Resume | Resume Builder'
    } catch (e) {
      alert(e?.response?.data?.message || e.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-12 py-10">
      <h1 className="text-2xl font-semibold text-slate-800">Import Resume</h1>
      <p className="text-slate-600 mt-1">Upload PDF/DOCX to extract text and preview mapping.</p>

      <div className="mt-4 flex items-center gap-3">
        <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={e=>setFile(e.target.files?.[0] || null)} />
        <button onClick={upload} disabled={loading || !file} className={`rounded-md bg-green-600 hover:bg-green-700 text-white px-5 py-2 ${loading || !file ? 'opacity-60 cursor-not-allowed' : ''}`}>Upload</button>
      </div>

      {!!text && (
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
            <h2 className="text-lg font-semibold text-slate-800">Extracted Text</h2>
            <pre className="mt-2 text-xs whitespace-pre-wrap text-slate-800 max-h-80 overflow-auto">{text}</pre>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white/70 p-6">
            <h2 className="text-lg font-semibold text-slate-800">Mapping Preview</h2>
            <pre className="mt-2 text-xs whitespace-pre-wrap text-slate-800">{JSON.stringify(preview, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImportTool

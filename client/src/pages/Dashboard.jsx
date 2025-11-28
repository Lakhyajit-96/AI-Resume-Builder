import React, { useEffect, useState } from 'react'
import {FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon, XIcon} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from "react-hot-toast";
import api from '../configs/api.js'

const Dashboard = () => {

    const { user, token } = useSelector(state => state.auth)

    const colors = ['#9333ea', '#d97706', '#dc2626', '#0284c7', '#16a34a']
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [createTitle, setCreateTitle] = useState('')
  // separate title for upload modal so the create flow and upload flow don't interfere
  const [uploadTitle, setUploadTitle] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [editResumeId, setEditResumeId] = useState('')
  const [editTitle, setEditTitle] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const loadAllResumes = async () => {
    try {
        const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token }})
        setAllResumes(data.resumes)
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (event) => {
    event.preventDefault()
    // prefer backend create when token is available
    if (token) {
      try {
        const { data } = await api.post('/api/resumes/create', { title: createTitle }, { headers: { Authorization: token } })
        if (data?.resume) {
          setAllResumes(prev => [...prev, data.resume])
          setCreateTitle('')
          setShowCreateResume(false)
          navigate(`/app/builder/${data.resume._id}`)
          return
        }
      } catch (error) {
        // show server error and fall back to local mock create
        toast.error(error?.response?.data?.message || error.message || 'Failed to create resume on server, creating locally')
      }
    }

    // fallback local create (keeps behavior if backend isn't reachable)
    const newResume = { _id: Date.now().toString(), title: createTitle || 'Untitled Resume', updatedAt: new Date().toISOString() }
    setAllResumes(prev => [...prev, newResume])
    setCreateTitle('')
    setShowCreateResume(false)
    navigate(`/app/builder/${newResume._id}`)
  }

  const uploadResume = async (event) => {
    event.preventDefault()

    if (!selectedFile) {
      toast.error('Please select a resume file before uploading.')
      return
    }
    if (!uploadTitle || !uploadTitle.trim()) {
      toast.error('Please enter a title for the uploaded resume.')
      return
    }

    const formData = new FormData()
    formData.append('title', uploadTitle.trim())
    formData.append('resume', selectedFile)

    setIsLoading(true)
    try {
      const { data } = await api.post('/api/ai/upload-resume', formData, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' },
      })

      setUploadTitle('')
      setSelectedFile(null)
      setShowUploadResume(false)
      await loadAllResumes()
      navigate(`/app/builder/${data.resumeId}`)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const updateTitle = async (event) => {
        try {
            event.preventDefault()
            const formData = new FormData();
                        formData.append('resumeId', editResumeId);
                        formData.append('resumeData', JSON.stringify({ title: editTitle }));
                        const { data } = await api.put(`/api/resumes/update`, formData, { headers: { Authorization: token }})
            setAllResumes(allResumes.map(resume => resume._id === editResumeId ? { ...resume, title: editTitle } : resume))
            setEditTitle('')
            setEditResumeId('')
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
  }

    const deleteResume = async (resumeId) => {
        try {
            const confirm = window.confirm('Are you sure you want to delete this resume?')
            if(confirm) {
                const { data } = await api.delete(`/api/resumes/delete/${resumeId}`,  { headers: { Authorization: token }})
                setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">Welcome, {user?.name || 'User'}</p>
        <div className="flex gap-6 flex-wrap items-stretch">
          <div className="w-full sm:w-auto">
            <button
              onClick={() => setShowCreateResume(true)}
              className="w-full sm:max-w-36 h-48 bg-white flex flex-col items-center justify-center rounded-lg gap-2 text-slate-700 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full">
                  <PlusIcon className="size-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-center">Create a New Resume</h3>
                </div>
              </div>
            </button>
          </div>

          <div className="w-full sm:w-auto">
            <button onClick={() => setShowUploadResume(true)} className="w-full sm:max-w-36 h-48 bg-white flex flex-col items-center justify-center rounded-lg gap-2 text-slate-700 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 text-white rounded-full">
                  <UploadCloudIcon className="size-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-center">Upload an Existing Resume</h3>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <hr className="border-slate-300 my-6 sm:w-[360px]" />

      {/* Align created resume cards with the top action cards by reducing left padding */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:flex flex-wrap gap-4 pl-2">
        {allResumes.map((resume, index) => {
          const baseColor = colors[index % colors.length]
          return (
            <button
              key={index} onClick={()=> navigate(`/app/builder/${resume._id}`)}
              className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`, borderColor: baseColor + '40' }}
            >
              <FilePenLineIcon className="size-7 group-hover:scale-105 transition-all" style={{ color: baseColor }} />
              <p className="text-sm group-hover:scale-105 transition-all px-2 text-center" style={{ color: baseColor }}>{resume.title}</p>
              <p className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center" style={{ color: baseColor + '90' }}>
                Updated on {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              <div onClick={e=> e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden">
                <TrashIcon onClick={()=> deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                <PencilIcon onClick={()=> {setEditResumeId(resume._id); setEditTitle(resume.title)}} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
              </div>
            </button>
          )
        })}
      </div>

      {showCreateResume && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center" onClick={() => { setShowCreateResume(false); setCreateTitle('') }}>
          <form onSubmit={createResume} onClick={(e) => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
            <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
            <input type="text" placeholder="Enter resume title" autoFocus className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600" required value={createTitle} onChange={(e) => setCreateTitle(e.target.value)} />

            <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Create Resume</button>

            {/* Close button (absolute inside relative container) */}
            <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={() => { setShowCreateResume(false); setCreateTitle('') }} />
          </form>
        </div>
      )}

      {showUploadResume && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center" onClick={() => { setShowUploadResume(false); setSelectedFile(null); setUploadTitle('') }}>
          <form onSubmit={uploadResume} onClick={(e) => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
            <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

            {/* Title for the uploaded resume */}
            <input
              type="text"
              name="uploadTitle"
              autoFocus
              placeholder="Enter resume title"
              className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 text-slate-900"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
            />

            {/* Hidden file input; label below acts as the click target */}
            <input id="resume-input" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setSelectedFile(e.target.files && e.target.files[0])} />

            <div>
              <label htmlFor="resume-input" className="block text-sm text-slate-700">
                Select resume file
                <div className="flex flex-col items-center justify-center gap-2 border text-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-500 cursor-pointer transition-colors">
                  {selectedFile ? (
                    <p className="text-green-700">{selectedFile.name}</p>
                  ) : (
                    <>
                      <UploadCloudIcon className="size-14 stroke-1" />
                      <p>Upload resume</p>
                    </>
                  )}
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={!(selectedFile && uploadTitle && uploadTitle.trim()) || isLoading}
              className={`w-full py-2 rounded transition-colors flex items-center justify-center gap-2 ${selectedFile && uploadTitle && uploadTitle.trim() && !isLoading ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-300 text-white/60 cursor-not-allowed'}`}>
                {isLoading && <LoaderCircleIcon className="animate-spin size-4" />}
                {isLoading ? 'Uploading...' : 'Upload Resume'}
            </button>

            {/* Close button: clear resume + uploadTitle state when closing */}
            <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={() => { setShowUploadResume(false); setSelectedFile(null); setUploadTitle('') }} />
          </form>
        </div>
      )}

        {editResumeId && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur z-10 flex items-center justify-center" onClick={() => { setEditResumeId(''); setEditTitle('') }}>
                <form onSubmit={updateTitle} onClick={(e) => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
                    <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
                    <input type="text" placeholder="Enter resume title" className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600" required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />

                    <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Update</button>

                    {/* Close button (absolute inside relative container) */}
                    <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={() => { setEditResumeId(''); setEditTitle('') }} />
                </form>
            </div>
        )}
    </div>
  )
}

export default Dashboard

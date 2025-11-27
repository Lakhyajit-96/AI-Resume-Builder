import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
import { useDispatch } from 'react-redux'
import api from "./configs/api.js";
import {login, setLoading} from './app/features/authSlice'
import {Toaster} from 'react-hot-toast'
import Support from './pages/static/Support'
import Pricing from './pages/static/Pricing'
import Affiliate from './pages/static/Affiliate'
import Company from './pages/static/Company'
import Blogs from './pages/static/Blogs'
import Community from './pages/static/Community'
import Careers from './pages/static/Careers'
import About from './pages/static/About'
import Privacy from './pages/static/Privacy'
import Terms from './pages/static/Terms'
import TailorToJob from './pages/tools/TailorToJob'
import BulletMetricizer from './pages/tools/BulletMetricizer'
import TranslateResume from './pages/tools/TranslateResume'
import ProjectCards from './pages/tools/ProjectCards'
import ToneNormalizer from './pages/tools/ToneNormalizer'
import ImportTool from './pages/tools/ImportTool'
import Versions from './pages/tools/Versions'
import CoverLetter from './pages/tools/CoverLetter'
import AnalyticsPage from './pages/analytics/Analytics'
import Checkout from './pages/checkout/Checkout'
import FeedbackPage from './pages/feedback/Feedback'

const App = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        const getUserData = async () => {
            const token = localStorage.getItem("token")
            try {
                if(token){
                    const { data } = await api.get('/api/users/data', {headers: {"Authorization": token}})
                    if(data.user){
                        dispatch(login({token, user: data.user}))
                    }
                    dispatch(setLoading(false))
                }else{
                    dispatch(setLoading(false))
                }
            } catch (error) {
                dispatch(setLoading(false))
                console.log(error.message)
            }
        }

        getUserData()
    },[dispatch])

    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    {/* Public static pages */}
                    <Route path="support" element={<Support />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="affiliate" element={<Affiliate />} />
                    <Route path="company" element={<Company />} />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path="community" element={<Community />} />
                    <Route path="careers" element={<Careers />} />
                    <Route path="about" element={<About />} />
                    <Route path="privacy" element={<Privacy />} />
                    <Route path="terms" element={<Terms />} />

                    {/* Protected app pages */}
                    <Route path="app" element={<Dashboard />} />
                    <Route path="app/builder/:resumeId" element={<ResumeBuilder />} />
                    <Route path="app/tools/tailor/:resumeId" element={<TailorToJob />} />
                    <Route path="app/tools/metricize" element={<BulletMetricizer />} />
                    <Route path="app/tools/translate/:resumeId" element={<TranslateResume />} />
                    <Route path="app/tools/project-cards" element={<ProjectCards />} />
                    <Route path="app/tools/tone" element={<ToneNormalizer />} />
                    <Route path="app/tools/import" element={<ImportTool />} />
                    <Route path="app/cover-letter/:resumeId" element={<CoverLetter />} />
                    <Route path="app/versions/:resumeId" element={<Versions />} />
                    <Route path="app/analytics/:resumeId" element={<AnalyticsPage />} />
                    <Route path="app/checkout" element={<Checkout />} />
                </Route>

                <Route path="view/:resumeId" element={<Preview />} />
                <Route path="feedback/:token" element={<FeedbackPage />} />
            </Routes>
        </>
    )
}
export default App


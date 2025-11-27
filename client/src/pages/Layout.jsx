import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/home/Footer'
import {useSelector} from "react-redux";
import Loader from '../components/Loader';
import Login from './Login'
import { AnimatePresence, motion } from 'framer-motion'

const Layout = () => {
    const location = useLocation()
    const {user, loading} = useSelector(state => state.auth)
    const isHome = location.pathname === '/' || location.pathname === '/support' || location.pathname === '/pricing' || location.pathname === '/affiliate' || location.pathname === '/company' || location.pathname === '/blogs' || location.pathname === '/community' || location.pathname === '/careers' || location.pathname === '/about' || location.pathname === '/privacy' || location.pathname === '/terms'

    if(loading){
        return <Loader />
    }

    return (
        <div>
            {
                user ? (
                    <div className="min-h-screen bg-gray-50">
                        {!isHome && <Navbar />}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                ) : (
                    // if not logged in, allow access to homepage (index route) but protect other routes
                    isHome ? (
                        <div className="min-h-screen bg-gray-50">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={location.pathname}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Outlet />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Login />
                    )
                )
            }
            <Footer />
        </div>
    )
}
export default Layout

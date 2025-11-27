import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {logout} from "../app/features/authSlice.js";

const Navbar = () => {
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutUser = ()=>{
        dispatch(logout())
        navigate("/")
    }
    return (
        <div className="shadow bg-white">
           <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
               <Link to="/">
                   <img src="/logo.svg" alt="logo" className="h-11 w-auto" />
               </Link>
               <div className="flex items-center gap-4 text-sm">
                   {
                       user ? (
                           <>
                               <p className="max-sm:hidden">Hi, <span className="font-medium">{user?.name}</span></p>
                               <button onClick={logoutUser} className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all">Logout</button>
                           </>
                       ) : (
                           <button onClick={() => navigate('/app')} className="bg-green-600 text-white hover:bg-green-700 px-7 py-1.5 rounded-full active:scale-95 transition-all">Login</button>
                       )
                   }
               </div>
           </nav>
        </div>
    )
}
export default Navbar

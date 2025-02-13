import { useEffect } from 'react';

import Navbar from './components/Navbar';

import Home from "./pages/Home"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./store/useAuthStore"
import { useThemeStore } from "./store/useThemeStore"


import { Loader} from "lucide-react"
import { Toaster } from "react-hot-toast"



const App = () => {
  const { authUser, checkAuth, isCheckingAuth, activeUsers} = useAuthStore() //use the hooks for state wherever required.
  const { theme } = useThemeStore()

  console.log({ activeUsers })
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log( { authUser })

  if(isCheckingAuth && !authUser) 
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
  )
  
  return (
      <div data-theme={ theme }>
        <Navbar />
        <Routes>
            <Route path="/" element={ authUser ? <Home /> : <Navigate to= "/login"/>} />
            <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/"/>} />
            <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/"/>} />
            <Route path="/settings" element={ <Settings />} />
            <Route path="/profile" element={authUser ?  <Profile /> : <Navigate to= "/login" />} />
        </Routes>
        <Toaster toastOptions={{style: {
          background: '#1c1c1c',
          color: '#fff',
        },
        iconTheme: {
          primary:'#db276c',

        }}}/>
      </div>
  )
}

export default App

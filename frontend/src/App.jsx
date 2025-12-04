import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import LiveChat from './pages/LiveChat'
import DiseaseDiagnosis from './pages/DiseaseDiagnosis'
import MarketPrices from './pages/MarketPrices'
import SmartUtilities from './pages/SmartUtilities'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import { useNavigate, useLocation } from 'react-router-dom'

export default function App() {
  const [theme, setTheme] = useState('dark')
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') root.setAttribute('data-theme', 'light')
    else root.removeAttribute('data-theme')
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  // Redirect to login if not authenticated
  useEffect(() => {
    const token = localStorage.getItem('token')
    const publicPaths = ['/login', '/register']
    if (!token && !publicPaths.includes(location.pathname)) {
      navigate('/login', { replace: true })
    }
    // If already authenticated, keep users out of auth pages
    if (token && publicPaths.includes(location.pathname)) {
      navigate('/', { replace: true })
    }
  }, [location.pathname, navigate])

  // Full-screen auth shell without sidebar/topbar
  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    )
  }

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <div className="topbar">
          <h1>Project Kisan</h1>
          <span className="badge">UI</span>
          <div className="spacer" />
          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <span aria-hidden>🌗</span>
            <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
        <main className="content-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/live-chat" element={<LiveChat />} />
            <Route path="/disease-diagnosis" element={<DiseaseDiagnosis />} />
            <Route path="/market-prices" element={<MarketPrices />} />
            <Route path="/smart-utilities" element={<SmartUtilities />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

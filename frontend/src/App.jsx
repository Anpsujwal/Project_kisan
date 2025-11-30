import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import LiveChat from './pages/LiveChat'
import DiseaseDiagnosis from './pages/DiseaseDiagnosis'
import MarketPrices from './pages/MarketPrices'
import GovernmentSchemes from './pages/GovernmentSchemes'
import SmartUtilities from './pages/SmartUtilities'
import Sidebar from './components/Sidebar'

export default function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') root.setAttribute('data-theme', 'light')
    else root.removeAttribute('data-theme')
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

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
            <Route path="/government-schemes" element={<GovernmentSchemes />} />
            <Route path="/market-prices" element={<MarketPrices />} />
            <Route path="/smart-utilities" element={<SmartUtilities />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

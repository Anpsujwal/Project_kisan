import { useEffect, useRef, useState } from 'react'
import { api } from '../services/api'

export default function LiveChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [audioFile, setAudioFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const audioRef = useRef(null)

  const send = async () => {
    if (!input && !audioFile) return
    setError('')
    setLoading(true)
    try {
      const userId = ''
      const enriched = input
        ? `You are an agriculture assistant for Indian farmers. If the user asks about government schemes, provide accurate scheme names, eligibility, benefits, and official links when possible. Otherwise answer normally.\n\nUser: ${input}`
        : undefined
      const res = await api.sendMessage({ text: enriched, audioFile, userId })
      setMessages(m => [...m, { role: 'user', text: input || '[voice]' }, { role: 'assistant', text: res.text, audioUrl: res.audioUrl }])
      setInput('')
      setAudioFile(null)
      if (res.audioUrl && audioRef.current) {
        audioRef.current.src = res.audioUrl
        audioRef.current.play().catch(() => {})
      }
    } catch (e) {
      setError(e.message || 'Failed to send')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const h = await api.getChatHistory('')
        const items = (h.items || []).reverse().flatMap(it => ([{ role: 'user', text: it.query }, { role: 'assistant', text: it.response }]))
        setMessages(items)
      } catch {}
    }
    fetchHistory()
  }, [])

  return (
    <section className="card">
      <h2 className="section-title">Live Chat</h2>
      {error ? <div className="alert error" role="alert">{error}</div> : null}
      <div className="messages-panel">
        {messages.length === 0 ? <p className="muted">[Messages will appear here]</p> : (
          messages.map((m, i) => (
            <div key={i} className="message">
              <strong>{m.role === 'user' ? 'You' : 'Assistant'}:</strong> {m.text}
            </div>
          ))
        )}
      </div>
      <div className="form-row">
        <input className="input grow" aria-label="Message" placeholder="Ask about crops, prices, or government schemes..." value={input} onChange={e => setInput(e.target.value)} />
        <input aria-label="Attach audio" type="file" accept="audio/*" onChange={e => setAudioFile(e.target.files?.[0] || null)} />
        <button className="button" type="button" onClick={send} disabled={loading}>{loading ? 'Sending...' : 'Send'}</button>
      </div>
      <audio ref={audioRef} />
    </section>
  )
}

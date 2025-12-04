import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function Account() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await api.me()
        if (!mounted) return
        setUser(res?.user || null)
      } catch (e) {
        setError(e?.message || 'Failed to load account')
      } finally {
        setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  return (
    <section className="card">
      <h2 className="section-title">Account</h2>
      {loading && <p className="muted">Loading account...</p>}
      {error && <div className="alert error">{error}</div>}
      {user && (
        <div className="row" style={{ gap: 12 }}>
          <div className="col">
            <div className="card">
              <h3 style={{ marginTop: 0 }}>Profile</h3>
              <div style={{ display: 'grid', gap: 10 }}>
                <div>
                  <div className="muted">Name</div>
                  <div>{user.name || '-'}</div>
                </div>
                <div>
                  <div className="muted">Email</div>
                  <div>{user.email || '-'}</div>
                </div>
                <div>
                  <div className="muted">Phone</div>
                  <div>{user.phone || '-'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

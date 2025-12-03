import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 6 || password.length > 20) {
      setError('Password must be 6-20 characters')
      return
    }
    setLoading(true)
    try {
      await api.login({ email, password })
      navigate('/')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <form className="card" onSubmit={onSubmit}>
        <h2>Login</h2>
        {error ? <div className="alert">{error}</div> : null}
        <label>
          <span>Email: </span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          <span>Password: </span>
          <input type="password" minLength={6} maxLength={20} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        <p className="muted">Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  )
}

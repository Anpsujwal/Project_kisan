import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { api } from '../services/api'

export default function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const phoneRegex = /^\+?[1-9]\d{9,14}$/
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid phone number (10-15 digits, optional +country code)')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (password.length < 6 || password.length > 20) {
      setError('Password must be 6-20 characters')
      return
    }
    if (!/^[A-Z]/.test(password)) {
      setError('Password must start with a capital letter')
      return
    }
    if (!/\d/.test(password)) {
      setError('Password must contain at least one digit')
      return
    }
    if (!/[!@#$%^&*(),.?":{}|<>_\-\[\]\\\/`'~+=;]/.test(password)) {
      setError('Password must contain at least one special character')
      return
    }
    setLoading(true)
    try {
      await api.register({ name, email, password, phone })
      navigate('/')
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <form className="card" onSubmit={onSubmit}>
        <h2>Register</h2>
        {error ? <div className="alert">{error}</div> : null}
        <label>
          <span>Name: </span>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          <span>Phone: </span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            title="Enter phone as 10-15 digits, optional leading +country code"
            placeholder="e.g. +919876543210"
          />
        </label>
        <label>
          <span>Email: </span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required title="Enter a valid email address (e.g., name@example.com)" />
        </label>
        <label>
          <span>Password: </span>
          <input type="password" minLength={6} maxLength={20} value={password} onChange={(e) => setPassword(e.target.value)} required title="6-20 chars, start with a capital letter, include a digit and a special character" />
        </label>
        <button className="button" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
        <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  )
}

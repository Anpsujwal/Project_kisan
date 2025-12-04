import { useState } from 'react'
import { api } from '../services/api'

export default function MarketPrices() {
  const [commodity, setCommodity] = useState('')
  const [state, setState] = useState('')
  const [district, setDistrict] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  const search = async () => {
    setLoading(true); setError('')
    try {
      const res = await api.getMarketPrices({ commodity, state, district })
      setData(res)
    } catch (e) {
      setError(e.message || 'Failed to fetch prices')
    } finally { setLoading(false) }
  }
  const reset = () => { setCommodity(''); setState(''); setDistrict(''); setData(null) }

  return (
    <section className="card">
      <h2 className="section-title">Market Prices</h2>
      {error ? <div className="alert error" role="alert">{error}</div> : null}
      <div className="card">
        <h3>Filters</h3>
        <label htmlFor="commodity">Commodity</label>
        <input id="commodity" className="input" placeholder="e.g., Wheat" value={commodity} onChange={e=>setCommodity(e.target.value)} />
        <label htmlFor="state">State</label>
        <input id="state" className="input" placeholder="e.g., Maharashtra" value={state} onChange={e=>setState(e.target.value)} />
        <label htmlFor="district">District</label>
        <input id="district" className="input" placeholder="e.g., Pune" value={district} onChange={e=>setDistrict(e.target.value)} />
        <div className="form-row" style={{marginTop:12}}>
          <button className="button" type="button" onClick={search} disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
          <button className="button ghost" type="button" onClick={reset}>Reset</button>
        </div>
      </div>
      <div className="card" style={{marginTop:12}}>
        <h3>Results</h3>
        {!data ? <p>No data yet.</p> : (
          <div>
            <p><strong>Commodity:</strong> {data.commodity || commodity}</p>
            <p><strong>Location:</strong> {data.state || state} {data.district ? `/ ${data.district}` : (district ? `/ ${district}` : '')}</p>
            <p><strong>Today:</strong> {data.today?.price ? `₹${data.today.price}` : '-'}</p>
            {Array.isArray(data.trend) && data.trend.length > 0 && (
              <div style={{marginTop:8}}>
                <strong>Trend:</strong>
                <div style={{display:'flex', gap:8, marginTop:6, alignItems:'flex-end'}}>
                  {data.trend.map((t,i) => (
                    <div key={i} title={`${t.date}: ₹${t.price}`} style={{height: Math.max(8, Math.min(80, t.price/10))+'px', width:'8px', background:'var(--primary)', borderRadius:4}} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

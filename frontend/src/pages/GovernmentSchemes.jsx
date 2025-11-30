import { useState } from 'react'
import { api } from '../services/api'

export default function GovernmentSchemes() {
  const [category, setCategory] = useState('')
  const [state, setState] = useState('')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState([])

  const search = async () => {
    setLoading(true); setError('')
    try {
      const res = await api.searchSchemes({ query, category, state })
      setResults(res.items || [])
    } catch (e) {
      setError(e.message || 'Failed to fetch schemes')
    } finally { setLoading(false) }
  }

  return (
    <section className="card">
      <h2 className="section-title">Government Schemes</h2>
      {error ? <div className="alert error" role="alert">{error}</div> : null}
      <div className="card">
        <h3>Search Filters</h3>
        <label htmlFor="category">Category</label>
        <select id="category" className="input" value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="">All</option>
          <option>Subsidy</option>
          <option>Insurance</option>
          <option>Credit</option>
        </select>
        <label htmlFor="state">State</label>
        <input id="state" className="input" placeholder="e.g., Karnataka" value={state} onChange={e=>setState(e.target.value)} />
        <label htmlFor="keywords">Keywords</label>
        <input id="keywords" className="input" placeholder="e.g., irrigation" value={query} onChange={e=>setQuery(e.target.value)} />
        <div className="form-row" style={{marginTop:12}}>
          <button className="button" type="button" onClick={search} disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>
        </div>
      </div>
      <div className="card" style={{marginTop:12}}>
        <h3>Results</h3>
        {results.length === 0 ? <p>No results.</p> : (
          <div className="row">
            {results.map((r, i) => (
              <div className="col card" key={i}>
                <h4>{r.title || r.name || 'Scheme'}</h4>
                {r.eligibility && <p><strong>Eligibility:</strong> {r.eligibility}</p>}
                {r.benefits && <p><strong>Benefits:</strong> {r.benefits}</p>}
                {r.how_to_apply && <p><strong>How to apply:</strong> {r.how_to_apply}</p>}
                {r.link && <a href={r.link} target="_blank" rel="noreferrer">Learn more</a>}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

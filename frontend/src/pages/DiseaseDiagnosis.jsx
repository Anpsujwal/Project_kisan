import { useState } from 'react'
import { api } from '../services/api'

export default function DiseaseDiagnosis() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState('')
  const [crop, setCrop] = useState('')
  const [symptoms, setSymptoms] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const onFile = (e) => {
    const f = e.target.files?.[0]
    setImage(f || null)
    setResult(null)
    if (f) {
      const url = URL.createObjectURL(f)
      setPreview(url)
    } else setPreview('')
  }

  const submit = async () => {
    if (!image) return
    setLoading(true); setError('')
    try {
      const res = await api.analyzeDisease({ imageFile: image, crop, symptoms })
      setResult(res)
    } catch (e) {
      setError(e.message || 'Failed to analyze')
    } finally { setLoading(false) }
  }

  return (
    <section className="card">
      <h2 className="section-title">Disease Diagnosis</h2>
      {error ? <div className="alert error" role="alert">{error}</div> : null}
      <div className="row">
        <div className="col card">
          <h3>Image Upload</h3>
          <input type="file" accept="image/*" onChange={onFile} />
          {preview ? (
            <div style={{marginTop:8}}>
              <img src={preview} alt="preview" style={{maxWidth:'100%', borderRadius:8, border:'1px solid var(--card-border)'}} />
            </div>
          ) : <div style={{marginTop:8, border:'1px dashed var(--card-border)', borderRadius:6, padding:8}}>[Preview area]</div>}
        </div>
        <div className="col card">
          <h3>Symptoms</h3>
          <label htmlFor="crop">Crop</label>
          <input id="crop" className="input" placeholder="e.g., Wheat" value={crop} onChange={e=>setCrop(e.target.value)} />
          <label htmlFor="symptoms">Describe Symptoms</label>
          <textarea id="symptoms" className="input" rows="6" placeholder="Yellowing leaves, spots, etc." value={symptoms} onChange={e=>setSymptoms(e.target.value)} />
          <div style={{marginTop:12}}>
            <button className="button" type="button" onClick={submit} disabled={loading || !image}>{loading ? 'Analyzing...' : 'Submit'}</button>
          </div>
        </div>
      </div>
      {result && (
        <div className="card" style={{marginTop:12}}>
          <h3>Result</h3>
          <p><strong>Disease:</strong> {result.disease || '-'}</p>
          <p><strong>Confidence:</strong> {result.confidence ?? '-'}%</p>
          <p><strong>Treatment:</strong> {result.treatment || '-'}</p>
          <p><strong>Pesticides:</strong> {Array.isArray(result.pesticides) ? result.pesticides.join(', ') : (result.pesticides || '-')}</p>
          <p><strong>Prevention:</strong> {result.prevention || '-'}</p>
        </div>
      )}
    </section>
  )
}

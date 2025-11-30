import { useState } from 'react'
import { api } from '../services/api'

export default function SmartUtilities() {
  // Weather
  const [loc, setLoc] = useState('')
  const [wLoading, setWLoading] = useState(false)
  const [weather, setWeather] = useState(null)
  const [wError, setWError] = useState('')

  // Soil Insights
  const [soilCrop, setSoilCrop] = useState('')
  const [soilType, setSoilType] = useState('')
  const [sLoading, setSLoading] = useState(false)
  const [soil, setSoil] = useState(null)
  const [sError, setSError] = useState('')

  // Outage Prediction
  const [region, setRegion] = useState('')
  const [oLoading, setOLoading] = useState(false)
  const [outage, setOutage] = useState(null)
  const [oError, setOError] = useState('')

  const getWeather = async () => {
    setWLoading(true); setWError(''); setWeather(null)
    try {
      const res = await api.runUtility('weather', { location: loc })
      setWeather(res)
    } catch (e) { setWError(e.message || 'Failed') } finally { setWLoading(false) }
  }

  const getSoil = async () => {
    setSLoading(true); setSError(''); setSoil(null)
    try {
      const res = await api.runUtility('soil', { crop: soilCrop, soilType })
      setSoil(res)
    } catch (e) { setSError(e.message || 'Failed') } finally { setSLoading(false) }
  }

  const getOutage = async () => {
    setOLoading(true); setOError(''); setOutage(null)
    try {
      const res = await api.runUtility('outage', { region })
      setOutage(res)
    } catch (e) { setOError(e.message || 'Failed') } finally { setOLoading(false) }
  }

  return (
    <section className="card">
      <h2 className="section-title">Smart Utilities</h2>
      <div className="row">
        <div className="col card">
          <h3>Weather Lookup</h3>
          <label>Location</label>
          <input className="input" placeholder="e.g., Jaipur" value={loc} onChange={e=>setLoc(e.target.value)} />
          <div style={{marginTop:12}}>
            <button className="button" type="button" onClick={getWeather} disabled={wLoading}>{wLoading ? 'Loading...' : 'Get Weather'}</button>
          </div>
          {wError && <div className="alert error" role="alert">{wError}</div>}
          {weather && (
            <div style={{marginTop:8}}>
              {weather.forecast && <p><strong>Forecast:</strong> {weather.forecast}</p>}
              {weather.humidity && <p><strong>Humidity:</strong> {weather.humidity}%</p>}
              {Array.isArray(weather.alerts) && weather.alerts.length > 0 && <p><strong>Alerts:</strong> {weather.alerts.join(', ')}</p>}
            </div>
          )}
        </div>
        <div className="col card">
          <h3>Soil Insights</h3>
          <label>Crop</label>
          <input className="input" placeholder="e.g., Maize" value={soilCrop} onChange={e=>setSoilCrop(e.target.value)} />
          <label>Soil Type</label>
          <input className="input" placeholder="e.g., Loamy" value={soilType} onChange={e=>setSoilType(e.target.value)} />
          <div style={{marginTop:12}}>
            <button className="button" type="button" onClick={getSoil} disabled={sLoading}>{sLoading ? 'Loading...' : 'Get Insights'}</button>
          </div>
          {sError && <div className="alert error" role="alert">{sError}</div>}
          {soil && (
            <div style={{marginTop:8}}>
              {soil.recommendations && <p><strong>Recommendations:</strong> {soil.recommendations}</p>}
              {soil.fertilizer && <p><strong>Fertilizer:</strong> {soil.fertilizer}</p>}
            </div>
          )}
        </div>
        <div className="col card">
          <h3>Power Outage Prediction</h3>
          <label>Region</label>
          <input className="input" placeholder="e.g., Rajasthan" value={region} onChange={e=>setRegion(e.target.value)} />
          <div style={{marginTop:12}}>
            <button className="button" type="button" onClick={getOutage} disabled={oLoading}>{oLoading ? 'Loading...' : 'Predict'}</button>
          </div>
          {oError && <div className="alert error" role="alert">{oError}</div>}
          {outage && (
            <div style={{marginTop:8}}>
              {outage.risk && <p><strong>Risk:</strong> {outage.risk}</p>}
              {outage.notes && <p><strong>Notes:</strong> {outage.notes}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

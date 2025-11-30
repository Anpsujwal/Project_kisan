export default function VoiceInput() {
  return (
    <div className="card">
      <h3>Voice Input (Placeholder)</h3>
      <p>No STT/TTS or mic access in this phase.</p>
      <div className="row">
        <button className="button" type="button">Start</button>
        <button className="button" type="button" style={{background:'#4a5568'}}>Stop</button>
      </div>
    </div>
  )
}

export default function ChatUI() {
  return (
    <div className="card">
      <h3>Chat UI (Placeholder)</h3>
      <div style={{height: 200, overflow: 'auto', border: '1px dashed #cbd5e0', borderRadius: 6, padding: 8, marginBottom: 12}}>
        <p>[Messages will appear here]</p>
      </div>
      <div className="row">
        <div className="col">
          <input className="input" placeholder="Type your message..." />
        </div>
        <button className="button" type="button">Send</button>
      </div>
    </div>
  )
}

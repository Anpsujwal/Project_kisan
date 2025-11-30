export default function ImageUpload() {
  return (
    <div className="card">
      <h3>Image Upload (Placeholder)</h3>
      <input type="file" accept="image/*" />
      <div style={{marginTop: 8, border: '1px dashed #cbd5e0', borderRadius: 6, padding: 8}}>
        <p>[Preview area]</p>
      </div>
    </div>
  )
}

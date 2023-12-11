import '../styles/RecordPreview.css'

export default function RecordPreview({previewItem, children}) {
  
  return (
    <div className='record-preview'>
      <h2>{previewItem.header}</h2>
      <h3>{previewItem.subheader}</h3>
      <p>{previewItem.from} - {previewItem.to === undefined ? 'Present' : previewItem.to}</p>
      <p></p>
      {children}
    </div>
  )
}
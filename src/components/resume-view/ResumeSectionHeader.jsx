import '../styles/ResumeSectionHeader.css'

export default function ResumeSectionHeader({header}) {
  return (
    <>
      <h2 className='resume-section-header'>{header}</h2>
      <div className='resume-break'/>
    </>
  )
}
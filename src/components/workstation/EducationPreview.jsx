import '../styles/EducationPreview.css'

export default function EducationPreview({education, children}) {
  return (
    <div className='education-preview'>
      <h2>{education.name}</h2>
      <h3>{education.location}</h3>
      <p>{education.from} - {education.isAttending ? 'Present' : education.to}</p>
      <p></p>
      {children}
    </div>
  )
}
import '../styles/EducationPreview.css'

export default function EducationPreview({education, children}) {
  return (
    <div className='education-preview'>
      <h2>{education.schoolName}</h2>
      <h3>{education.schoolLocation}</h3>
      <p>{education.schoolFromDate} - {education.isStillAttending ? 'Present' : education.schoolEndDate}</p>
      <p></p>
      {children}
    </div>
  )
}
import '../styles/ResumeView.css'
import ResumeSectionHeader from './ResumeSectionHeader';

export default function ResumeView({resumeObject}) {
  const { name, 
    email, 
    phone, 
    education, 
    work, 
    skills} = resumeObject;

  return (
    <section className='preview'>
      <div className='header-bio'>
        <h2>{name}</h2>
        {email.length > 0 &&
        (
          <div className='contact'>
            <img alt='e:' src='../.'/>
            <h3>{email}</h3>
          </div>
        )}

        {
          phone.length > 0 &&
          (
            <div className='contact'>
              <img alt='p:' src='../.'/>
              <h3>{phone}</h3>
            </div>
          )
        }
      </div>


      {education.length > 0 &&
      (
        <>
          <ResumeSectionHeader header='Education'/>
          {education.map((ele) => <p>{ele.name}</p>)}
        </>
      )
      }
      {work.length > 0 &&
      (
        <>
        <ResumeSectionHeader header='Work Experience'/>
        {work.map((ele) => <p>{ele.company}</p>)}
        </>
        )
      }
      {skills !== null &&
        <>
          <ResumeSectionHeader header='Skills'/>
          <p>{skills}</p>
        </>
      }
    </section>
  )
}
import { useState } from "react"

export default function ResumePreview({ resumeObject }) {
  return (
    <section className='resume-preview'>
      <p>Resume preview</p>
      <h1>{resumeObject.name}</h1>
      <h5>{resumeObject.email}</h5>
      <p>{resumeObject.phone}</p>
    </section>
  )
}
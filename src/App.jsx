import { useState } from 'react'
import './App.css'
import ResumeWorkstation from './components/resume-workstation/ResumeWorkstation'
import ResumePreview from './components/resume-preview/ResumePreview'
import { personExample } from './assets/data-objects/person-example';

function App() {
  // on change to resume workstation inputs, apply change to various fields
  // on preview

  const [personObject, setPersonObject] = useState(personExample);

  function handleObjectChange(field, value) {
    const newObject = {...personObject};
    newObject[field] = value;
    setPersonObject(newObject);
  }

  return (
    <main className='main-app'>
        <ResumeWorkstation handleObjectChange={handleObjectChange} personObject={personObject}/>

        <ResumePreview resumeObject={personObject}/>

        <button onClick={() => setPersonObject(personExample)}>Load example</button>
    </main>
  )
}

export default App

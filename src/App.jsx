import { useState } from 'react'
import './App.css'
import { personExample } from './assets/data-objects/person-example';
import InputItem from './components/InputItem';
import InputTab from './components/InputTab';

function App() {
  // on change to resume workstation inputs, apply change to various fields
  // on preview

  const [resumeObject, setResumeObject] = useState(personExample);
  const [canEnterEducation, setCanEnterEducation] = useState(false);

  function handleFieldChange(field, value) {
    const newObject = {...resumeObject};

    newObject[field] = value;

    setResumeObject(newObject);
  }

  const educationItems = resumeObject.education.map((e) => <p>{e.name}</p>)

  return (
    <>
      <main className='workstation'>
        <InputTab header='Biographical Information'>
          <InputItem labelName='Full Name' nameOnForm='name' placeholder='John Doe' isRequired={true} onChange={(e) => handleFieldChange('name', e.target.value)} />
          <InputItem labelName='Email' type='email' nameOnForm='email' placeholder='example@example.com' isRequired={true} onChange={(e) => handleFieldChange('email', e.target.value)}/>
          <InputItem labelName='Phone Number' type='tel' nameOnForm='phone' placeholder='000-000-0000' isRequired={true} onChange={(e) => handleFieldChange('phone', e.target.value)}/>
        </InputTab>

        <InputTab header='Education'>
          {canEnterEducation &&
          <div>
            <InputItem labelName='School Name' nameOnForm='schoolName' placeholder='Test University' isRequired={true} onChange={(e) => handleFieldChange(`education${educationItems.length}.name`, e.target.value)}/>
          </div> ||
          <button onClick={() => {setCanEnterEducation(true)}}>+</button>
          }
          {educationItems.length >= 0 &&
           educationItems}
        </InputTab>

        <InputTab header='Work History'>

        </InputTab>

        <InputTab header='Skills'>

        </InputTab>
      </main>

      <section className='preview'>
          <h3>Name: {resumeObject.name}</h3>
          <h3>Email: {resumeObject.email}</h3>
          <h3>Phone: {resumeObject.phone}</h3>

          {educationItems.length >= 0 &&
           educationItems}
      </section>
    </>
  )
}

export default App

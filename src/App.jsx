import { useState } from 'react'
import './App.css'
import { personExample } from './assets/data-objects/person-example';
import { personBlank } from './assets/data-objects/person-blank';
import InputItem from './components/InputItem';
import InputTab from './components/InputTab';

function App() {
  // on change to resume workstation inputs, apply change to various fields
  // on preview

  const [resumeObject, setResumeObject] = useState(personBlank);
  const [canEnterEducation, setCanEnterEducation] = useState(false);
  const [isCurrentlyAttending, setIsCurrentlyAttending] = useState(false);
  const [newEducation, setNewEducation] = useState({});

  function handleFieldChange(field, value) {
    const newObject = {...resumeObject};

    newObject[field] = value;

    setResumeObject(newObject);
  }

  function handleStillAttendingClick(isChecked) {
    setIsCurrentlyAttending(isChecked);
    handleNewEducationInput('schoolEndDate', null);
    handleNewEducationInput('isStillAttending', isChecked);
  }

  function handleNewEducationInput(field, value) {
    const updatedEducation = {...newEducation};
    updatedEducation[field] = value;
    setNewEducation(updatedEducation);
  }

  function handleSaveEducation(e) {
    e.preventDefault();

    const insertId = crypto.randomUUID();
    
    resumeObject.education.push({...newEducation, id: insertId});
    
    setCanEnterEducation(false);
    setNewEducation({});
  }

  function handleDeleteItemClick(owningArray, item) {
    const newArray = [...owningArray];
    for (let i = 0; i < newArray.length; i++) {
      if(newArray[i].id === item.id) {
        newArray.splice(i, 1);
        return newArray;
      }
    }
    return newArray;
  }
  let educationItems = [];

  // get count of keys. If object has values, 
  if (Object.hasOwn(resumeObject, 'education')) {
    educationItems = resumeObject.education.map((e) =>{
      console.log(e);
      return (
      <div className='education-editable-item'>
        <p key={e.id}>{e.schoolName}</p>
        <div className='buttons-div'>
          <button>Edit</button>
          <button onClick={() => {
            const updatedEducation = handleDeleteItemClick(resumeObject.education, e);
            setResumeObject('education', updatedEducation)
          }}>Delete</button>
        </div>
      </div>
      );
    });
  }

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
          <>
            <InputItem labelName='School Name' nameOnForm='schoolName' placeholder='Test University' isRequired={true} onChange={((e) => handleNewEducationInput('schoolName', e.target.value))}/>
            <InputItem labelName='Location' nameOnForm='schoolLocation' placeholder='1223 South St., Your State' isRequired={true} onChange={((e) => handleNewEducationInput('schoolLocation', e.target.value))}/>
            <InputItem labelName='Curriculum' nameonForm='schoolCurriculum' placeholder='Degree' isRequired={true} onChange={((e) => handleNewEducationInput('schoolCurriculum', e.target.value))}/>
            <InputItem labelName='Start Date' nameOnForm='schoolFromDate' type='date' isRequired={true} onChange={((e) => handleNewEducationInput('schoolFromDate', e.target.value))}/>
            <InputItem labelName='End Date' nameOnForm='schoolEndDate' type='date' isRequired={!isCurrentlyAttending} isDisabled={isCurrentlyAttending} onChange={((e) => handleNewEducationInput('schoolToDate', e.target.value))}/>
            <InputItem labelName='Still attending?' type='checkbox' nameOnForm='sStillAttending' onChange={(e) => handleStillAttendingClick(e.target.checked)}/>
            <div className='buttons-div'>
              <button onClick={() => setCanEnterEducation(false)}>X</button>
              <button onClick={(e) => handleSaveEducation(e)}>Save</button>
            </div>

          </>
          ||
          <button onClick={() => {setCanEnterEducation(true)}}>+</button>
          }
          {educationItems.length >= 0 &&
           educationItems}
        </InputTab>

        <InputTab header='Work History'>

        </InputTab>

        <InputTab header='Skills'>

        </InputTab>

        <button onClick={() => setResumeObject(personExample)}>Load example</button>
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

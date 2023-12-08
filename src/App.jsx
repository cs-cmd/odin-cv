import { useState } from 'react'
import './App.css'
import { personExample } from './assets/data-objects/person-example';
import { personBlank } from './assets/data-objects/person-blank';
import InputItem from './components/InputItem';
import InputTab from './components/InputTab';
import EducationPreview from './components/workstation/EducationPreview';

function App() {
  // on change to resume workstation inputs, apply change to various fields
  // on preview

  // resume object state
  const [resumeObject, setResumeObject] = useState(personBlank);

  // Education entry-related state
  const [canEnterEducation, setCanEnterEducation] = useState(false);
  const [newEducation, setNewEducation] = useState({});
  const [isCurrentlyAttending, setIsCurrentlyAttending] = useState(false);

  // work-related state
  const [canEnterWorkInfo, setCanEnterWorkInfo] = useState(false);
  const [newWork, setNewWork] = useState({});
  const [isCurrentEmployer, setIsCurrentEmployer] = useState(false);


  // handle any field's object change
  function handleFieldChange(field, value) {
    const newObject = {...resumeObject};

    newObject[field] = value;

    setResumeObject(newObject);
  }

  // handle if the still-attending checkbox is clicked
  function handleStillAttendingClick(isChecked) {
    setIsCurrentlyAttending(isChecked);
    handleNewEducationInput('schoolEndDate', null);
    handleNewEducationInput('isStillAttending', isChecked);
  }

  // Handle new education info entry
  function handleNewEducationInput(field, value) {
    const updatedEducation = {...newEducation};
    updatedEducation[field] = value;
    setNewEducation(updatedEducation);
  }

  // on 'save' record clicked, generate new random UUID and insert
  function handleSaveEducation() {
    const newEducationArray = [...resumeObject.education];
    newEducationArray.push({...newEducation, id: crypto.randomUUID()});

    handleFieldChange('education', newEducationArray);
    
    setCanEnterEducation(false);
    setIsCurrentlyAttending(false);
    setNewEducation({});
  }

  function handleCurrentEmployerToggle(isChecked) {
    setIsCurrentEmployer(isChecked);
    handleNewWorkInput('to', null);
    handleNewWorkInput('isAttending, isChecked');
  }

  function handleNewWorkInput(field, value) {
    const updatedWork = {...newWork};
    updatedWork[field] = value;
    setNewWork(updatedWork);
  }

  function handleSaveWork() {
    const newWorkArray = [...resumeObject.work];
    newWorkArray.push({...newWork, id: crypto.randomUUID()});

    console.log(newWorkArray);
    handleFieldChange('work', newWorkArray);

    setCanEnterWorkInfo(false);
    setIsCurrentEmployer(false);
    setNewWork({});
  }

  // handle if requested item has 'deleted' button (and is pressed)
  function handleDeleteItemClick(owningArray, item, field) {
    const newArray = [...owningArray];
    for (let i = 0; i < newArray.length; i++) {
      if(newArray[i].id === item.id) {
        newArray.splice(i, 1);
        break;
      }
    }

    handleFieldChange(field, newArray);
  }

  // education page items for preview, reverse-chronological order
  const educationItems = resumeObject.education.map((ele) =>{
    return (
      <EducationPreview key={ele.id+'ws-prev'} education={ele}>
        <button type='button' onClick={() => handleDeleteItemClick(resumeObject.education, ele, 'education')}>Delete</button>
      </EducationPreview>
    );
  }).reverse();

  const workItems = resumeObject.work.map((ele) => {
    return (
      <p>{ele.company}</p>
    )
  })

  return (
    <>
      <main className='workstation'>
        <InputTab header='Biographical Information'>
          <InputItem labelName='Full Name' nameOnForm='name' placeholder='John Doe' isRequired={true} onChange={(e) => handleFieldChange('name', e.target.value)} />
          <InputItem labelName='Email' type='email' nameOnForm='email' placeholder='example@example.com' isRequired={true} onChange={(e) => handleFieldChange('email', e.target.value)}/>
          <InputItem labelName='Phone Number' type='tel' nameOnForm='phone' placeholder='000-000-0000' isRequired={true} onChange={(e) => handleFieldChange('phone', e.target.value)}/>
        </InputTab>

        <InputTab header='Education'
          formChildren={
            canEnterEducation && 
            <>
              <InputItem labelName='School Name' nameOnForm='schoolName' placeholder='Test University' isRequired={true} onChange={((e) => handleNewEducationInput('name', e.target.value))}/>
              <InputItem labelName='Location' nameOnForm='schoolLocation' placeholder='1223 South St., Your State' isRequired={true} onChange={((e) => handleNewEducationInput('location', e.target.value))}/>
              <InputItem labelName='Curriculum' nameonForm='schoolCurriculum' placeholder='Degree' isRequired={true} onChange={((e) => handleNewEducationInput('curriculum', e.target.value))}/>
              <InputItem labelName='Start Date' nameOnForm='schoolFromDate' type='date' isRequired={true} onChange={((e) => handleNewEducationInput('from', e.target.value))}/>
              <InputItem labelName='End Date' nameOnForm='schoolEndDate' type='date' isRequired={!isCurrentlyAttending} isDisabled={isCurrentlyAttending} onChange={((e) => handleNewEducationInput('to', e.target.value))}/>
              <InputItem labelName='Still attending?' type='checkbox' nameOnForm='isStillAttending' onChange={(e) => handleStillAttendingClick(e.target.checked)}/>
              <div className='buttons-div'>
                <button type='button' onClick={() => setCanEnterEducation(false)}>X</button>
                <button type='button' onClick={handleSaveEducation}>Save</button>
              </div>
  
            </>
            ||
            <button type='button' onClick={() => {setCanEnterEducation(true)}}>+</button>  
          } 
          otherItems={
            educationItems.length > 0 &&
            educationItems
          }/>

        <InputTab header='Work History'
          formChildren={
            canEnterWorkInfo &&
            <>
              <InputItem labelName='Company Name' nameOnForm='companyName' placeholder='Example, Inc.' isRequired={true} onChange={(e) => handleNewWorkInput('company', e.target.value)}/>
              <InputItem labelName='Position' nameOnForm='companyPosition' placeholder='Worker' isRequired={true} onChange={(e) => handleNewWorkInput('position', e.target.value)}/>
              <InputItem labelName='Start Date' nameOnForm='companyStartDate' type='date' isRequired={true} onChange={(e) => handleNewWorkInput('from', e.target.value)}/>
              <InputItem labelName='End Date' nameOnForm='schoolEndDate' type='date' isRequired={!isCurrentEmployer} isDisabled={isCurrentEmployer} onChange={(e) => handleNewWorkInput('to', e.target.value)}/>
              <InputItem labelName='Current Employer' type='checkbox' nameOnForm='isCurrentEmployer' onChange={(e) => handleCurrentEmployerToggle(e.target.checked)}/>
              <textarea className='long-text' name='jobDescription' onChange={(e) => handleNewWorkInput('description', e.target.value)}></textarea>
              <div className='buttons-div'>
                <button type='button' onClick={() => setCanEnterWorkInfo(false)}>X</button>
                <button type='button' onClick={handleSaveWork}>Save</button>
              </div>

            </>
            ||
            <button type='button' onClick={() => {setCanEnterWorkInfo(!canEnterWorkInfo)}}>+</button>
          }
          otherItems={
            workItems.length > 0 &&
            workItems
          }/>

        <InputTab header='Skills'>

        </InputTab>

        <button onClick={() => setResumeObject(personExample)}>Load example</button>
      </main>

      <section className='preview'>
          <h3>Name: {resumeObject.name}</h3>
          <h3>Email: {resumeObject.email}</h3>
          <h3>Phone: {resumeObject.phone}</h3>

          {educationItems.length > 0 &&
           educationItems}

          {workItems.length > 0 &&
          workItems}
      </section>
    </>
  )
}

export default App

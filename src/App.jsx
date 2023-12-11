import { useState } from 'react'
import './App.css'
import { personExample } from './assets/data-objects/person-example';
import { personBlank } from './assets/data-objects/person-blank';
import InputItem from './components/InputItem';
import InputTab from './components/InputTab';
import EducationPreview from './components/workstation/EducationPreview';
import { getDefinitionOrNull } from './custom-hooks';
import { formatBioInputValues, formatEducationInputValues, formatWorkInputValues } from './assets/data-objects/input-item-values';

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
    handleNewWorkInput('isAttending', isChecked);
  }

  function handleNewWorkInput(field, value) {
    const updatedWork = {...newWork};
    updatedWork[field] = value;
    setNewWork(updatedWork);
  }

  function handleSaveWork() {
    const newWorkArray = [...resumeObject.work];
    newWorkArray.push({...newWork, id: crypto.randomUUID()});

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


  //inputFormatters.
  const bioInputValues = formatBioInputValues();
  const educationInputValues = formatEducationInputValues((e) => handleStillAttendingClick(e.target.checked), isCurrentlyAttending);
  const workInputValues = formatWorkInputValues((e) => handleCurrentEmployerToggle(e.target.checked), isCurrentEmployer);  

  // education page items for preview, reverse-chronological order
  const educationPreviewItems = resumeObject.education.map((ele) =>{
    return (
      <EducationPreview key={ele.id+'ws-prev'} education={ele}>
        <button type='button' onClick={() => handleDeleteItemClick(resumeObject.education, ele, 'education')}>Delete</button>
      </EducationPreview>
    );
  }).reverse();

  const workPreviewItems = resumeObject.work.map((ele) => {
    return (
      <p>{ele.company}</p>
    )
  })

  return (
    <>
      <main className='workstation'>
        <InputTab header='Biographical Information'
          formChildren={
            bioInputValues.map((item) => <InputItem key={item.nameOnForm}
                labelName={item.labelName}
                nameOnForm={item.nameOnForm}
                placeholder={item.placeholder}
                type={item.type !== undefined ? item.type : ''}
                onChange={(e) => handleFieldChange(item.fieldName, e.target.value)}
              />)
            }>
    
        </InputTab>


        <InputTab header='Education'
          formChildren={
            canEnterEducation ?
              <>  
                {educationInputValues.map((item) => 
                  <InputItem labelName={item.labelName}
                    key={item.nameOnForm}
                    name={item.nameOnForm}
                    placeholder={getDefinitionOrNull(item.placeholder)}
                    type={getDefinitionOrNull(item.type)}
                    onChange={getDefinitionOrNull(item.onChange) || ((e) => handleNewEducationInput(item.fieldName, e.target.value))}
                    isRequired={getDefinitionOrNull(item.isRequired)}
                    isDisabled={getDefinitionOrNull(item.isDisabled)}
                  />)}

                <div className='buttons-div'>
                  <button type='button' onClick={() => setCanEnterEducation(false)}>X</button>
                  <button type='button' onClick={handleSaveEducation}>Save</button>
                </div>
              </>
            :
            <button type='button' onClick={() => {setCanEnterEducation(true)}}>+</button>  
          } 
          otherItems={educationPreviewItems}>

        </InputTab>


        <InputTab header='Work History'
          formChildren={
            canEnterWorkInfo &&
            <>
              {workInputValues.map((item) => 
              <InputItem labelName={item.labelName}
                key={item.nameOnForm}
                nameOnForm={item.nameOnForm}
                placeholder={item.placeholder}
                type={item.type}
                isRequired={getDefinitionOrNull(item.isRequired)}
                isDisabled={getDefinitionOrNull(item.isDisabled)}
                onChange={getDefinitionOrNull(item.onChange) || ((e) => handleNewWorkInput(item.fieldName, e.target.value))}
              />)}
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
            workPreviewItems.length > 0 &&
            workPreviewItems
          }/>

        <InputTab header='Skills'
          formChildren={
            <textarea className='long-text' onChange={(e) => handleFieldChange('skills', e.target.value)}>{resumeObject.skills}</textarea>
          }>
        </InputTab>

        <button onClick={() => setResumeObject(personExample)}>Load example</button>
      </main>






      <section className='preview'>
          <h3>Name: {resumeObject.name}</h3>
          <h3>Email: {resumeObject.email}</h3>
          <h3>Phone: {resumeObject.phone}</h3>

          {educationPreviewItems.length > 0 &&
           educationPreviewItems}

          {workPreviewItems.length > 0 &&
          workPreviewItems}
      </section>
    </>
  )
}

export default App

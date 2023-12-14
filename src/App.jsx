import { useState } from 'react'
import './App.css'
import { personExample } from './assets/data-objects/person-example';
import { personBlank } from './assets/data-objects/person-blank';
import InputItem from './components/InputItem';
import InputTab from './components/InputTab';
import { getDefinitionOrNull } from './misc/custom-hooks';
import { formatBioInputValues, formatEducationInputValues, formatWorkInputValues } from './assets/data-objects/input-item-values';
import RecordPreview from './components/workstation/RecordPreview';
import ResumeView from './components/resume-view/ResumeView';

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

  function isEducationInvalid(education) {
    return (education.name === undefined ||
          education.location === undefined ||
          education.curriculum === undefined ||
          education.from === undefined ||
          (education.to === undefined && 
            education.isCurrentlyAttending === undefined))
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


  // handle click for toggling current employer
  function handleCurrentEmployerToggle(isChecked) {
    setIsCurrentEmployer(isChecked);
    handleNewWorkInput('to', null);
    handleNewWorkInput('isAttending', isChecked);
  }

  // handle click for handling new work input
  function handleNewWorkInput(field, value) {
    const updatedWork = {...newWork};
    updatedWork[field] = value;
    setNewWork(updatedWork);
  }

  // loads new array with new item (or replaces if editing)
  function determineIfEdit(passingArray, currentState) {
    const newArray = [...passingArray];

    for(let i = 0; i < passingArray.length; i++) {
      if(passingArray[i].id === currentState.id) {
        newArray[i] = currentState;
        return newArray;
      }
    }

    newArray.push({...currentState, id: crypto.randomUUID()});

    return newArray;
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

  function handleEducationFormSubmit(e) {
    e.preventDefault();

    const newEducationArray = determineIfEdit(resumeObject.education, newEducation);
    handleFieldChange('education', newEducationArray);
    
    setCanEnterEducation(false);
    setIsCurrentlyAttending(false);
    setNewEducation({});
  }

  function handleWorkFormSubmit(e) {
    e.preventDefault();

    const newWorkArray = determineIfEdit(resumeObject.work, newWork);
    handleFieldChange('work', newWorkArray);

    setCanEnterWorkInfo(false);
    setIsCurrentEmployer(false);
    setNewWork({});
  }


  //inputFormatters.
  const bioInputValues = formatBioInputValues();
  const educationInputValues = formatEducationInputValues((e) => {
    handleStillAttendingClick(e.target.checked);
    handleNewEducationInput('to', undefined);
  }, isCurrentlyAttending);

  const workInputValues = formatWorkInputValues((e) => {
    handleCurrentEmployerToggle(e.target.checked);
    handleNewWorkInput('to', undefined);
  }, isCurrentEmployer);  

  // education page items for preview, reverse-chronological order
  const educationPreviewItems = resumeObject.education.map((ele) =>{
    return (
      <RecordPreview key={ele.id+'-ws-prev'} previewItem={
        {        
          header: ele.name,
          from: ele.from,
          to: ele.to, 
          desc: ele.curriculum,
          subheader: ele.location,
        }
      }>
        <button type='button' 
          onClick={() => handleDeleteItemClick(resumeObject.education, ele, 'education')}>Delete</button>
        <button type='button'
          onClick={() => {
            setNewEducation(ele);
            setCanEnterEducation(true);
          }}>Edit</button>
      </RecordPreview>
    );
  }).reverse();

  const workPreviewItems = resumeObject.work.map((ele) => {
    return (
      <RecordPreview key={ele.id+'-ws-prev'} previewItem={
        {
          header: ele.company,
          subheader: ele.position,
          from: ele.from,
          to: ele.to,
          desc: ele.description,
        }
      }>
        <button type='button' 
          onClick={() => handleDeleteItemClick(resumeObject.work, ele, 'work')}>Delete</button>
        <button type='button'
          onClick={() => {
            setNewWork(ele)
            setCanEnterWorkInfo(true);
          }}>Edit
        </button>
      </RecordPreview>
    );
  })

  return (
    <>
      <main className='workstation'>
        <section className='ws-element forms'>
          <InputTab header='Biographical Information'
            formChildren={
              bioInputValues.map((item) => <InputItem key={item.nameOnForm}
                  labelName={item.labelName}
                  nameOnForm={item.nameOnForm}
                  placeholder={item.placeholder}
                  type={getDefinitionOrNull(item.type)}
                  onChange={(e) => handleFieldChange(item.fieldName, e.target.value)}
                />)
              }>
      
          </InputTab>


          <InputTab header='Education'
            onSubmit={handleEducationFormSubmit}
            formChildren={
              canEnterEducation ?
                <>  
                  {educationInputValues.map((item) => 
                    <InputItem labelName={item.labelName}
                      key={item.nameOnForm}
                      name={item.nameOnForm}
                      placeholder={getDefinitionOrNull(item.placeholder)}
                      type={getDefinitionOrNull(item.type)}
                      value={getDefinitionOrNull(newEducation[item.fieldName])}
                      onChange={getDefinitionOrNull(item.onChange) || ((e) => handleNewEducationInput(item.fieldName, e.target.value))}
                      isRequired={getDefinitionOrNull(item.isRequired)}
                      isDisabled={getDefinitionOrNull(item.isDisabled)}
                    />)}

                  <div className='buttons-div'>
                    <button type='button' onClick={() => {
                      setCanEnterEducation(false);

                      // if edited, and cancelled, reset
                      if(newEducation !== null) {
                        setNewEducation({});
                      }
                    }}>X</button>
                    <button type='submit'>Save</button>
                  </div>
                </>
              :
              <button type='button' onClick={() => {setCanEnterEducation(true)}}>+</button>  
            } 
            otherItems={educationPreviewItems}>

          </InputTab>


          <InputTab header='Work History'
          onSubmit={handleWorkFormSubmit}
            formChildren={
              canEnterWorkInfo &&
              <>
                {workInputValues.map((item) => 
                <InputItem labelName={item.labelName}
                  key={item.nameOnForm}
                  nameOnForm={item.nameOnForm}
                  placeholder={item.placeholder}
                  type={item.type}
                  value={newWork[item.fieldName]}
                  isRequired={getDefinitionOrNull(item.isRequired)}
                  isDisabled={getDefinitionOrNull(item.isDisabled)}
                  onChange={getDefinitionOrNull(item.onChange) || ((e) => handleNewWorkInput(item.fieldName, e.target.value))}
                />)}
                <textarea className='long-text' name='jobDescription' onChange={(e) => handleNewWorkInput('description', e.target.value)}></textarea>
                <div className='buttons-div'>
                  <button type='button' onClick={() => {
                    setCanEnterWorkInfo(false);

                    // if editing, reset
                    if(newWork !== null) {
                      setNewWork({});
                    }
                  }}>X</button>
                  <button type='submit'>Save</button>
                </div>
              </>
              ||
              <button type='button' onClick={() => {setCanEnterWorkInfo(!canEnterWorkInfo)}}>+</button>
            }
            otherItems={workPreviewItems}/>

          <InputTab header='Skills'
            formChildren={
              <textarea className='long-text' 
                onChange={(e) => handleFieldChange('skills', e.target.value)}
                value={resumeObject.skills}
              />
            }>
          </InputTab>

          <button onClick={() => setResumeObject(personExample)}>Load example</button>
        </section>


        <ResumeView className='ws-element' resumeObject={resumeObject}/>
      </main>
    </>
  )
}

export default App

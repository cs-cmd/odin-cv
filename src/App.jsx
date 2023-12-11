import { useState } from 'react'
import './App.css'
import { personExample } from './assets/data-objects/person-example';
import { personBlank } from './assets/data-objects/person-blank';
import InputItem from './components/InputItem';
import InputTab from './components/InputTab';
import { getDefinitionOrNull } from './custom-hooks';
import { formatBioInputValues, formatEducationInputValues, formatWorkInputValues } from './assets/data-objects/input-item-values';
import RecordPreview from './components/workstation/RecordPreview';
import ResumeView from './components/resume-view/ResumeView';
import links from './assets/data-objects/links';

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
      <RecordPreview key={ele.id+'-ws-prev'} previewItem={
        {        
          header: ele.name,
          from: ele.from,
          to: ele.to, 
          desc: ele.curriculum,
          subheader: ele.location
        }
      }>
        <button type='button' 
          onClick={() => handleDeleteItemClick(resumeObject.education, ele, 'education')}>Delete</button>
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
          desc: ele.description
        }
      }>
        <button type='button' 
          onClick={() => handleDeleteItemClick(resumeObject.work, ele, 'work')}>Delete</button>
      </RecordPreview>
    );
  })

  return (
    <>
      <header className='header'>
        <h1 className='header-title'>CV Creator</h1>
      </header>

      <main className='workstation'>
        <section className='ws-element forms'>
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

      <footer className='footer'>
        <p className='footer-text'>View source code <a href={links.src}>here</a>.</p>
        <p className='footer-text'>cs-cmd | &#169; {new Date().getFullYear()}, all rights reserved.</p>
      </footer>
    </>
  )
}

export default App

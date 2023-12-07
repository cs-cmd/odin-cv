import NavBar from './nav-bar/NavBar';
import { useState } from 'react';
import './ResumeWorkstation.css'
import GeneralInfoTab from './tabs/GeneralInfoTab';
import WorkExperienceTab from './tabs/WorkExperienceTab';
import EducationTab from './tabs/EducationTab';

export default function ResumeWorkstation({handleObjectChange}) {

    const [currentTabId, setCurrentTabId] = useState(0);

    function changeCurrentTabId(newTabId) {
        setCurrentTabId(newTabId);
    }

    return (
        <section className='resume-workstation'>
            <NavBar changeWorkstationTab={changeCurrentTabId}/>

            {currentTabId === 0 && <GeneralInfoTab handleObjectChange={handleObjectChange}/> ||
            currentTabId === 1 && <EducationTab/> ||
            currentTabId === 2 && <WorkExperienceTab/>}
        </section>
    );
}
import InputItem from "./InputItem"
import './styles/GeneralInfoTab.css';

export default function GeneralInfoTab({handleObjectChange}) {
    return (
        <div className='general-info-tab'>
            <InputItem onChange={(e) => handleObjectChange('name', e.target.value)} label='Full name' required={true} placeholder='John J. Doe'/>

            <InputItem onChange={(e) => handleObjectChange('email', e.target.value)} label='Email' type='email' placeholder='example@example.com'/>

            <InputItem label='Phone Number' type='tel' placeholder='000-000-0000' onChange={(e => handleObjectChange('phone', e.target.value))}/>
        </div>
    )
}
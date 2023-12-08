import './styles/InputItem.css';

export default function InputItem({children, labelName, type = 'text', isDisabled = false, nameOnForm, placeholder, onChange, isRequired = false}) {
  return (
    <div className='input-item'>
      <label>{labelName}</label>
      <input required={isRequired} type={type} name={nameOnForm} placeholder={placeholder} onChange={onChange} disabled={isDisabled}/>
      {(children !== undefined || children !== null) &&
       children}
    </div>
  )
}

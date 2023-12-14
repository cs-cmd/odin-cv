import './styles/InputItem.css';

export default function InputItem({children, labelName, type = 'text', isDisabled = false, nameOnForm, placeholder, onChange, isRequired = true, value}) {
  return (
    <div className='input-item'>
      <label>{labelName}</label>
      <input required={isRequired === null ? true : isRequired} type={type} name={nameOnForm} placeholder={placeholder} onChange={onChange} disabled={isDisabled} value={value}/>
      {children}
    </div>
  )
}

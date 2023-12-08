export default function InputItem({labelName, type = 'text', nameOnForm, placeholder, onChange, isRequired = false}) {
  return (
    <div className='input-item'>
      <label>{labelName}</label>
      <input required={isRequired} type={type} name={nameOnForm} placeholder={placeholder} onChange={onChange}/>
    </div>
  )
}

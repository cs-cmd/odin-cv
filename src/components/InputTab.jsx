import './styles/InputTab.css';

export default function InputTab({header, formChildren, otherItems}) {
  return ( 
    <div className='panel'>
      <h3>{header}</h3>
      <form className='input-tab-form'>
        {formChildren}
      </form>
      {otherItems}
    </div>
  )
}
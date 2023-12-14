import './styles/InputTab.css';

export default function InputTab({header, onSubmit, formChildren, otherItems}) {
  return ( 
    <div className='panel'>
      <h3>{header}</h3>
      <form className='input-tab-form' action='#' onSubmit={onSubmit} method='POST'>
        {formChildren}
      </form>
      {otherItems}
    </div>
  )
}
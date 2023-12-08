import './styles/InputTab.css';

export default function InputTab({header, children}) {
  return ( 
    <div className='panel'>
      <h3>{header}</h3>
      <form className='input-tab-form'>
        {children}
      </form>
    </div>
  )
}
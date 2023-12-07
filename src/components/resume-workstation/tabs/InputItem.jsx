import { useState } from "react";
import './styles/InputItem.css';

export default function InputItem({label, placeholder, type = 'text', required = false, onChange, value}) {
    return (
        <div className='input-item'>
            <label>{required ? '*' : ''}{label}</label>
            <input onChange={onChange} type={type} required={required} placeholder={placeholder} value={value}/>
        </div>
    )
}
import { useState } from 'react';
import './styles/NavItem.css';

export default function NavItem({itemId, tabName, isSelected, changeTabFunc, iconSrc}) {
    return (
        <li key={tabName} className={'menu-item'+(isSelected ? ' is-selected' : '')}>
            <button className='menu-button' onClick={() => changeTabFunc(itemId)}>
                <img className='button-image' src={iconSrc} alt={tabName}/>
                <h6 className='menu-button-text'>{tabName}</h6>
            </button>
        </li>
    )
}
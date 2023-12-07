import { useState } from 'react';
import NavItem from './NavItem';
import './styles/NavBar.css';
import { iconList } from '../../../assets/data-objects/menu-tabs';

export default function NavBar({changeWorkstationTab}) {
    const tabs = iconList;

    const [selectedMenuId, setSelectedIdMenu] = useState(tabs[0].id);

    const changeTab = (tabId) => {
        setSelectedIdMenu(tabId);
        changeWorkstationTab(tabId);
    }
    
    const tabItems = tabs.map(e => <NavItem iconSrc={e.src} key={e.id} itemId={e.id} changeTabFunc={changeTab} tabName={e.name} isSelected={e.id === selectedMenuId}/>);

    return (
        <ul className='menu-bar'>
            {tabItems}
        </ul>
    )
}
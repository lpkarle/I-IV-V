import React, { useState } from 'react';
import styles from './DropdownMenu.module.css';
import { ReactComponent as ArrowIcon } from '../../../images/svgs/Navigation/keyboard_arrow_down-24px.svg';

export default function DropdownMenu({ list, onChange }) {

    const [selectedElement, setSelectedElement] = useState(list[0]);
    const [open, setOpen] = useState(false);

    const handleOnItemSelect = (element) => {
        onChange(element);
        setSelectedElement(element);
        setOpen(!open);
    }

    const styleIcon = () => {
        return {
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            zIndex: open ? '1' : '0',
        }
    }

    return (
        <div className={styles.dropdownMenu} onClick={() => setOpen(!open)} >

            <Dropdown label={selectedElement} open={open}>
                {list.map((element, index) => (
                    <a className={styles.ddItem}
                        key={index} 
                        onClick={() => handleOnItemSelect(element)}>
                        {element}
                    </a>
                ))}
            </Dropdown>
                
            <ArrowIcon style={styleIcon()}/>
        </div>
    );
}

function Dropdown({ children, label , onClick, open}) {

    const styleDd = () => {
        return {
            display: open ? 'flex' : 'none'
        }
    }

    return(
        <div className={styles.dropdown}>
            <a href="#" >
                { label }
            </a>
            <div className={styles.elementWrapper} onClick={onClick} style={styleDd()}>
                {open && children}
            </div>
        </div>
    );
}
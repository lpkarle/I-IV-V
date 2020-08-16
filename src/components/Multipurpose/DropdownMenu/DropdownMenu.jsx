import React, { useState } from 'react';
import styles from './DropdownMenu.module.css';
import { ReactComponent as ArrowIcon } from '../../../images/svgs/Navigation/keyboard_arrow_down-24px.svg';

export default function DropdownMenu({ list, onChange }) {

    const [selectedElement, setSelectedElement] = useState(list[0]);
    const [open, setOpen] = useState(false);

    const handleOnItemSelect = (element) => {
        setSelectedElement(element);
        setOpen(!open);
        onChange(element);
    }

    const styleIcon = () => {
        return {
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
        }
    }

    return (
        <div className={styles.dropdownMenu} onClick={() => setOpen(!open)} >

            <Dropdown label={selectedElement} open={open}>
                {list.map((element, index) => (
                    element !== selectedElement ?
                        <a className={styles.ddItem}
                            key={index} 
                            onClick={() => handleOnItemSelect(element)}>
                            {element}
                        </a>
                    : null
                ))}
            </Dropdown>
                
            <ArrowIcon style={styleIcon()}/>
        </div>
    );
}

function Dropdown({ children, label , onClick, open}) {

    return(
        <div className={styles.dropdown}>
            <a href="#" onClick={onClick}>
                { label }
            </a>
            {open && children}
        </div>
    );
}
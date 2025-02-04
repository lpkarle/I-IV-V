import React from 'react';
import styles from './Dropdown.module.css';

export default function Dropdown({ list, onChange }) {

    const handleOnItemSelect = (element) => {
        onChange(element);
    }

    return (
        <div className={styles.dd}>
            <select onChange={(e) => handleOnItemSelect(e.target.value)}>
                {list.map((el, index) => 
                    <option key={index}>{el}</option>
                )}
            </select>
        </div>
    );
}

Dropdown.defaultProps = { 
    list: ['Wabadabadabdab', 2, 3], 
    onChange: (sel) => console.log(sel)
}
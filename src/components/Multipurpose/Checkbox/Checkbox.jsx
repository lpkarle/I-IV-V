import React from 'react';
import styles from './Checkbox.module.css';

export default function CheckBox({ label, checked, onChange }) {
    return (
        <label className={styles.checkbox}>
            <input 
                type="checkbox" 
                value={label}
                onChange={onChange}
                checked={checked}/>
                <p>{label}</p>
        </label>
    );
}

CheckBox.defaultProps = {
    label: 'Checkbox',
    checked: true,
    onChange: () => console.log("Checkbox")
}
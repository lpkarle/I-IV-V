import React from 'react'

import styles from './Dropdown.module.css';

/**
 * A basic dropdown menu.
 *      value: unique identifier for callback/handler
 *      data: dataset with structure {value: x, label:'y'}
 *      placeholder: in case not the first value should be the default / a selection is necessary
 *      onChange: callback function for handeling in parent
 * 
 * @param {object} props
 */
export default function Dropdown({ value, data=[], placeholder, onChange}) {

    const handleChange = (event) => {
        const { value } = event.target;

        // Sent the value back to the Parent-Function
        onChange(value);
    }

    return (
        <div className={styles.ddWrapper}>
            <select 
                className={styles.ddHeader} 
                value={value}
                onChange={handleChange}>

                {placeholder ? 
                    <option value="">{placeholder}</option>
                    : null
                }
                
                {data.map((item, key) => 
                    <option 
                        key={key} 
                        value={item.value}>
                        {item.label}
                    </option>
                )}
            </select>
        </div>
    )
}
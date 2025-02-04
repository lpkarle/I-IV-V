import React, { useState } from 'react';
import styles from './RadioButtonGroup.module.css';

export default function RadioButtonGroup({ buttonList, direction, onChange }) {

    const [selected, setSelected] = useState(buttonList.btns[0]);

    const handleChange = (e) => {
        const label = e.target.value;
        onChange(label);
        setSelected(label);
    }
    
    return (
        <div className={styles.rbGroup} style={{flexDirection: direction}}>
            {buttonList.btns.map((name, index) => 
                <RadioButton 
                    key={index} name={name} index={index}
                    checked={name === selected ? true : false}
                    onChange={handleChange}
                    groupName={buttonList.groupName} />
            )}
        </div>
    );
}

RadioButtonGroup.defaultProps = {
    buttonList: {groupName: 'group', btns: ['A', 'B']},
    direction: 'row',
    onChange: () => console.log("RbGroup")
}

function RadioButton({ name, checked, onChange, groupName }) {
    return (
        <label className={styles.rb}>
            <input 
                type="radio" 
                value={name} 
                name={groupName} 
                onChange={onChange}
                checked={checked}/>
            <p>{name}</p>
            <span></span>
        </label>
    );
}
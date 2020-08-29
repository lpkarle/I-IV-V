import React, { useState } from 'react';
import styles from './NumberPicker.module.css';
import { ArrowIcon } from '../../../images/svgs/';

export default function NumberPicker({ defaultNum, range, onClick }) {

    const [number, setNumber] = useState(defaultNum);

    return (
        <div className={styles.numberPicker}>
            <ArrowIcon onClick={() => {
                if (number < range.max) {
                    onClick(number + 1);
                    setNumber(prev => prev + 1)
                };
            }} />
            <div>{number}</div>
            <ArrowIcon onClick={() => {
                if (number > range.min) {
                    onClick(number - 1);
                    setNumber(prev => prev - 1)
                };
            }} />
        </div>
    );
}

NumberPicker.defaultProps = { 
    defaultNum: 2, 
    range: {min: 1, max: 10},
    onClick: () => {console.log("NumberPicker")} 
}
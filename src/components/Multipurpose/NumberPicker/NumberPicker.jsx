import React, { useState, useEffect } from 'react';
import styles from './NumberPicker.module.css';

import { ReactComponent as ArrowIcon } from '../../../images/svgs/Navigation/keyboard_arrow_down-24px.svg';

export default function NumberPicker({ 
    defaultNum = 2, 
    range = {min: 1, max: 10},
    onClick }) {

    const [number, setNumber] = useState(defaultNum);

    useEffect(() => {
        onClick(number);
        console.log(number);
    }, [number]);

    return (
        <div className={styles.numberPicker}>
            <ArrowIcon onClick={() => {
                if (number < range.max) setNumber(prev => prev + 1);
            }} />
            <div>{number}</div>
            <ArrowIcon onClick={() => {
                if (number > range.min) setNumber(prev => prev - 1);
            }} />
        </div>
    );
}


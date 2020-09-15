import React, { useState } from 'react';
import { CircleOfFifths, ChordsInKey } from '../';
import cx from 'classnames';
import styles from './MusicTheory.module.css';

export default function MusicTheory() {

    const [toggleView, setToggleView] = useState(false);

    return (
        <div className="content">

            <label className={styles.switch}>
                <input type="checkbox" onChange={() => setToggleView(!toggleView)}/>
                <span className={cx(styles.slider, styles.round)}></span>
            </label>
            
            {toggleView ? <ChordsInKey/> : <CircleOfFifths/> }
        </div>
    )
}

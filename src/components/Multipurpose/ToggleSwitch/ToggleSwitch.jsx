import React from 'react';
import cx from 'classnames';
import styles from './ToggleSwitch.module.css';


export default function ToggleSwitch({ round, color, onChange }) {
    return (
        <div className={styles.s}>
            <label className={styles.switch}>
                <input type="checkbox" onChange={onChange}/>
                <span className={cx(styles.slider, styles.round)}></span>
            </label>
        </div>
    );
}

ToggleSwitch.defaultProps = {
    round: true,
    color: 'rgb(108, 205, 90)',
    onChange: console.log('Toggle')
}


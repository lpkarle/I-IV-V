import React, { useState, useEffect } from 'react';
import { CircleOfFifths, ChordsInKey } from '../';
import cx from 'classnames';
import styles from './MusicTheory.module.css';

export default function MusicTheory({ changeSelNavIcon }) {

    useEffect(() => {
        changeSelNavIcon("Music Theory");
    }, []);

    const [selectedEl, setSelectedEl] = useState('chordsInKey');

    const styleButton = (sel) => {
        return {
            background: sel === selectedEl ? 'var(--accent-color)' : 'transparent',
            color: sel === selectedEl ? 'var(--bg-primary-color)' : 'var(--text-primary-color)'
        }
    }

    return (
        <div className="content">
            <div className={cx("card")}>
                <div className={styles.module}>
                    <div onClick={() => setSelectedEl('chordsInKey')} style={styleButton('chordsInKey')}>
                        Chords in Key
                    </div>
                    <div onClick={() => setSelectedEl('circleOfFifths')} style={styleButton('circleOfFifths')}>
                        Circle of Fifths
                    </div>
                </div>
            </div>

            {selectedEl === 'chordsInKey' ? <ChordsInKey/> : <CircleOfFifths/> }
        </div>
    );
}

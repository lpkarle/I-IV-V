import React, { useState, useEffect } from 'react';
import { CircleOfFifths, ChordsInKey } from '../';
import cx from 'classnames';
import styles from './MusicTheory.module.css';
import { LegendVoicing } from '../Multipurpose';

export default function MusicTheory({ changeSelNavIcon, lang }) {

    useEffect(() => {
        changeSelNavIcon('music_theory');
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
                        {lang.str.chords_in_key}
                    </div>
                    <div onClick={() => setSelectedEl('circleOfFifths')} style={styleButton('circleOfFifths')}>
                        {lang.str.circle_of_fifths}
                    </div>
                </div>
            </div>

            {selectedEl === 'chordsInKey' ? <ChordsInKey lang={lang}/> : <CircleOfFifths lang={lang}/> }
            <LegendVoicing lang={lang}/> 
        </div>
    );
}

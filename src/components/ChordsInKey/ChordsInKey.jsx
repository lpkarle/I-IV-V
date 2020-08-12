import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import styles from './ChordsInKey.module.css';
import Dropdown from '../Multipurpose/Dropdown/Dropdown';

import { getTableNotes, availableVoicings, getScaleByNote, getChordsInKey, getCommonProgressions } from '../../logic/';

export default function ChordsInKey() {
    
    const allKeys = getTableNotes();
    const dropdownItems = () => {
        let ddItems = [];
        for (let i = 0; i < availableVoicings.length; i++) {
            ddItems.push({
                value: i,
                label: availableVoicings[i]
            });
        };
        return ddItems;
    }


    
    /* Selectable UI Components */
    const [selectedKey, setSelectedKey] = useState('A');
    const [selectedVoicing, setSelectedVoicing] = useState('major');
    const [progressions, setProgressions] = useState(getCommonProgressions(selectedVoicing));

    /* Variable for Dropdown */
    const [dropdownItem, setDropdownItem] = useState(undefined);

    /* Resulting Scale and Chords */
    const [scale, setScale] = useState(getScaleByNote(selectedVoicing, selectedKey));
    const [chords, setChords] = useState(getChordsInKey(selectedVoicing));

    function changeSelectedKey(key) {
        setSelectedKey(key);
    } 



    function handleDropdown(index) {
        // This is pretty ugly
        setSelectedVoicing(dropdownItems()[index].label.toString().toLowerCase());
    }

    useEffect(() => {
        setScale(getScaleByNote(selectedVoicing, selectedKey));
        setChords(getChordsInKey(selectedVoicing));
        setProgressions(getCommonProgressions(selectedVoicing));
    }, [selectedKey, selectedVoicing])


    /* ---------------- Styles ---------------- */
    function styleSelectedKey(key) {
        return {
            border: selectedKey === key ?
                    'black solid 8px' : null
        }
    }
    function styleChordVoicing(chordVoicing) {
        if (chordVoicing.includes('°')) {
            return { border: 'var(--dim-color) solid 3px' };
        }
        if (chordVoicing === chordVoicing.toString().toUpperCase()) {
            return { border: 'var(--major-color) solid 3px' };
        }
        if (chordVoicing === chordVoicing.toString().toLowerCase()) {
            return { border: 'var(--minor-color) solid 3px' };
        }
    }


    return (
        <div className="content">
            <h1>Chords in a Key</h1>
            <div className={styles.chordsInKey}>
                <div className={styles.left}>
                    <KeyPicker>
                        {allKeys.map((keyName, index) => (        
                            <Key keyName={keyName}
                                key={index}
                                style={styleSelectedKey(keyName)}
                                onClick={changeSelectedKey} 
                            />
                        ))}
                    </KeyPicker>

                    <div className={styles.voicingPicker}>
                        <h2>Select Voicing:</h2>
                        <div className={styles.ddWrapper}>
                            <Dropdown data={dropdownItems()}
                                    value={dropdownItem}
                                    onChange={handleDropdown}/>
                        </div>
                    </div>

                    <ResultingChords >
                        {scale.map((note, index) => (
                            <ChordAndVoicing 
                                chordNote={note}
                                voicing={chords[index]}
                                key={index}
                                style={styleChordVoicing(chords[index][0])}
                            />
                        ))}
                    </ResultingChords>
                </div>

                <div className={styles.right}>
                    <CommonProgressions>
                        {progressions.map((chordNumber, index) => (
                            <Progression chordNumber={chordNumber}
                            key={index}/>
                        ))}
                    </CommonProgressions>
                </div>
            </div>
        </div>
    )
}


/* -------- Select the Key -------- */
function KeyPicker({ children }) {
    return (
        <>
            <h2>Pick a Key:</h2>
            <div className={styles.keys}>
                {children}
            </div>           
        </>
    );
}

function Key({ style, onClick, keyName }) {

    const handleClick = (event) => {
        onClick(event.target.innerHTML);
    }

    return(
        <div className={styles.key} 
             style={style}
             onClick={handleClick}>
            {keyName}
        </div>
    );
}


/* -------- Chords in the Key -------- */
function ResultingChords({children}) {
    return (
        <>
            <h2>Resulting Chords:</h2>
            <div className={cx(styles.resultingChords, "card")}>
                {children}
            </div>
        </>
    );
}

function ChordAndVoicing({chordNote, voicing, style}) {

    return (
        <div className={styles.chordAndVoicing}>
            <div className={styles.chordNote}>{chordNote}</div>
            <div className={styles.voicing}
                 style={style}>{voicing[0]}</div>
        </div>
    );
}


/* ---- Common Progessions ---- */
function CommonProgressions({children}) {
    return (
        <>
            <h2>Common Progressions:</h2>
            <div className={styles.commonProgressions}>
                {children}
            </div>
        </>
    );
}
function Progression({ chordNumber, chordNote }) {
    return (
        <div className={styles.progression}>
            <div className={styles.chordNumber}>
                {chordNumber}
            </div>
            <div className={styles.chordNote}>
                {chordNote}
            </div>
        </div>
    );
}
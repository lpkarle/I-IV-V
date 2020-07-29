import React, { useState, useEffect } from 'react'

import styles from './ChordsInKey.module.css';
import Dropdown from '../Multipurpose/Dropdown/Dropdown';

import { getTableNotes, availableVoicings, getScaleByNote, getChordsInKey } from '../../logic/';

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
        setSelectedVoicing(dropdownItems()[index].label.toLowerCase());
    }

    useEffect(() => {
        setScale(getScaleByNote(selectedVoicing, selectedKey));
        setChords(getChordsInKey(selectedVoicing));
        
        console.log(selectedKey, selectedVoicing);
        console.log(scale);
        console.log(chords);
    }, [selectedKey, selectedVoicing])


    /* ---------------- Styles ---------------- */
    function styleSelectedKey(key) {
        return {
            border: selectedKey === key ?
                    'red solid 5px' : 'grey solid 1px'
        }
    }


    return (
        <div className={styles.chordsInKey}>
            
            <KeyPicker>
                {allKeys.map((keyName, index) => (        
                    <Key keyName={keyName}
                         key={index}
                         style={styleSelectedKey(keyName)}
                         onClick={changeSelectedKey} 
                    />
                ))}
            </KeyPicker>

            <Dropdown data={dropdownItems()}
                      value={dropdownItem}
                      onChange={handleDropdown}/>

            <ResultingChords >
                {scale.map((note, index) => (
                    <ChordAndVoicing 
                        chordNote={note}
                        voicing={chords[index]}
                        key={index}
                    />
                ))}
            </ResultingChords>
        </div>
    )
}


/* -------- Select the Key -------- */
function KeyPicker({ children }) {
    return (
        <div className={styles.keyPicker}>
            <h2>Pick a Key:</h2>

            <div className={styles.keys}>
                {children}
            </div>           
        </div>
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
        <div className={styles.resultingChords}>
            {children}
        </div>
    );
}

function ChordAndVoicing({chordNote, voicing}) {

    return (
        <div className={styles.ChordAndVoicing}>
            <div className={styles.chordNote}>{chordNote}</div>
            <div className={styles.voicing}>{voicing[0]}</div>
        </div>
    );
}
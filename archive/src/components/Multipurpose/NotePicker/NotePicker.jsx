import React, { useState } from 'react';
import styles from './NotePicker.module.css';
import { naturalNotes, accidentals } from '../../../logic/musicConst.js';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup.jsx';


export default function NotePicker({ onClick }) {

    const [selNote, setSelNote] = useState(naturalNotes[0]);
    const [selAccidental, setSelAccidental] = useState(accidentals[0]);

    const styleSelectedItem = (item) => {
        if (item === selNote[0] || item === selAccidental) {
            return { 
                background: "var(--accent-color)",
                color: "white",
                fontSize: "50px",
                fontWeight: "bolder", 
            }
        }
    }

    return (
        <div className={styles.notePicker}>
            <div className={styles.notes}>
                {naturalNotes.map((note, index) => (
                    <h4 
                        key={index} 
                        className={styles.notePickerElement}
                        style={styleSelectedItem(note)}
                        onClick={() => {
                            onClick((note + (selAccidental === accidentals[0] ? '' : selAccidental))); 
                            setSelNote(note)}}>
                        {note}
                    </h4>
                ))}
            </div>
            <div className={styles.accidentals}>
                <RadioButtonGroup 
                    buttonList={{groupName: 'selectedKey', btns: accidentals}} 
                    onChange={(accidental)=> {
                        onClick((selNote + (accidental === accidentals[0] ? '' : accidental)));
                        setSelAccidental(accidental);
                    }} />
            </div>
        </div>
    );
}

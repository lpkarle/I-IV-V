import React, { useState } from 'react';
import styles from './NotePicker.module.css';
import cx from 'classnames';
import { naturalNotes, accidentals } from '../../../logic/musicConst.js';


export default function NotePicker({ onClick }) {

    const [selNote, setSelNote] = useState(naturalNotes[0]);
    const [selAccidental, setSelAccidental] = useState(accidentals[0]);

    const styleSelectedItem = (item) => {
        if (item === selNote[0] || item === selAccidental) {
            return { 
                background: "var(--accent-color)",
                fontSize: "25px",
                fontWeight: "bold" 
            }
        }
    }
    
    return (
        <div className={cx("card", styles.notePicker)}>
            {naturalNotes.map((note, index) => (
                    <div 
                        key={index} 
                        className={styles.notePickerElement}
                        style={styleSelectedItem(note)}
                        onClick={() => {
                            onClick((note + (selAccidental === accidentals[0] ? '' : selAccidental))); 
                            setSelNote(note)}}>
                        {note}
                    </div>
            ))}
            <div className={styles.accidentals}>
                {accidentals.map((accidental, index) => (
                    <div 
                        key={index}
                        className={styles.notePickerElement} 
                        style={styleSelectedItem(accidental)} 
                        onClick={() => {
                            onClick((selNote + (accidental === accidentals[0] ? '' : accidental))); 
                            setSelAccidental(accidental)}}>
                        {accidental}
                    </div>
                ))}
            </div>
        </div>
    );
}

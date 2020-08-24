import React, { useState, useEffect } from 'react';
import styles from './NotePicker.module.css';
import cx from 'classnames';
import { naturalNotes, accidentals } from '../../../logic/musicConst.js';


export default function NotePicker({selectedNote, onClick}) {

    const [selNote, setSelNote] = useState(selectedNote);
    const [selAccidental, setSelAccidental] = useState(accidentals[0]);

    useEffect(() => {
        const n = selAccidental === '♮' ? selNote : (selNote + selAccidental);
        onClick(n);
    }, [selNote, selAccidental])

    const styleSelectedItem = (item) => {
        if (item === selectedNote[0] || item === selAccidental) {
            return { 
                background: "var(--accent-color)",
                color: "var(--bg-primary-color)",
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
                        onClick={() => setSelNote(note)} >
                        {note}
                    </div>
            ))}
            <div className={styles.accidentals}>
                {accidentals.map((accidental, index) => (
                    <div 
                        key={index}
                        className={styles.notePickerElement} 
                        style={styleSelectedItem(accidental)} 
                        onClick={() => setSelAccidental(accidental)} >
                        {accidental}
                    </div>
                ))}
            </div>
        </div>
    );
}

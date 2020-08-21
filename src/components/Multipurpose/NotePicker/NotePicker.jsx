import React from 'react';
import styles from './NotePicker.mudule.css';


export default function NotePicker({selectedNote, onClick}) {
    const naturals = ['A', 'B', 'C', 'D', 'E', 'F', 'G '];

    /* const handleClick = (note) => {
        onClick(note);
    } */

    const noteStyle = (note) => {
        /* if () */
        return {
            border: note === selectedNote ? "red solid 1px" : "var(--text-primary) solid 1px",
        }
    }

    return (
        <div className={cx("card", styles.pickNote)}>
            {naturals.map((note, index) => (
                    <div 
                        key={index} 
                        className={styles.selectedNote}
                        style={noteStyle(note)}
                        onClick={onClick}
                    >
                            {note}
                    </div>
            ))}
            <div className={styles.selectedNote} style={noteStyle('♯')}>♯</div>
            <div className={styles.selectedNote} style={noteStyle('♭')}>♭</div>
        </div>
    );
}

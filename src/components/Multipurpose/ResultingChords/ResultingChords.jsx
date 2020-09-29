import React from 'react';
import styles from './ResultingChords.module.css';

export default function ResultingChords({ chordsAndProgressions }) {

    const styleChordVoicing = (chordVoicing) => {
        if (chordVoicing.includes('°')) {
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
        <>
            <div className={styles.resultingChords}>
                {chordsAndProgressions.scale.notes.map((note, index) => (
                    <ChordAndVoicing
                        chordNote={note}
                        voicing={chordsAndProgressions.chords[index]}
                        key={index}
                        style={styleChordVoicing(chordsAndProgressions.chords[index])}
                    />
                ))}    
            </div>
        </>
    );
}

function ChordAndVoicing({ chordNote, voicing, style }) {
    return (
        <div className={styles.chordAndVoicing}>
            <div className={styles.chordNote} style={style}>{chordNote}</div>
            <div className={styles.voicing}>{voicing}</div>
        </div>
    );
}
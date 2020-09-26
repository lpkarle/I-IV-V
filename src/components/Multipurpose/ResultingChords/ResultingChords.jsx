import React from 'react';
import cx from 'classnames';
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
            <Wrapper label="Resulting Chords:">
                <div className={cx("card", "card-padding", styles.resultingChords)}>
                    {chordsAndProgressions.scale.notes.map((note, index) => (
                        <ChordAndVoicing
                            chordNote={note}
                            voicing={chordsAndProgressions.chords[index]}
                            key={index}
                            style={styleChordVoicing(chordsAndProgressions.chords[index])}
                        />
                    ))}    
                </div>
            </Wrapper>
            <Wrapper label="Common Progressions:">
                <div className={cx("card", "card-padding")}>
                    {chordsAndProgressions.progressions.map((num, index) => (
                        <Progression
                            progression={num}
                            chords={chordsAndProgressions.chords}
                            scale={chordsAndProgressions.scale}
                            key={index}
                            style={styleChordVoicing} />
                    ))}
                </div>
            </Wrapper>
        </>
    );
}

function Wrapper({ children, label }) {
    return (
        <div className={"card-wrapper"}>
            <h4 style={{ textAlign: 'left', marginBottom: ".5rem" }}>{label}</h4>
            {children}    
        </div>
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

function Progression({ progression, chords, scale, style }) {
    return (
        <div className={styles.progression}>
            <div className={styles.progressionNum}>
                {progression.map((prog, index) => (
                    <div className={styles.chordNumber}
                        key={index}>
                        {chords[prog - 1]}
                    </div>
                ))}:
            </div>
            <div className={styles.progressionChords}>
                {progression.map((prog, index) => (
                    <div className={styles.chordNote}
                        key={index}
                        style={style(chords[prog - 1])}>
                        {scale.notes[prog - 1]}
                    </div>
                ))}
            </div>
        </div>
    );
}
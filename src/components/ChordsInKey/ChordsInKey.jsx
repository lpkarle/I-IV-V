import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import styles from './ChordsInKey.module.css';
import { NotePicker, DropdownMenu } from '../Multipurpose/';
import { getScales, getScaleAndCommonProg } from '../../logic/';


export default function ChordsInKey() {

    const ddElements = getScales();

    const [selectedNote, setSelectedNote] = useState('C');
    const [selectedVoicing, setSelectedVoicing] = useState('Major');

    const [chordsAndProgressions, setChordsAndProgressions] = useState(
        getScaleAndCommonProg(selectedVoicing, selectedNote));

    useEffect(() => {
        setChordsAndProgressions(getScaleAndCommonProg(selectedVoicing, selectedNote));
    }, [selectedNote, selectedVoicing]);

    /* ---------------- Styles ---------------- */
    function styleChordVoicing(chordVoicing) {
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
        <div className="content">
            <h1>Chords in a Key</h1>
            <div className={styles.chordsInKey}>
                <div className={styles.left}>

                    <h2>Select Key:</h2>
                    <NotePicker 
                        onClick={(note) => setSelectedNote(note)}/>


                    <div>
                        <h2>Select Voicing:</h2>
                        <div className={cx("card", styles.voicingPicker)}>

                        <DropdownMenu 
                            list={ddElements} 
                            onChange={(voicing) => setSelectedVoicing(voicing)} />
            
                        </div>
                    </div>

                    <ResultingChords >
                        {chordsAndProgressions.scale.notes.map((note, index) => (
                            <ChordAndVoicing
                                chordNote={note}
                                voicing={chordsAndProgressions.chords[index]}
                                key={index}
                                style={styleChordVoicing(chordsAndProgressions.chords[index]) }
                            />
                        ))}
                    </ResultingChords>
                </div>

                <div className={styles.right}>
                    <CommonProgressions>
                        {chordsAndProgressions.progressions.map((num, index) => (
                            <Progression
                                progression={num}
                                chords={chordsAndProgressions.chords}
                                scale={chordsAndProgressions.scale}
                                key={index}
                                style={styleChordVoicing} />
                        ))}
                    </CommonProgressions>
                </div>
            </div>
        </div>
    )
}


function ResultingChords({ children }) {
    return (
        <>
            <h2>Resulting Chords:</h2>
            <div className={cx(styles.resultingChords, "card")}>
                {children}
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


function CommonProgressions({ children }) {
    return (
        <>
            <h2>Common Progressions:</h2>
            <div className={cx("card", styles.commonProgressions)}>
                {children}
            </div>
        </>
    );
}

function Progression({ progression, chords, scale, style }) {
    return (
        <div className={styles.commonProgressions}>
            <div className={styles.progression}>

                <div className={styles.progressionNum}>
                    {progression.map((prog, index) => (
                        <div className={styles.chordNumber}
                            key={index}>
                            {chords[prog-1]}
                        </div>
                    ))}:
                </div>

                <div className={styles.progressionChords}>
                    {progression.map((prog, index) => (
                        <div className={styles.chordNote}
                            key={index}
                            style={style(chords[prog-1])}>
                            {scale.notes[prog-1]}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
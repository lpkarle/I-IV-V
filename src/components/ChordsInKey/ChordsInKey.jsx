import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import styles from './ChordsInKey.module.css';
import { NotePicker } from '../Multipurpose/';
import { getScales, getScaleAndCommonProg } from '../../logic/';


export default function ChordsInKey() {

    const ddElements = getScales();

    const [selectedNote, setSelectedNote] = useState('C');
    const [selectedVoicing, setSelectedVoicing] = useState('Major');

    const [chordsAndProgressions, setChordsAndProgressions] = useState(
        getScaleAndCommonProg(selectedVoicing, selectedNote));

    useEffect(() => {
        document.title = "I IV V - Chords in Key";
    }, []);

    useEffect(() => {
        setChordsAndProgressions(getScaleAndCommonProg(selectedVoicing, selectedNote));
    }, [selectedNote, selectedVoicing]);


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

    const styleSelectedVoicing = (voicing) => {
        if (selectedVoicing === voicing) {
            return {
                border: "var(--accent-color) solid 6px",
                opacity: "1"
            }
        } 
    }

    return (
        <div className="content">

            <div className={styles.chordsInKey}>

                <div className={"card-wrapper"}>
                    <h4 style={{marginBottom: ".5rem"}}>Select Key:</h4>
                    <div className={cx("card", "card-padding")}>
                        <NotePicker
                            onClick={(note) => setSelectedNote(note)} />
                    </div>
                </div>


                <div className={"card-wrapper"}>
                    <h4 /*  className="section-label"  */style={{marginBottom: ".5rem"}}>Select Voicing:</h4>
                    <div className={cx("card", "card-padding", styles.voicingPicker)}>

                        {ddElements.map((name, index) => (
                            <button 
                                className="btn"
                                style={styleSelectedVoicing(name)}
                                key={index}
                                onClick={() => setSelectedVoicing(name)}>
                                {name}
                            </button>
                        ))}
                    </div>
                </div>

                <ResultingChords >
                    {chordsAndProgressions.scale.notes.map((note, index) => (
                        <ChordAndVoicing
                            chordNote={note}
                            voicing={chordsAndProgressions.chords[index]}
                            key={index}
                            style={styleChordVoicing(chordsAndProgressions.chords[index])}
                        />
                    ))}
                </ResultingChords>

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
    )
}

function ResultingChords({ children }) {
    return (
        <div className={"card-wrapper"}>
            <h4 style={{marginBottom: ".5rem"}}>Resulting Chords:</h4>
            <div className={cx("card", "card-padding", styles.resultingChords)}>
                {children}
            </div>
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

function CommonProgressions({ children }) {
    return (
        <div className={"card-wrapper"}>
            <h4 style={{marginBottom: ".5rem"}}>Common Progressions:</h4>
            <div className={cx("card", "card-padding", styles.commonProgressions)}>
                {children}
            </div>
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
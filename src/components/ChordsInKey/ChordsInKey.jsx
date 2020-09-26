import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import styles from './ChordsInKey.module.css';
import { NotePicker } from '../Multipurpose/';
import { getScales, getScaleAndCommonProg } from '../../logic/';
import { ResultingChords, LegendVoicing } from '../Multipurpose/';

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

    const styleSelectedVoicing = (voicing) => {
        if (selectedVoicing === voicing) {
            return {
                border: "var(--accent-color) solid 6px",
                opacity: "1"
            }
        }
    }

    return (
        <div className={styles.chordsInKey}>

            {/* Key Selection */}
            <div className={"card-wrapper"}>
                <h4 style={{ marginBottom: ".5rem" }}>Select Key:</h4>
                <div className={cx("card", "card-padding")}>
                    <NotePicker
                        onClick={(note) => setSelectedNote(note)} />
                </div>
            </div>

            {/* Voicing Selection */}
            <div className={"card-wrapper"}>
                <h4 style={{ marginBottom: ".5rem" }}>Select Voicing:</h4>
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

            <ResultingChords chordsAndProgressions={chordsAndProgressions}/> 
            <LegendVoicing />
        </div>
    );
}
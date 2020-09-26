import React, { useState, useEffect } from 'react';
import styles from './Fretboard.module.css';
import cx from 'classnames';
import { Dropdown, NotePicker, NumberPicker, Checkbox, RadioButtonGroup, CollapsableContainer } from '../Multipurpose/';

import { getScales, getChord, getChords, getScale, getAccidental, getChromaticScale } from '../../logic/index';
import { getTuningNames, getInstruments, getTuningByName } from '../../logic/index';

import { AddIcon, RemoveIcon, MirrorVIcon, MirrorHIcon } from '../../images';

export default function Fretboard() {

    /* ---- Fretboard ---- */
    const FRETBOARDMIN = 1,
        FRETBOARDMAX = 24;

    const [fretFromTo, setFretFromTo] = useState({ from: 1, to: 12 });
    const [fretboardOrientation, setFretboardOrientation] = useState({ horizontal: false, vertical: true });

    const instruments = getInstruments();   // List for Dropdown
    const [instrument, setInstrument] = useState(instruments[0]);
    const [defaultTunings, setDefaultTunings] = useState(getTuningNames(instrument));

    /* ---- Note Selction ---- */
    const [selectedNote, setSelectedNote] = useState('C');
    const [selectedVoicing, setSelectedVoicing] = useState('Major');
    const [scale, setScale] = useState({
        ddElements: getScales(),
        scale: getScale(selectedVoicing, selectedNote)
    });
    const [chord, setChord] = useState({
        ddElements: getChords(),
        chord: getChord(selectedVoicing, selectedNote)
    });

    const [ddElements, setDdElements] = useState(scale.ddElements);
    const [highlightedNotes, setHighlightedNotes] = useState(scale.scale);

    /* ---- Defines Style/Highlited Notes */
    const buttonGroupRename = ['Scale', 'Chord'];
    // bei Sclae -> alle möglichen Scales bzw chords
    const [selectedChordOrScaleEl, setSelectedChordOrScaleEl] = useState(buttonGroupRename[0]);

    /* ---- Fretboard-Config ---- */
    const [tuning, setTuning] = useState(getTuningByName(
        instrument, getTuningNames(instrument)[0], fretboardOrientation.horizontal, highlightedNotes.notes));
    const [showRoot, setShowRoot] = useState(true);
    const [showScaleNotes, setShowScaleNotes] = useState(true);
    const [showAllNotes, setShowNone] = useState(true);

    useEffect(() => {
        document.title = "I IV V - Fretboard"
    }, [])

    useEffect(() => {
        setScale(prevScale => {
            return { ...prevScale, scale: getScale(selectedVoicing, selectedNote) }
        });
        setChord(prevChord => {
            return { ...prevChord, chord: getChord(selectedVoicing, selectedNote) }
        });
    }, [selectedNote, selectedVoicing, selectedChordOrScaleEl]);

    useEffect(() => {
        setDdElements(selectedChordOrScaleEl === 'Scale' ? scale.ddElements : chord.ddElements);
        setHighlightedNotes(selectedChordOrScaleEl === 'Scale' ? scale.scale : chord.chord);
    }, [selectedChordOrScaleEl, scale, chord]);

    useEffect(() => {
        setTuning(
            getTuningByName(instrument, tuning.name, fretboardOrientation.horizontal, highlightedNotes.notes)
        );
    }, [instrument, defaultTunings, fretboardOrientation, highlightedNotes]);

    /* Generate Frets */
    const fretArray = () => {
        let fretArr = [];
        for (let i = 0; i <= FRETBOARDMAX; i++) {
            if (fretboardOrientation.vertical) {
                fretArr.push(i);
            } else {
                fretArr.unshift(i);
            }
        }
        return fretArr;
    }

    const addString = () => {
        setTuning(prevTuning => {
            return { ...prevTuning, notes: [...prevTuning.notes, getChromaticScale(highlightedNotes.notes, 'E')] }
        });
    }

    const removeString = (index) => {
        const newTuning = tuning.notes;
        newTuning.splice(newTuning.length - 1, 1);

        setTuning(prevTuning => {
            return { ...prevTuning, notes: newTuning }
        });
    }

    const changeInstrument = (inst) => {
        setInstrument(inst);
        setDefaultTunings(getTuningNames(inst));
    }

    const changeHorizontalOrientation = () => {
        setFretboardOrientation(prevOrien => {
            return { ...prevOrien, horizontal: !prevOrien.horizontal }
        });
    }

    const changeVerticalOrientation = () => {
        setFretboardOrientation(prevOrien => {
            return { ...prevOrien, vertical: !prevOrien.vertical }
        });
    }

    const changeTuning = (tun) => {
        setTuning(getTuningByName(instrument, tun, fretboardOrientation.horizontal, highlightedNotes.notes));
    }

    const changeStringNote = (index, newNote) => {
        const changed = tuning.notes;
        changed[index] = getChromaticScale(getAccidental(highlightedNotes.notes), newNote);
        setTuning(prevTuning => {
            return { ...prevTuning, notes: changed }
        });
    }

    /* Show and hide instead of generate */
    const styleFrets = (num) => {
        return {
            display: (num >= fretFromTo.from && num <= fretFromTo.to)
                ? "flex" : "none",
        }
    }

    const styleNotes = (note) => {
        if (highlightedNotes.notes[0] === note) {
            return {
                display: showRoot ? null : "none",
                background: 'var(--p1-color)',
                color: "var(--bg-primary-color)",
                fontWeight: "bold",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                border: "none"
            }
        } else if (highlightedNotes.notes.includes(note)) {
            return {
                background: showScaleNotes ? 'var(--accent-color)' : 'transparent',
                color: showScaleNotes ? "var(--bg-primary-color)" : 'transparent',
                fontWeight: "bold",
                textShadow: showScaleNotes ? "1px 1px 2px rgba(0, 0, 0, 0.5)" : 'none',
                border: "none"
            }
        } else {
            return {
                background: showAllNotes ? 'var(--bg-secondary-color)' : 'transparent',
                color: showAllNotes ? 'var(--text-primary)' : 'transparent',
                textShadow: "none",
                fontSize: note.length > 2 ? "10px" : "16px"
            }
        }
    }

    return (
        <div className="content">

            {/* -------- Configure Note and Chord / Scale -------- */}
            <CollapsableContainer label={`Selected Note: ${selectedNote}`}>
                <NotePicker onClick={(note) => setSelectedNote(note)} />
            </CollapsableContainer>

            <CollapsableContainer label={`Show: ${selectedVoicing} ${selectedChordOrScaleEl}`}>
                <div className={styles.configVoicing}>
                    <Dropdown
                        list={ddElements} 
                        onChange={setSelectedVoicing}/> 

                    <RadioButtonGroup
                        buttonList={{ groupName: 'scaleChord', btns: buttonGroupRename }}
                        onChange={(el) => setSelectedChordOrScaleEl(el)} />
                </div>
            </CollapsableContainer>

            <CollapsableContainer label="Notes & Intervals">
                <div className={cx(styles.resultScale)}>
                    {highlightedNotes.intervals.map((interval, index) => (
                        <div key={index} className={styles.noteAndInterval}>
                            <div className={styles.intervalNote}>{index === (highlightedNotes.intervals.length - 1)
                                ? highlightedNotes.notes[0] : highlightedNotes.notes[index]}</div>
                            <div className={styles.interval}>{interval}</div>
                        </div>
                    ))}
                </div>
            </CollapsableContainer>

            {/* -------- Configure Fretboard Appearance -------- */}
            <CollapsableContainer label="Fretboard Config">
                <div className={cx(styles.fretboardConfig)}>
                    <div className={styles.configStrings}>
                        <div>
                            <Dropdown
                                list={instruments} 
                                onChange={changeInstrument}/> 
                            <Dropdown
                                list={defaultTunings} 
                                onChange={changeTuning}/>              
                        </div>
                        <div>
                            <AddIcon className="svg-btn" onClick={addString} />
                            <RemoveIcon className="svg-btn" onClick={() => removeString(0)} />

                            <MirrorHIcon className="svg-btn" onClick={changeHorizontalOrientation} />
                            <MirrorVIcon className="svg-btn" onClick={changeVerticalOrientation} />
                        </div>
                    </div>

                    <div className={styles.configNotes}>
                        <div className={styles.showFrets}>
                            <p>Show Fret</p>
                            <NumberPicker
                                defaultNum={fretFromTo.from}
                                range={{ min: FRETBOARDMIN, max: fretFromTo.to }}
                                onClick={(num) => setFretFromTo(prev => { return { ...prev, from: num } })}
                                from={true}
                            />
                            <p> to</p>
                            <NumberPicker
                                defaultNum={fretFromTo.to}
                                range={{ min: fretFromTo.from, max: FRETBOARDMAX }}
                                onClick={(num) => setFretFromTo(prev => { return { ...prev, to: num } })}
                                from={false}
                            />
                        </div>
                        <div className={styles.shownNotes}>
                            <Checkbox
                                label={'All Notes'}
                                checked={showAllNotes}
                                onChange={() => setShowNone(!showAllNotes)} />
                            <Checkbox
                                label={'Root'}
                                checked={showRoot}
                                onChange={() => setShowRoot(!showRoot)} />

                            <Checkbox
                                label={`Notes in ${selectedChordOrScaleEl}`}
                                checked={showScaleNotes}
                                onChange={() => setShowScaleNotes(!showScaleNotes)} />
                        </div>
                    </div>
                </div>
            </CollapsableContainer>

            <div className={cx("card", styles.boardWrapper)}>
                <div className={styles.board}>

                    <OpenStrings
                        orientation={fretboardOrientation.vertical}
                        tuning={tuning.notes}
                        onClick={changeStringNote}
                        sideMargin={{ marginRight: ".5rem" }}
                        style={styleNotes} />

                    {fretArray().map((indexFret) => (
                        <Fret
                            key={indexFret}
                            number={indexFret}
                            style={styleFrets(indexFret)}>

                            {tuning.notes.map((element, indexTuning) => (
                                <Strings
                                    note={element[indexFret]}
                                    key={indexTuning}
                                    styleNote={styleNotes} />
                            ))}
                        </Fret>
                    ))}

                    <OpenStrings
                        orientation={!fretboardOrientation.vertical}
                        tuning={tuning.notes}
                        onClick={changeStringNote}
                        sideMargin={{ marginLeft: ".5rem" }}
                        style={styleNotes} />
                </div>
            </div>
        </div>
    );
}


function OpenStrings({ orientation, sideMargin, style, tuning, onClick }) {
    return (
        <>
            {orientation ?
                <div
                    className={styles.openStrings}
                    style={sideMargin}>

                    {tuning.map((element, index) => (
                        <div
                            style={style(element[0])}
                            className={styles.note}
                            onClick={() => onClick(index, 'C')}
                            key={index}>
                            {element[0]}
                        </div>
                    ))}
                </div>
                : null
            }
        </>
    );
}

function Fret({ children, style, number }) {
    return (
        <div className={styles.fret} style={style}>
            <p>{number}</p>
            {children}
        </div>
    );
}

function Strings({ note, styleString, styleNote }) {
    return (
        <div className={styles.strings} style={styleString}>
            <div
                className={styles.note}
                onClick={() => console.log(note)}
                style={styleNote(note)}>
                {note}
            </div>
        </div>
    );
}
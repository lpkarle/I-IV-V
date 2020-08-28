import React, { useState, useEffect } from 'react';
import styles from './Fretboard.module.css';
import cx from 'classnames';

import { DropdownMenu, NotePicker, NumberPicker, Checkbox, RadioButtonGroup } from '../Multipurpose/';

import { getScales,getChord, getChords, getScale,getChromaticScale, getScaleByNote } from '../../logic/index';
import { getTuningNames, getInstruments, getTuningByName, getTriad } from '../../logic/index';

import { AddIcon, RemoveIcon, MirrorVIcon, MirrorHIcon } from '../../images/svgs';

export default function Fretboard() {
  
    /* ---- Fretboard ---- */
    const FRETBOARDMIN = 1,
          FRETBOARDMAX = 24;

    const [fretFromTo, setFretFromTo] = useState({from: 1, to: 12});
    
    const [fretboardOrientation, setFretboardOrientation] = useState({horizontal: false, vertical: true});
    
    const instruments = getInstruments();   // List for Dropdown
    const [instrument, setInstrument] = useState(instruments[0]);
    const [defaultTunings, setDefaultTunings] = useState(getTuningNames(instrument));
    
    
    /* ---- Note Selction ---- */
    const [selectedNote, setSelectedNote] = useState('C');
    const [selectedVoicing, setSelectedVoicing] = useState('Major');

    /* ---- Fretboard-Config ---- */
    const [tuning, setTuning] = useState(getTuningByName(
        instrument, getTuningNames(instrument)[0], fretboardOrientation.horizontal, selectedNote));
    const [showIntervals, setShowIntervals] = useState(true);
    const [showRoot, setShowRoot] = useState(true);
    const [showNone, setShowNone] = useState(false);


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


    const [selectedScale, setSelectedScale] = useState(getScale(selectedVoicing, selectedNote)); 
    


    /* ---- Defines Style/Highlited Notes */
    const buttonGroupRename = ['Scale', 'Chord']; 
    // bei Sclae -> alle möglichen Scales bzw chords
    const [selectedChordOrScaleEl, setSelectedChordOrScaleEl] = useState(buttonGroupRename[0]);
    
 
    
    useEffect(() => {
        console.log("Oben");
        setTuning(
            getTuningByName(instrument, tuning.name, fretboardOrientation.horizontal, selectedNote)
        );
    }, [instrument, defaultTunings, fretboardOrientation, selectedNote])

    useEffect(() => {
       
        setScale(prevScale => {
            return {...prevScale, scale: getScale(selectedVoicing, selectedNote)}
        });
        setChord(prevChord => {
            return {...prevChord, chord: getChord(selectedVoicing, selectedNote)}
        });
    }, [selectedNote, selectedVoicing, selectedChordOrScaleEl]);

    useEffect(() => {
        setDdElements(selectedChordOrScaleEl === 'Scale' ? scale.ddElements : chord.ddElements);
        setHighlightedNotes(selectedChordOrScaleEl === 'Scale' ? scale.scale : chord.chord );
    }, [selectedChordOrScaleEl,scale,chord]);
    
    //! Change!!!
    const fretArray = () => {
        let t = [];
        for (let i = 0; i <= FRETBOARDMAX; i++) {
            if (fretboardOrientation.vertical) {
                t.push(i);
            } else {
                t.unshift(i);
            }
        }
        return t;
    }

    const addString = () => {
        setTuning(prevTuning => {
            return {...prevTuning, notes: [...prevTuning.notes, getChromaticScale('E')]}
        });
    }

    const removeString = (index) => { 
        const newTuning = tuning.notes;
        newTuning.splice(newTuning.length - 1, 1);
     
        setTuning(prevTuning => {
            return {...prevTuning, notes: newTuning}
        });
    }

    const changeInstrument = (inst) => {
        setInstrument(inst);
        setDefaultTunings(getTuningNames(inst));
    }

    const changeHorizontalOrientation = () => {
        setFretboardOrientation(prevOrien => {
            return {...prevOrien, horizontal: !prevOrien.horizontal}
        });
    }

    const changeVerticalOrientation = () => {
        setFretboardOrientation(prevOrien => {
            return {...prevOrien, vertical: !prevOrien.vertical}
        });
    }

    const changeTuning = (tun) => {
        setTuning(getTuningByName(instrument, tun, fretboardOrientation.horizontal, selectedNote));
    }

    const changeStringNote = (index, newNote) => {
        const changed = tuning.notes;
        changed[index] = getChromaticScale(newNote);
        setTuning(prevTuning => {
            return {...prevTuning, notes: changed}
        });
    }

    const handlePrint = () => {
        /* Open a new Tab for that */
        const printContent = document.querySelector(`.${styles.boardWrapper}`).innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
    }

    /* Show and hide instead of generate */
    const styleFrets = (num) => {
        return {
            display: (num >= fretFromTo.from && num <= fretFromTo.to) 
                ? "flex" : "none",
        }
    }

    const styleNotes = (note) => {
        //console.log("style", note, selectedScale.notes[0]);
        if (highlightedNotes.notes[0] === note) {
            return { 
                background: 'royalblue',
                color: "var(--bg-primary-color)",
                fontWeight: "bold",
                border: "none"
            }
        }
        if (highlightedNotes.notes.includes(note)) {
            return { 
                background: 'rgba(238, 238, 238)',
                color: "var(--bg-primary-color)",
                fontWeight: "bold",
                border: "none"
            }
        }
    }


    return (
        <div className="content">

            <h3>Note Config:</h3>
            <NotePicker 
                selectedNote={selectedNote} 
                onClick={(note) => {setSelectedNote(note)}}
            />          

            <h3>Result</h3>

            <div className={cx("card", styles.resultScale)}>
                <h3>{selectedNote}</h3>
                <h3>{highlightedNotes.notes}</h3>
                <h3>{highlightedNotes.intervals}</h3>
            </div>


            <h3>Select Sth:</h3>
            <div className={cx("card", styles.sth)}>
                <DropdownMenu 
                    list={ddElements} 
                    onChange={(voicing) => setSelectedVoicing(voicing)} />
            
    

                <RadioButtonGroup 
                    buttonList={{groupName: 'scaleChord', btns: buttonGroupRename}} 
                    onChange={(el)=> setSelectedChordOrScaleEl(el)} />

                <div className={styles.cb}>
                    <Checkbox 
                        label={'Intervals'} 
                        checked={showIntervals} 
                        onChange={()=> {setShowIntervals(!showIntervals); setShowNone(false)}}/>
                    <Checkbox 
                        label={'None'} 
                        checked={showNone} 
                        onChange={()=> {setShowNone(!showNone); setShowRoot(false); setShowIntervals(false)}}/>
                    <Checkbox 
                        label={'Root'} 
                        checked={showRoot} 
                        onChange={()=> {setShowRoot(!showRoot); setShowNone(false)}}/>
                </div>

            </div>

            <h3>Fretboard Config:</h3>
            <div className={cx("card", styles.fretboardConfig)}>
                <DropdownMenu list={instruments} onChange={changeInstrument} />
                <DropdownMenu list={defaultTunings} onChange={changeTuning} />

                <NumberPicker 
                    defaultNum={fretFromTo.from} 
                    range={{min: FRETBOARDMIN, max: fretFromTo.to}}
                    onClick={(num) => setFretFromTo(prev => { return {...prev, from: num} })}
                    from={true}
                />
                <NumberPicker 
                    defaultNum={fretFromTo.to} 
                    range={{min: fretFromTo.from, max: FRETBOARDMAX}}
                    onClick={(num) => setFretFromTo(prev => { return {...prev, to: num} })}
                    from={false}
                />
            
                <AddIcon className="svg-btn" onClick={addString} />
                <RemoveIcon className="svg-btn" onClick={() => removeString(0)} />
                
                <MirrorHIcon className="svg-btn" onClick={changeHorizontalOrientation} />
                <MirrorVIcon className="svg-btn" onClick={changeVerticalOrientation} />
            
                
            </div>

        

            <div className={cx("card", styles.boardWrapper)}>
                <div className={styles.board2}>

                    <OpenStrings 
                        orientation={fretboardOrientation.vertical}
                        tuning={tuning.notes}
                        onClick={changeStringNote}
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
                                    style={styleNotes} />
                            ))}

                        </Fret>
                    ))}

                    <OpenStrings 
                        orientation={!fretboardOrientation.vertical}
                        tuning={tuning.notes}
                        onClick={changeStringNote} 
                        style={styleNotes} />
                </div>
            </div>
            <br/>
            <button onClick={handlePrint}>Print</button>
        </div>
    )
}


function OpenStrings({orientation, style, tuning, onClick}) {
    return (
        <>
            {orientation ? 
                <div className={styles.openStrings}>
                    {tuning.map((element, index) => (
                        <div 
                            style={style(element[0])}
                            className={styles.stringNote} 
                            onClick={() => onClick(index, 'C')} 
                            key={index}
                        >
                            {element[0]}
                        </div>
                    ))}
                </div>
                : null
            }  
        </>
    );
}

function Fret({children, style, number}) {    
    return (
        <div className={styles.fret} style={style}>
            <p>{number}</p>
            {children}
        </div>
    );
}

function Strings({ note, style}) {

    return (
        <div className={styles.strings}>
            <div 
                className={styles.note} 
                onClick={() => console.log(note)}
                style={style(note)}>
                {note}
            </div>
        </div>
    );
}

/* function NoteAndInterval({ obj }) {

    const t = () => {
        let t = {};

        for (let i = 0; i < obj.intervals.lenght; i++) {

        }

        return t;
    }

    return (
        <div className={cx("card", styles.noteAndInterval)}>
            {obj.map((element, index) => (
                <>
                    <div>{elemt.notes[index]}</div>
                    <div>{elemt.notes[index]}</div>
                </>
            ))}
        </div>
    );
} */
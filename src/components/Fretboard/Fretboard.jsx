import React, { useState, useEffect } from 'react';
import styles from './Fretboard.module.css';
import cx from 'classnames';

/* import MultiSlider from '../Multipurpose/MultiSlider/MultiSlider'; */
import DropdownMenu from '../Multipurpose/DropdownMenu/DropdownMenu';
import NotePicker from '../Multipurpose/NotePicker/NotePicker';

import { getScales, getChromaticScale, getScaleByNote } from '../../logic/index';
import { getTuningNames, getInstruments, getTuningByName } from '../../logic/index';
import { ReactComponent as AddIcon } from '../../images/svgs/add-24px.svg';
import { ReactComponent as RemoveIcon } from '../../images/svgs/remove-24px.svg';
import { ReactComponent as MirrorVIcon } from '../../images/svgs/mirror-vertical.svg';
import { ReactComponent as MirrorHIcon } from '../../images/svgs/mirror-horizontal.svg';


export default function Fretboard() {
  
    const [fretFromTo, setFretFromTo] = useState({from: 1, to: 12});
    
    const [fretboardOrientation, setFretboardOrientation] = useState({horizontal: false, vertical: true});

    const instruments = getInstruments();   // List for Dropdown
    const [instrument, setInstrument] = useState(instruments[0]);
    const [defaultTunings, setDefaultTunings] = useState(getTuningNames(instrument));
    const [tuning, setTuning] = useState(getTuningByName(
        instrument, getTuningNames(instrument)[0], fretboardOrientation.horizontal));
    
    /* Selected Note and Scale/Chord/... */
    const [selectedNote, setSelectedNote] = useState('C');
    const [selectedVoicing, setSelectedVoicing] = useState('major');
    const [selectedScale, setSelectedScale] = useState(getScaleByNote(selectedVoicing, selectedNote));

    useEffect(() => {
        setTuning(getTuningByName(instrument, tuning.name, fretboardOrientation.horizontal));
    }, [instrument, defaultTunings, fretboardOrientation])

    useEffect(() => {
        setSelectedScale(getScaleByNote(selectedVoicing, selectedNote));
    }, [selectedNote, selectedVoicing]);


    
    //! Change!!!
    const fretArray = () => {
        let t = [];
        for (let i = 0; i<=24; i++) {
            if (fretboardOrientation.vertical) {
                t.push(i);
            } else {
                t.unshift(i);
            }
        }
        return t;
    }

    const handleOnChange = (e, from) => {
        if (from) {
            setFretFromTo({from: e.target.value, to: fretFromTo.to});
        } else {
            setFretFromTo({from: fretFromTo.from, to: e.target.value});
        }
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
        })
    }

    const changeVerticalOrientation = () => {
        setFretboardOrientation(prevOrien => {
            return {...prevOrien, vertical: !prevOrien.vertical}
        })
    }

    const changeTuning = (tun) => {
        setTuning(getTuningByName(instrument, tun, fretboardOrientation.horizontal));
    }

    const changeStringNote = () => {
        console.log("Change String Note");
    }

    /* Show and hide instead of generate */
    const styleFrets = (num) => {
        return {
            display: (num >= fretFromTo.from && num <= fretFromTo.to) 
                ? "flex" : "none",
        }
    }

    const styleNotes = (note) => {
        if (selectedScale[0] === note) {
            return { 
                background: 'royalblue',
                color: "var(--bg-primary-color)",
                fontWeight: "bold",
                border: "none"
            }
        }
        if (selectedScale.includes(note)) {
            return { 
                background: 'tomato',
                color: "var(--bg-primary-color)",
                fontWeight: "bold",
                border: "none"
            }
        }
    }


    return (
        <div className="content">

            <div>
                <h3>How many frets?</h3>
                <input 
                    type="number" 
                    defaultValue="1" 
                    min="1" 
                    max={(fretFromTo.to - 1)}
                    onChange={(e) => handleOnChange(e, true)}/>
                <input 
                    type="number" 
                    defaultValue="24" 
                    min={(fretFromTo.from + 1)} 
                    max="24"
                    onChange={(e) => handleOnChange(e, false)}/>
            </div>
            
            <div>From: {fretFromTo.from}</div><div>To: {fretFromTo.to}</div>

            <h3>Note Config:</h3>
            <NotePicker 
                selectedNote={selectedNote} 
                onClick={(note) => {setSelectedNote(note)}}
            />

            <h3>Select Sth:</h3>
            <div className={cx("card", styles.sth)}>
                <DropdownMenu 
                    list={getScales()} 
                    onChange={(voicing) => setSelectedVoicing(voicing.toLowerCase())} />
            
            
            </div>

            <h3>Fretboard Config:</h3>
            <div className={cx("card", styles.fretboardConfig)}>
                <DropdownMenu list={instruments} onChange={changeInstrument} />
                <DropdownMenu list={defaultTunings} onChange={changeTuning} />
            
                <AddIcon className="svg-btn" onClick={addString} />
                <RemoveIcon className="svg-btn" onClick={() => removeString(0)} />
                
                <MirrorHIcon className="svg-btn" onClick={changeHorizontalOrientation} />
                <MirrorVIcon className="svg-btn" onClick={changeVerticalOrientation} />
            </div>
        

            <div className={cx("card", styles.boardWrapper)}>
                <div className={styles.board2}>

                    <StringNotes 
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

                    <StringNotes 
                        orientation={!fretboardOrientation.vertical}
                        tuning={tuning.notes}
                        onClick={changeStringNote} 
                        style={styleNotes} />
                </div>
            </div>
        </div>
    )
}


function StringNotes({orientation, style, tuning, onClick}) {
    return (
        <>
            {orientation ? 
                <div className={styles.openStrings}>
                    {tuning.map((element, index) => (
                        <div 
                            style={style(element[0])}
                            className={styles.stringNote} 
                            onClick={onClick} 
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

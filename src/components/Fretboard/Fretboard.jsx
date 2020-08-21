import React, { useState, useEffect } from 'react';

/* import MultiSlider from '../Multipurpose/MultiSlider/MultiSlider'; */
import styles from './Fretboard.module.css';
import DropdownMenu from '../Multipurpose/DropdownMenu/DropdownMenu';

import cx from 'classnames';
import { getChromaticScale, getScaleByNote } from '../../logic/index';
import { getTuningNames, getInstruments, getTuningByName } from '../../logic/index';

export default function Fretboard() {
  
    const [fretFromTo, setFretFromTo] = useState({from: 1, to: 24});

    const instruments = getInstruments();   // List for Dropdown
    const [instrument, setInstrument] = useState(instruments[0]);
    const [defaultTunings, setDefaultTunings] = useState(getTuningNames(instrument));
    const [tuning, setTuning] = useState(getTuningByName(instrument, getTuningNames(instrument)[0]));
    
    /* Selected Note and Scale/Chord/... */
    const [selectedNote, setSelectedNote] = useState('C');
    const [selectedVoicing, setSelectedVoicing] = useState('major')
    const [selectedScale, setSelectedScale] = useState(getScaleByNote(selectedVoicing, selectedNote));

    useEffect(() => {
        setTuning(getTuningByName(instrument, tuning.name));
    }, [instrument, defaultTunings])

    
    //! Change!!!
    const fretArray = () => {
        let t = [];
        for (let i = 0; i<=24; i++) {
            t.push(i);
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
        newTuning.splice(index, 1);
     
        setTuning(prevTuning => {
            return {...prevTuning, notes: newTuning}
        })
    }

    const changeInstrument = (prev, inst) => {
        setInstrument(inst);
        setDefaultTunings(getTuningNames(inst));
    }

    const changeTuning = (prev, tun) => {
        setTuning(getTuningByName(instrument, tun));
    }

    const changeStringNote = () => {
        console.log("Change String Note");
    }

    /* Show and hide instead of generate */
    const styleFrets = (num) => {
        return {
            display: (num >= fretFromTo.from && num <= fretFromTo.to) ? "flex" : "none",
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

            <h3>Fretboard Config:</h3>
            <div className={cx("card", styles.fretboardConfig)}>
                <DropdownMenu list={instruments} onChange={changeInstrument} />
                <DropdownMenu list={defaultTunings} onChange={changeTuning} />
            
                <button onClick={addString}>Add String</button>
                <button onClick={() => removeString(0)}>Remove String</button>
                
            </div>
        

            <div className={cx("card", styles.boardWrapper)}>
                <div className={styles.board2}>

                    <div className={styles.openStrings}>
                        {tuning.notes.map((element, index) => (
                            <div onClick={changeStringNote} className={styles.stringNote} key={index}>{element[0]}</div>
                            
                        ))}
                    </div>

                    {fretArray().map((indexFret) => (
                        <Fret key={indexFret} num={indexFret} style={styleFrets(indexFret)}>

                            {tuning.notes.map((element, indexTuning) => (
                                <Strings scale={selectedScale} note={element[indexFret]} key={indexTuning} />
                            ))}

                        </Fret>
                    ))}
                </div>
            </div>
        </div>
    )
}


function Board({children}) {
    return (
        <div className={styles.board}>
            {children}        
        </div>
    );
}

function Fret({children, num, notes, style}) {    
    return (
        <div className={styles.fret} style={style}>
            {children}
        </div>
    );
}

function Strings({ scale, note, style}) {

    const noteStyle = (note) => {
        if (scale[0] === note) {
            return { background: 'royalblue'}
        }
        if (scale.includes(note)) {
            return { background: 'tomato'}
        }
    }

    return (
        <div className={styles.strings} style={style}>
            <div 
                className={styles.note} 
                onClick={() => console.log(note)}
                style={noteStyle(note)}>
                {note}
            </div>
        </div>
    );
}

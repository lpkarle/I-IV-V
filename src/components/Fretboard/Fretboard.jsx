import React, { useState, useEffect } from 'react';

/* import MultiSlider from '../Multipurpose/MultiSlider/MultiSlider'; */
import styles from './Fretboard.module.css';
import DropdownMenu from '../Multipurpose/DropdownMenu/DropdownMenu';

import cx from 'classnames';
import { getChromaticScale } from '../../logic/index';

export default function Fretboard() {

    // Elements for instrument toggle
    const tunings = {
        guitarStandart: [
            getChromaticScale('E'),
            getChromaticScale('B'),
            getChromaticScale('G'),
            getChromaticScale('D'), 
            getChromaticScale('A'), 
            getChromaticScale('E')
        ],
        guitarDropD: ['D', 'A', 'D', 'G', 'B', 'E'],
        guitarOpenD: ['D', 'F#', 'D', 'G', 'B', 'D'] ,

        bassStandart: [  
            {root: 'G', chromatic: getChromaticScale('G')},
            {root: 'D', chromatic: getChromaticScale('D')}, 
            {root: 'A', chromatic: getChromaticScale('A')}, 
            {root: 'E', chromatic: getChromaticScale('E')} 
        ],
        guitar1Standart: [  
            {root: 'E', chromatic: getChromaticScale('E')},
            {root: 'B', chromatic: getChromaticScale('B')},  
            {root: 'G', chromatic: getChromaticScale('G')},
            {root: 'D', chromatic: getChromaticScale('D')}, 
            {root: 'A', chromatic: getChromaticScale('A')}, 
            {root: 'E', chromatic: getChromaticScale('E')} 
        ],

        custom: [] 
    }   

    const tuningGuitar = [
        {name: 'Standart', strings: ['E', 'A', 'D', 'G', 'B', 'E']},
        {name: 'Drop-D',   strings: ['D', 'A', 'D', 'G', 'B', 'E']},
        {name: 'Open-D',   strings: ['D', 'F#', 'D', 'G', 'B', 'D']},
    ];

    const guitarTuningArr = ['Standart', 'Drop-D', 'Open-D'];
    const instrumentArr = ['Bass', 'Guitar'];
    const scales = ['Major', 'Minor', 'Pentatonic' , 'Blues'];


    const dotedFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
    const [fretFromTo, setFretFromTo] = useState({from: 1, to: 24});

    const [selectedTuning, setSelectedTuning] = useState(tunings.bassStandart);
    const [tuning, setTuning] = useState();
    const [selectedScale, setSelectedScale] = useState();
    
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

    const handleSelectedNote = (prevNote, note) => {
        console.log(prevNote, note);
/*         setSelectedTuning(prevTuning => prevTuning.keys.root)*/
    }


    const addString = () => {
        setSelectedTuning(tuningList => 
            [...tuningList, {root: 'E', chromatic: getChromaticScale('E')}]
        );
    }
    const removeString = (index) => { 
        setSelectedTuning(selectedTuning.filter((e)=>(e.root !== 'E')));
    }


    /* Show and hide instead of generate */
    const styleFrets = (num) => {
        return {
            color: dotedFrets.includes(num) ? "red" : "white",
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

           

            <div className={cx(styles.test)}>
                <h3>Show: </h3>
                <DropdownMenu list={scales} onChange={handleSelectedNote}/>

            </div>
            
            <br/>

            <div className={cx(styles.test)}>
                <h3>Fret: </h3>
                <DropdownMenu list={instrumentArr} onChange={() => console.log("Hallo")} />
                <DropdownMenu list={guitarTuningArr} onChange={() => console.log("Hallo")} />

            </div>
            
            <br/>

            <div>
                <button 
                    style={{padding: 5 + "px", margin: 5 + "px"}}
                    onClick={addString}
                >Add String</button>
                <button 
                    style={{padding: 5 + "px", margin: 5 + "px"}}
                    onClick={() => removeString(0)}
                >Remove String</button>
            </div>

            <br/>
            <br/>

            <div className={cx(styles.boardWrapper)}>
                <div className={styles.board2}>

                    <div className={styles.openStrings}>
                        {selectedTuning.map((element, index) => (
                            <div className={styles.rootNote} key={index}>{element.root}</div>
                        ))}
                    </div>

                    {fretArray().map((indexFret) => (
                        <Fret key={indexFret} style={styleFrets(indexFret)}>

                            {selectedTuning.map((element, indexTuning) => (
                                <Strings note={element.chromatic[indexFret]} key={indexTuning} />
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

function Fret({children, number, notes, style}) {
    return (
        <div className={styles.fret} style={style}>
            {children}
        </div>
    );
}

function Strings({ size, num, note, style}) {
    return (
        <div className={styles.strings} style={style}>
            <div className={styles.note} onClick={() => console.log(note)}>{note}</div>
        </div>
    );
}

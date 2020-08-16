import React, { useState, useEffect } from 'react';

/* import MultiSlider from '../Multipurpose/MultiSlider/MultiSlider'; */
import styles from './Fretboard.module.css';
import DropdownMenu from '../Multipurpose/DropdownMenu/DropdownMenu';

import cx from 'classnames';
import { getChromaticScale } from '../../logic/index';

export default function Fretboard() {

    // Elements for instrument toggle
    const tunings = {
        guitarStandart: [{root: 'E', chromatic: getChromaticScale('E')}, 
        'A', 'D', 'G', 'B', 'E'],
        guitarDropD: ['D', 'A', 'D', 'G', 'B', 'E'],
        guitarOpenD: ['D', 'F#', 'D', 'G', 'B', 'D'] ,

        bassStandart: [  
            {root: 'G', chromatic: getChromaticScale('G')},
            {root: 'D', chromatic: getChromaticScale('D')}, 
            {root: 'A', chromatic: getChromaticScale('A')}, 
            {root: 'E', chromatic: getChromaticScale('E')} 
        ],

        custom: [] 
    }   

    const dotedFrets = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
    const [fretFromTo, setFretFromTo] = useState({from: 1, to: 24});

    const [selectedTuning, setSelectedTuning] = useState(tunings.bassStandart)
    
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

    const handleSelectedNote = (e) => {
        console.log(e);
    }

    const generateFrets = () => {
        const frets = [];
        for (let i = 0; i < 24; i++) {
            frets.push(
                <Fret 
                    key={i} 
                    number={(i+1)}
                    style={styleFrets(i+1)} 
                />);
        }
        return frets;
    }

    /* Show and hide instead of generate */
    const styleFrets = (num) => {
        return {
            color: dotedFrets.includes(num) ? "red" : "white",
            display: (num >= fretFromTo.from && num <= fretFromTo.to) ? "flex" : "none",
        }
    }

    const styleStrings = (num) => {
        console.log(num);
        return {
            top: `calc(45px * ${num})`,
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

           

            <br/>
            
            <DropdownMenu list={['E', 'A', 'D', 'G']} onChange={handleSelectedNote}/>

            <br/>

            <div>
                <button 
                    style={{padding: 5 + "px", margin: 5 + "px"}}
                    onClick={() => console.log("add")}
                >Add String</button>
                <button 
                    style={{padding: 5 + "px", margin: 5 + "px"}}
                    onClick={() => console.log("remove")}
                >Remove String</button>
            </div>

            <br/>
            <br/>

            <div className={cx(styles.boardWrapper)}>
                <div className={styles.board2}>

                    <div className={styles.openStrings}>
                        {selectedTuning.map((element, index) => (
                            <RootNote key={index} note={element.root}/>
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
            {note}
        </div>
    );
}

function RootNote({ note, onChange }) {
    return (
        <input 
            className={styles.rootNote} 
            type="text" 
            defaultValue={note} 
            maxLength="2"
            pattern="[A-G]"
            onChange={onChange} 
        />
    );
}
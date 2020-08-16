import React, { useState, useEffect } from 'react';

/* import MultiSlider from '../Multipurpose/MultiSlider/MultiSlider'; */
import styles from './Fretboard.module.css';

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

    const [shownStrings, setShownStrings] = useState(3);





    
    /* const [fretboardStart, setFretboardStart] = useState(0);
    const [fretboardEnd, setFretboardEnd] = useState(24);
    const [displayedFrets, setDisplayedFrets] = useState(24);

    
    useEffect(() => {
        setDisplayedFrets(Math.abs(fretboardEnd - fretboardStart));
    }, [fretboardStart, fretboardEnd])

    const sliderProps = {
        sliderRange: { min: 0, max: 24 },
        defaultVal: { 
            sliderOne: fretboardStart, 
            sliderTwo: fretboardEnd
        }
    }

    const sliderOne = {
        range: { min: 0, max: 24 },
        minDistance: 0,
        handles: [0, 20],
        width: 300,
        displayVal: false
    }
    const sliderTwo = {
        range: { min: 0, max: 240 },
        minDistance: 1,
        handles: [240],
        width: 200,
        displayVal: true
    }

    const sliderThree = {
        range: { min: 0, max: 240 },
        handles: [0, 200, 400],
        width: 400,
        displayVal: true
    }

    function handleFretboard(value) {
        value.sliderOne ? setFretboardStart(value.sliderOne) : setFretboardEnd(value.sliderTwo);
    }
    function handleFretboardStart(value) {
        setFretboardStart(value);
    }
    function handleFretboardEnd(value) {
        setFretboardEnd(value);
    } */

    /* function generateFrets() {
              
        let placeHolder = [];
        
        for (let i = fretboardStart; i < fretboardEnd; i++) {
            placeHolder.unshift(displayedFrets - i);
        } 
        return placeHolder;
    } */

    const handleOnChange = (e, from) => {
        if (from) {
            setFretFromTo({from: e.target.value, to: fretFromTo.to});
        } else {
            setFretFromTo({from: fretFromTo.from, to: e.target.value});
        }
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

    /* const stringArr = [];
    for (let i = 0; i < strings; i++) {
        stringArr.push(<Strings />);
    } */

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

            {/* <Board>
               
                {generateFrets()}

                {tunings[3].bassStandart.map((note, index) => (
                    <Strings key={index} style={styleStrings(index)} />
                ))}
            </Board>

            <br/>

            <Board>
            {fretArray().map((index) => (
                    <Fret key={index}>
                        {tunings[0].guitarStandart.map((note, index) => (
                            <Strings key={index} style={styleStrings(index)} />
                        ))}
                    </Fret>
                ))}
            </Board> */}

            <br/>
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
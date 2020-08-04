import React, { useState, useEffect } from 'react';

import MultiSlider from '../Multipurpose/MultiSlider/MultiSlider';
import styles from './Fretboard.module.css';

export default function Fretboard() {

    /* ------------ Just for testing here! ------------ */
    // Elements for instrument toggle
    const tunings = [
        { guitarStandart: ['E', 'A', 'D', 'G', 'B', 'E'] },
        { guitarDropD: ['D', 'A', 'D', 'G', 'B', 'E'] },
        { guitarOpenD: ['D', 'F#', 'D', 'G', 'B', 'D'] },

        { bassStandart: ['E', 'A', 'D', 'G']}
    ]
    /* ------------ Just for testing here! ------------ */



    
    const [fretboardStart, setFretboardStart] = useState(0);
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
    }

    function generateFrets() {
        // ! here should also the fret been filled with notes
/*         console.log(displayedFrets);
 */        
        let placeHolder = [];
        
        for (let i = fretboardStart; i < fretboardEnd; i++) {
            placeHolder.unshift(displayedFrets - i);
        } 
        return placeHolder;
    }

    return (
        <div className={styles.fretboard}>
            
            <MultiSlider sliderVal={sliderOne} />

            <MultiSlider sliderVal={sliderTwo} />

            {/* <MultiSlider sliderVal={sliderThree} /> Doesn't work, sets the handle outside the slider */}
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

function Fret({notes}) {
    return (
        <div className={styles.fret}>
            {notes}
        </div>
    );
}
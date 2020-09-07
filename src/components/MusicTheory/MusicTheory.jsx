import React, { useState } from 'react';
import styles from './MusicTheory.module.css';

export default function MusicTheory() {

    const [state, setstate] = useState(0);

    return (
        <div>
            <a className="btn" href="chords-in-key">ChordsInKey</a>
            <a className="btn" href="circle-of-fifths">CircleOfFifths</a>

        </div>
    )
}

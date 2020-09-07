import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import cx from 'classnames';

import fretboard from '../../images/fretboard.jpeg';
import musicTheory from '../../images/notation.jpeg';
import time from '../../images/time.jpg';
import typewriter from '../../images/typewriter.jpg';


export default function Home() {

    useEffect(() => {
        document.title = "I IV V - Home"
    }, []);

    return (
        <div className="content">
            <h1 className={styles.home}>Welcome to I-IV-V</h1>

            <div className={styles.cardWrapper}>
                    
                <Link to="/music-theory/chords-in-key" className={cx("card", styles.card, styles.card1)} href="music-theory/circle-of-fifths">
                    <img src={musicTheory} alt="Music-Theory"/>
                    <h3>Music Theory</h3>
                    <p>Circle-of-Fifths & Key-Picker</p>
                    {/* <span>Photo by <a href="https://unsplash.com/@marius?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Marius Masalar</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> */}
                </Link>
                
                <Link to="/music-theory/chords-in-key" className={cx("card", styles.card)} href="fretboard">
                    <img src={fretboard} alt="Fretboard"/>
                    <h3>Fretboard</h3>
                    <p>Show scales</p>
                    {/* <span>Photo by <a href="https://unsplash.com/@caiohenriquesilva?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Caio Silva</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> */}
                </Link>

                <Link to="/music-theory/chords-in-key" className={cx("card", styles.card)} href="fretboard">
                    <img src={time} alt="Fretboard"/>
                    <h3>Metronom</h3>
                    <p></p>
                    {/* <span>Photo by <a href="https://unsplash.com/@nooryounis?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">noor Younis</a> on <a href="https://unsplash.com/s/photos/time?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> */}
                </Link>

            </div>     
        </div>
    )
}

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import cx from 'classnames';
import fretboard from '../../images/fretboard.jpeg';
import musicTheory from '../../images/notation.jpeg';
// import time from './images/time.jpg';
// import typewriter from './images/typewriter.jpg';

export default function Home({ changeSelNavIcon, lang }) {

    useEffect(() => {
        document.title = `${lang.str.ivv} - ${lang.str.home}`;
        changeSelNavIcon('home');
    }, []);

    const homeElements = [
        { address: '/music-theory', 
          img: musicTheory, 
          label: lang.str.music_theory, 
          text: lang.descr.music_theory, 
          onClick: () => changeSelNavIcon('music_theory') },
        { address: '/fretboard', 
          img: fretboard, 
          label: lang.str.fretboard, 
          text: lang.descr.fretboard, 
          onClick: () => changeSelNavIcon('fretboard')},
        // {address: '/metronom', img: time, label: 'Metronom', text: 'Rythm Practise', onClick: (el) => console.log(el)},
      ];

    return (
        <div className="content">
            <h1 className={styles.home}>{lang.str.welcome}</h1>

            <div className={styles.cardWrapper}>
                {homeElements.map((element, index) => (
                    <Link 
                        to={element.address}
                        key={index}
                        className={cx("card", styles.card, styles.card1)} >
                    
                        <div onClick={element.onClick}>
                            <img src={element.img} alt="img"/>
                            <h3>{element.label}</h3>
                            <p>{element.text}</p>
                        </div>
                    </Link>
                ))}
            </div>
            
            {/* Music-Theory <span>Photo by <a href="https://unsplash.com/@marius?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Marius Masalar</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> */}
            {/* Fretboard <span>Photo by <a href="https://unsplash.com/@caiohenriquesilva?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Caio Silva</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> */}
            {/* Metronom <span>Photo by <a href="https://unsplash.com/@nooryounis?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">noor Younis</a> on <a href="https://unsplash.com/s/photos/time?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span> */}
        </div>
    );
}

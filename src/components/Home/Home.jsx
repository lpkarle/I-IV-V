import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import cx from 'classnames';

export default function Home({ elements }) {

    useEffect(() => {
        document.title = "IV V - Home";
    }, []);

    return (
        <div className="content">
            <h1 className={styles.home}>Welcome to I-IV-V</h1>

            <div className={styles.cardWrapper}>
                {elements.map((element, index) => (
                    <Link 
                        to={element.address}
                        key={index}
                        className={cx("card", styles.card, styles.card1)} >
                    
                        <div onClick={() => element.onClick(element.label)}>
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

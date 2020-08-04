import React, { useState, useEffect, Children } from 'react'
import styles from './CircleOfFifths.module.css';

import { getCircleOfFifths } from '../../logic/index';

export default function CircleOfFifths() {

    const circleNotes = getCircleOfFifths();
    console.log(circleNotes)

    useEffect(() => {
        positionNotes();
        rotateSeperator();
    }, []);

    const positionNotes = () => {  

        let radiusOutside = '20rem', //distance from center
            radiusInside = '15rem', //distance from center
            radiusInsideInside = '10rem',
            startOutside = -90, //shift start from 0
            startInside = -180,
            startInsideInside = 120,
            elementsOutside = document.querySelectorAll('.circleNoteOutside'),
            elementsInside = document.querySelectorAll('.circleNoteInside'),
            elementsInsideInside = document.querySelectorAll('.circleNoteInsideInside'),
            numberOfElements = elementsOutside.length, //adj for even distro of elements when not full circle
            slice = 360 / numberOfElements;

        //console.log(elements);
        
        elementsOutside.forEach((element, index) => {
            let rotate = slice * index + startOutside,
                rotateReverse = rotate * -1;
            
            element.style.transform = `rotate( ${rotate}deg ) translate( ${radiusOutside} ) rotate( ${rotateReverse}deg )`;
        });
        elementsInside.forEach((element, index) => {
            let rotate = slice * index + startInside,
                rotateReverse = rotate * -1;
            
            element.style.transform = `rotate( ${rotate}deg ) translate( ${radiusInside} ) rotate( ${rotateReverse}deg )`;
        });
        elementsInsideInside.forEach((element, index) => {
            let rotate = slice * index + startInsideInside,
                rotateReverse = rotate * -1;
            
            element.style.transform = `rotate( ${rotate}deg ) translate( ${radiusInsideInside} ) rotate( ${rotateReverse}deg )`;
        });
            
    }

    const rotateSeperator = () => {
        let startDeg = 15,
            elements = document.querySelectorAll('.seperator'),
            numberOfElements = elements.length, //adj for even distro of elements when not full circle
            slice = 360 / numberOfElements;

            console.log(elements);

        elements.forEach((element, index) => {
            let rotate = index * 30 + startDeg;
            element.style.transform = `rotate( ${rotate}deg )`
        });
    }
    
    return (
        <div className={styles.circleOfFifths}>
            <h1>CircleOfFifths</h1>

            <div className={styles.circleWrapper}>
            <div className={styles.wrapperCircle}></div>

                {circleNotes.map((note, index) => (
                        <Seperator 
                            key={index} 
                            note={note}
                            classNameSeperator="seperator" />
                ))}

                <div className={styles.outerCircle}>
                    {circleNotes.map((note, index) => (
                        <CircleNote 
                            key={index} 
                            note={note}
                            classNameCircle="circleNoteOutside"/>
                    ))}
                </div>

                <div className={styles.innerCircle}>
                    {circleNotes.map((note, index) => (
                        <CircleNote 
                            key={index} 
                            note={note}
                            classNameCircle="circleNoteInside" />
                    ))}
                </div>

                <div className={styles.innerInnerCircle}>
                    {circleNotes.map((note, index) => (
                        <CircleNote 
                            key={index} 
                            note={note}
                            classNameCircle="circleNoteInsideInside" />
                    ))}
                </div>
            </div>

            <div >Test</div>
        </div>
    )
}

function Seperator ({classNameSeperator}) {

    const seperatorStyle = () => {
        return {
            height: '45rem',
            width: '3px',
            backgroundColor: 'whitesmoke',
            borderRadius: '5px',
            border: 'none',
            zIndex: 1,
        }
    }

    return ( 
        <div style={seperatorStyle()} className={classNameSeperator}></div>
    );
}

function CircleNote({ note, classNameCircle }) {

    const [hover, setHover] = useState(false);

    const noteStyle = () => {
        return {
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '4.5rem',
            width: '4.5rem',
            /* border: 'turquoise solid 3px', */
            backgroundColor: 'transparent',
            borderRadius: '50%',
            /* transform: 'rotate(30deg)' */ // ?
            /* width: 0, 
            height: 0,
            borderLeft: '5rem solid transparent',
            borderRight: '5rem solid transparent',
            borderTop: '7rem solid red',
            borderRadius: '50%', */
        }
    }

    return (
        <div className={classNameCircle} style={noteStyle()}>
            <div className={styles.test}>{note}</div>
        </div>
    );
}
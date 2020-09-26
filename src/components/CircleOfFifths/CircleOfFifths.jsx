import React, { useState, useEffect } from 'react';
import styles from './CircleOfFifths.module.css';
import {ReactComponent as Circle} from '../../images/svgs/CircleOfFifths/circle_of_fifths.svg';
import { LegendVoicing, ResultingChords } from '../Multipurpose/';
// import { getScaleAndCommonProg } from '../../logic/';

export default function CircleOfFifths() {

    const [selectedEl, setSelectedEl] = useState({index: 0, voicing: 'Major', note: 'C'});

    useEffect(() => {
        document.title = "I IV V - Circle of Fifths";
        initEventListener();
    }, []);

    useEffect(() => {
        setActive();
    }, [selectedEl])

    const indexRange = (index) => {
        const res = {left: 0, right: 0};
        if (index > 0 && index < 11) {
            res.left = index - 1;
            res.right = index + 1;
        } 
        if (index === 0) {
            res.left = 11;
            res.right = index + 1;
        }
        if (index === 11) {
            res.left = index - 1;
            res.right = 0
        }
        return res;
    }

    const initEventListener = () => {
        const notesMajor = document.getElementById("major").childNodes;
        const notesMinor = document.getElementById("minor").childNodes;
        const notesDim = document.getElementById("dim").childNodes;
       
        notesMajor.forEach((el, i) => {
            el.addEventListener("click", () => {
                setSelectedEl({index: i, voicing: 'Major', note: el.id});
            });
        });
        notesMinor.forEach((el, i) => {
            el.addEventListener("click", () => {
                setSelectedEl({index: i, voicing: 'Minor', note: el.id});
            });
        });
        notesDim.forEach((el, i) => {
            el.addEventListener("click", () => {
                setSelectedEl({index: i, note: el.id});
            });
        });
    }

    const setActive = () => {
        const notesMajor = document.getElementById("major").childNodes;
        const notesMinor = document.getElementById("minor").childNodes;
        const notesDim = document.getElementById("dim").childNodes;
        const range = indexRange(selectedEl.index);

        notesMajor.forEach((element, index) => {
            if (index === range.left || index === selectedEl.index || index === range.right) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });

        notesMinor.forEach((element, index) => {
            if (index === range.left || index === selectedEl.index || index === range.right) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });

        notesDim.forEach((element, index) => {
            if (index === selectedEl.index) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });
    }

    return (
        <div className={styles.circleOfFifths}>
            <Circle className={styles.circle}/>
            {/* <ResultingChords chordsAndProgressions={getScaleAndCommonProg(selectedEl.voicing, selectedEl.note)}/> */}
            <LegendVoicing/>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import styles from './CircleOfFifths.module.css';
import {ReactComponent as Circle} from '../../images/svgs/CircleOfFifths/fifths.svg';

export default function CircleOfFifths() {

    const [selectedEl, setSelectedEl] = useState(0);

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
        const notesMajor = document.getElementById("circleMajor").childNodes;
        const notesMinor = document.getElementById("circleMinor").childNodes;
        const notesDim = document.getElementById("circleDim").childNodes;
       
        notesMajor.forEach((element, index) => {
            element.addEventListener("click", () => {
                setSelectedEl(index);
            });
        });
        notesMinor.forEach((element, index) => {
            element.addEventListener("click", () => {
                setSelectedEl(index);
            });
        });
        notesDim.forEach((element, index) => {
            element.addEventListener("click", () => {
                setSelectedEl(index);
            });
        });
    }

    const setActive = () => {
        const notesMajor = document.getElementById("circleMajor").childNodes;
        const notesMinor = document.getElementById("circleMinor").childNodes;
        const notesDim = document.getElementById("circleDim").childNodes;

        const range = indexRange(selectedEl);

        notesMajor.forEach((element, index) => {
            if (index === range.left || index === selectedEl || index === range.right) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });

        notesMinor.forEach((element, index) => {
            if (index === range.left || index === selectedEl || index === range.right) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });

        notesDim.forEach((element, index) => {
            if (index === selectedEl) {
                element.classList.add("active");
            } else {
                element.classList.remove("active");
            }
        });
    }

    return (
        <div className={styles.circleOfFifths}>
            <h1>CircleOfFifths</h1>
            <Circle className={styles.circle}/>
        </div>
    );
}
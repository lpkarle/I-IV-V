import React, { useState, useEffect } from 'react';
import styles from './CircleOfFifths.module.css';
import {ReactComponent as Circle} from '../../images/svgs/CircleOfFifths/circle_of_fifths.svg';
import { CardWrapper, ResultingChords } from '../Multipurpose';
import { circleOfFifthsSharpsAndFlats } from '../../logic/musicConst';
import { getScaleAndCommonProg } from '../../logic';

export default function CircleOfFifths({ lang }) {

    const [selectedEl, setSelectedEl] = useState({index: 0, note: 'C'});

    useEffect(() => {
        document.title = `${lang.str.ivv} - ${lang.str.music_theory} - ${lang.str.circle_of_fifths}`;
        initEventListener();
    }, [lang]);

    useEffect(() => {
        setActive();
        console.log(selectedEl.note);
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

    const clearAccidentals = (note) => {
        if (note.length === 1) {
            return note;
        } else {
            if (note.includes('b')) {
                return (note[0] + '♭');
            } else {
                return (note[0] + '♯');
            }
        }
    }

    const initEventListener = () => {
        const notesMajor = document.getElementById("major").childNodes;
        const notesMinor = document.getElementById("minor").childNodes;
        const notesDim = document.getElementById("dim").childNodes;

        notesMajor.forEach((el, i) => {
            el.addEventListener("click", () => {
                console.log(el.childNodes);
                setSelectedEl({index: i, note: clearAccidentals(el.id)});
            });
        });
        notesMinor.forEach((el, i) => {
            el.addEventListener("click", () => {
                setSelectedEl({index: i, note: clearAccidentals(notesMajor[i].id)});
            });
        });
        notesDim.forEach((el, i) => {
            el.addEventListener("click", () => {
                setSelectedEl({index: i, note: clearAccidentals(notesMajor[i].id)});
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
            <SharpAndFlatAmount sharpsAndFlats={circleOfFifthsSharpsAndFlats} lang={lang}/>
            <CardWrapper label={lang.str.res_maj_chords}>
                <ResultingChords chordsAndProgressions={getScaleAndCommonProg('Major', selectedEl.note)}/>
            </CardWrapper>
            <CardWrapper label={lang.str.res_min_chords}>
                <ResultingChords chordsAndProgressions={getScaleAndCommonProg('Minor', selectedEl.note)}/>
            </CardWrapper>
        </div>
    );
}

function SharpAndFlatAmount({ sharpsAndFlats, lang }) {
    return (
        <div className={styles.sharpAndFlatAmount}>
            <AmountTable label={lang.str.sharp_keys} content={sharpsAndFlats.sharps} startIndex={1} lang={lang}/>
            <AmountTable label={lang.str.flat_keys} content={sharpsAndFlats.flats} startIndex={0} lang={lang}/> 
        </div>
    );
}

function AmountTable({ label, content, startIndex, lang }) {

    const amount = (list, from, to) => {
        let amount = '';
        for (let i = from; i <= to; i++) {
            amount += (list[i] + ' ');
        }
        return amount;
    }

    return (
        <CardWrapper label={label}>
            {<table>
                <tbody>
                    <tr>
                        <th>{lang.str.key}</th>
                        <th>{lang.str.amount}</th>
                        <th>{lang.str.notes}</th>
                    </tr>
                    {content.keys.map((key, index) => (
                        <tr key={index}>
                            <td>{key}</td>
                            <td>{index}</td>
                            <td>{ key === 'C' ? null : amount(content.notes, startIndex, index)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </CardWrapper>
    );
}

import React, { useState, useEffect } from 'react';
import cx from 'classnames';

import styles from './ChordsInKey.module.css';
import Dropdown from '../Multipurpose/Dropdown/Dropdown';

import { getTableNotes, availableVoicings, getChordsInKey } from '../../logic/';
import NotePicker from '../Multipurpose/NotePicker/NotePicker';

export default function ChordsInKey() {

    const allKeys = getTableNotes();
    const dropdownItems = () => {
        let ddItems = [];
        for (let i = 0; i < availableVoicings.length; i++) {
            ddItems.push({
                value: i,
                label: availableVoicings[i]
            });
        };
        return ddItems;
    }


    /* Selectable UI Components */
    const [selectedKey, setSelectedKey] = useState('A');
    const [selectedVoicing, setSelectedVoicing] = useState('major');
    const [scale, setScale] = useState(getChordsInKey(selectedKey, selectedVoicing).scale);

    const [chords, setChords] = useState(getChordsInKey(selectedKey, selectedVoicing).chords);
    const [progressions, setProgressions] = useState(getChordsInKey(selectedKey, selectedVoicing).res);
    const [dropdownItem, setDropdownItem] = useState(undefined);

    function handleDropdown(index) {
        // This is pretty ugly
        setSelectedVoicing(dropdownItems()[index].label.toString().toLowerCase());
    }

    const handleChangeVoicing = (voicing) => {
        setSelectedVoicing(voicing);
    }

    useEffect(() => {
        setScale(getChordsInKey(selectedKey, selectedVoicing).scale);
        setChords(getChordsInKey(selectedKey, selectedVoicing).chords);
        setProgressions(getChordsInKey(selectedKey, selectedVoicing).res);
    }, [selectedKey, selectedVoicing])


    /* ---------------- Styles ---------------- */
    function styleSelectedKey(key) {
        return {
            border: selectedKey === key ?
                'var(--accent-color) solid 8px' : null
        }
    }

    const styleVoicingBtn = (voicing) => {
        switch (voicing) {
            case 'major':
                return {
                    background: 'var(--major-color)',
                    opacity: selectedVoicing === voicing ? 1 : .6
                }
            case 'minor':
                return {
                    background: 'var(--minor-color)',
                    opacity: selectedVoicing === voicing ? 1 : .6
                }
            default:
                return null
        }
    }

    function styleChordVoicing(chordVoicing) {
        if (chordVoicing.includes('°')) {
            return { border: 'var(--dim-color) solid 3px' };
        }
        if (chordVoicing === chordVoicing.toString().toUpperCase()) {
            return { border: 'var(--major-color) solid 3px' };
        }
        if (chordVoicing === chordVoicing.toString().toLowerCase()) {
            return { border: 'var(--minor-color) solid 3px' };
        }
    }


    return (
        <div className="content">
            <h1>Chords in a Key</h1>
            <div className={styles.chordsInKey}>
                <div className={styles.left}>

                    <NotePicker 
                        selectedNote={selectedKey} 
                        onClick={(note) => setSelectedKey(note)}/>

                    <KeyPicker>
                        {allKeys.map((keyName, index) => (
                            <Key keyName={keyName}
                                key={index}
                                style={styleSelectedKey(keyName)}
                                onClick={() => setSelectedKey(keyName)}
                            />
                        ))}
                    </KeyPicker>

                    <div>
                        <h2>Select Voicing:</h2>
                        <div className={cx("card", styles.voicingPicker)}>

                            <button className={cx(styles.voicingBtn, "btn")} style={styleVoicingBtn('major')} onClick={() => handleChangeVoicing('major')}>Major</button>
                            <button className={cx(styles.voicingBtn, "btn")} style={styleVoicingBtn('minor')} onClick={() => handleChangeVoicing('minor')}>Minor</button>

                            <Dropdown data={dropdownItems()}
                                value={dropdownItem}
                                onChange={handleDropdown} />
                        </div>
                    </div>

                    <ResultingChords >
                        {scale.map((note, index) => (
                            <ChordAndVoicing
                                chordNote={note}
                                voicing={chords[index]}
                                key={index}
                                style={styleChordVoicing(chords[index][0])}
                            />
                        ))}
                    </ResultingChords>
                </div>

                <div className={styles.right}>
                    <CommonProgressions>
                        {progressions.map((progression, index) => (
                            <Progression
                                progression={progression}
                                key={index}
                                style={styleChordVoicing} />
                        ))}
                    </CommonProgressions>
                </div>
            </div>
        </div>
    )
}


/* -------- Select the Key -------- */
function KeyPicker({ children }) {
    return (
        <>
            <h2>Pick a Key:</h2>
            <div className={cx("card", styles.keys)}>
                {children}
            </div>
        </>
    );
}

function Key({ style, onClick, keyName }) {

    const handleClick = (event) => {
        onClick(event.target.innerHTML);
    }

    return (
        <div className={styles.key}
            style={style}
            onClick={handleClick}>
            {keyName}
        </div>
    );
}


/* -------- Chords in the Key -------- */
function ResultingChords({ children }) {
    return (
        <>
            <h2>Resulting Chords:</h2>
            <div className={cx(styles.resultingChords, "card")}>
                {children}
            </div>
        </>
    );
}

function ChordAndVoicing({ chordNote, voicing, style }) {

    return (
        <div className={styles.chordAndVoicing}>
            <div className={styles.chordNote} style={style}>{chordNote}</div>
            <div className={styles.voicing}
            >{voicing[0]}</div>
        </div>
    );
}


/* ---- Common Progessions ---- */
function CommonProgressions({ children }) {
    return (
        <>
            <h2>Common Progressions:</h2>
            <div className={cx("card", styles.commonProgressions)}>
                {children}
            </div>
        </>
    );
}

function Progression({ progression, style }) {
    return (
        <div className={styles.commonProgressions}>
            <div className={styles.progression}>

                <div className={styles.progressionNum}>
                    {progression.map((prog, index) => (
                        <div className={styles.chordNumber}
                            key={index}
                            /* style={style(prog.num)} */>
                            {prog.num}
                        </div>
                    ))}:
                </div>

                <div className={styles.progressionChords}>
                    {progression.map((prog, index) => (
                        <div className={styles.chordNote}
                            key={index}
                            style={style(prog.num)}>
                            {prog.note}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
import * as Scale from './scales';
import * as Chords from './chords';
import { instruments, tunings } from './tuning';


/* ------------ Scales ------------ */
/**
 * Returns all available scales (for dropdown)
 */
const getScales = () => {
    return Scale.availableScales;
}

/**
 * Returns the Chromatic-Scale of a given note (Fretboard 24 frets)
 * @param {Char} accidental 
 * @param {String} note 
 */
const getChromaticScale = (accidental, note) => {
    let chromScale = Scale.getChromaticScale(accidental, note);
    let result = [];
    for (let i = 0; i < 2; i++) {
        chromScale.forEach(element => {
            result.push(element);
        });
    }
    result.push(note);
    return result;
}

/**
 * Returns an object which contains the scale, chords and related progressions
 * @param {String} voicing 
 * @param {Voicing} note 
 */
const getScaleAndCommonProg = (voicing, note) => {

    const result = {scale: getScale(voicing, note), chords: [], progressions: []};

    Chords.chords.forEach(element => {
        if (element.name === voicing) {
            result.chords = element.chords;
            result.progressions = element.progressions;
            return;
        }
    });
    return result;
}

/**
 * Returns a scale for a given note & voicing
 * @param {String} voicing 
 * @param {String} note 
 */
export const getScale = (voicing, note) => {
    let scale = {intervals: [], notes: []};
    
    Scale.scales.forEach(element => {
        if (element.name === voicing) {
            scale.intervals = element.intervals;
            scale.notes = Scale.getHeptatonicScale(voicing, note);
            return;
        } 
    });
    return scale;
}


/* ------------ Tunings ------------ */
/**
 * Returns all available instruments (for tuning-dropdown)
 */
const getInstruments = () => {
    return instruments;
}

/**
 * Returns all available tunings by instrument (dropdown)
 * @param {String} instrument 
 */
const getTuningNames = (instrument) => {
    const tuningNames = [];
    const tuningByInst = tunings[instrument.toLowerCase()];

    tuningByInst.forEach(element => {
        tuningNames.push(element.name);
    });
    return tuningNames;
}

/**
 * Returns the actual tuning
 * @param {String} instrument 
 * @param {String} name 
 * @param {Boolean} stringOrder 
 * @param {Array} toShow
 */
const getTuningByName = (instrument, name, stringOrder, toShow) => {
    let accidental = 0;

    toShow.forEach(note => {
        if (note.includes('♯')) { 
            console.log("Yes" + note);
            accidental = 1;
            return;
        }
        if (note.includes('♭')) { 
            console.log("Yes" + note);
            accidental = 2;
            return;
        }
    });
    console.log(toShow, accidental);


    const t = tunings[instrument.toLowerCase()];
    let a = {name: '', notes: []};

    t.forEach(tuning => {
        if (tuning.name === name) {
            a.name = name;
            
            tuning.notes.forEach(note => {
                //console.log(getChromaticScale(accidental, note));
                if (stringOrder) {
                    a.notes.push(getChromaticScale(accidental, note));
                } else {
                    a.notes.unshift(getChromaticScale(accidental, note));
                }
            });            
        }
    });
    return a;
}

/* ------------ Chords ------------ */
/**
 * Returns all available chords (for dropdown)
 */
const getChords = () => {
    return Chords.availableChords;
}

/**
 * Returns chord-notes/intervals by a given note & voicing
 * @param {String} voicing 
 * @param {Voicing} note 
 */
export const getChord = (voicing, note) => {
    let chord = {intervals: [], notes: []};
    const chords = Chords.chords;

    chords.forEach(element => {
        if (element.name === voicing) {
            chord.intervals = element.intervals;
            chord.notes = Chords.getChordNotes(voicing, note);
            return;
        } 
    });
    return chord;
}


export {
    getScales,
    getChromaticScale,
    getScaleAndCommonProg,

    getInstruments,
    getTuningNames,
    getTuningByName,
    getChords,
}
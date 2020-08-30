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
 * Returns 0 -> natural, 1 -> sharp, 2 -> flat
 * @param {Array} scale 
 */
export const getAccidental = (scale) => {
    let accidental = 0;
    scale.forEach(note => {        
        if (note.includes('♯')) { return accidental = 1; }
        if (note.includes('♭')) { return accidental = 2; }
    });
    return accidental;
}

/**
 * Returns the actual tuning
 * @param {String} instrument 
 * @param {String} name 
 * @param {Boolean} stringOrder 
 * @param {Array} scale
 */
const getTuningByName = (instrument, name, stringOrder, scale) => {
    const accidental = getAccidental(scale);
    const tuningByInst = tunings[instrument.toLowerCase()];
    let result = {name: '', notes: []};

    tuningByInst.forEach(tuning => {
        if (tuning.name === name) {
            result.name = name;
            
            tuning.notes.forEach(note => {
                if (stringOrder) {
                    result.notes.push(getChromaticScale(accidental, note));
                } else {
                    result.notes.unshift(getChromaticScale(accidental, note));
                }
            });            
        }
    });

    if (scale[0] === 'B♭') {
        result.notes.forEach(chromScale => {
            for (let i = 0; i < chromScale.length; i++) {
                if (chromScale[i] === 'C') {
                    chromScale[i] = 'B♭';
                }
            }
        });
    }
    return result;
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
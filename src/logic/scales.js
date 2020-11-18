import {notes, enharmonicNotes, theoreticalScales} from './musicConst.js';
import * as MusicConst from './musicConst.js';


const heptatonicScales = ['Major', 'Minor'];
const allScales = ['Major', 'Minor', 'Major Pentatonic', 'Minor Pentatonic'];

const scales = [
    {name: 'Major', intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'], steps: [2, 2, 1, 2, 2, 2, 1]},
    {name: 'Minor', intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'], steps: [2, 1, 2, 2, 1, 2, 2]},
    {name: 'Major Pentatonic', intervals: ['P1', 'M2', 'M3', 'P5', 'M6'], steps: [0, 1, 3, 4, 5]},
    {name: 'Minor Pentatonic', intervals: ['P1', 'm3', 'P4', 'P5', 'm7'], steps: [0, 2, 3, 4, 6]},
];
const THEORETICAL_PLACEHOLDER = ['-', '-', '-', '-', '-', '-', '-'];


/* ------------ Helper Functions ------------ */
/**
 * Returns the index of a given note from the note array.
 * @param {String} note 
 */
const getCurrentNoteIndex = (note) => {
    // containes a accidental
    if (note.length > 1) {
        
        let indexNatural = notes.indexOf(note.substring(0, 1));

        if (note.includes(MusicConst.FLATSYM)) {
            if (indexNatural === 0) {
                return notes.indexOf(notes.length-1);
            } else {
                return indexNatural -1;
            }
        } else {
            return indexNatural + 1;
        }
    } 
    return notes.indexOf(note);
}

/**
 * Returns the distance/step between two given notes
 * @param {String} note1 
 * @param {String} note2 
 */
const getNoteDistance = (note1, note2) => {
    return Math.abs(MusicConst.naturalNotes.indexOf(note1) - 
                    MusicConst.naturalNotes.indexOf(note2));
}

/**
 * 
 * @param {String} scale 
 */
const clearScaleFromAccidents = (scale) => {
    let tmpScale = [];     
    let natPredecessor;
    let successor;
    let noteDistance1;
    let noteDistance2;
    tmpScale[0] = scale[0];

    for (let i = 0; i < scale.length - 1; i++) {        
        natPredecessor = tmpScale[i].substr(0, 1);
        successor = scale[i + 1];
        
        noteDistance1 = getNoteDistance(natPredecessor, successor[0]);
        noteDistance2 = -1;
        
        if (successor.length > 1) {
           
            noteDistance2 = getNoteDistance(natPredecessor, successor[3]);
           
            if (noteDistance1 === 1 || noteDistance1 === 6) {
                tmpScale.push(successor[0] + MusicConst.SHARPSYM); 
            }
            if (noteDistance2 === 1 || noteDistance2 === 6) {
                tmpScale.push(successor[3] + MusicConst.FLATSYM);
            } 
        } else {    
            if (noteDistance1 === 1 || noteDistance1 === 6) { 
                tmpScale.push(successor);
            } 
             else{  
                tmpScale.push(enharmonicNotes['note' + successor]);
            }
        }
    }
    return tmpScale;
}

/**
 * Returns true if the scale is only theoratical
 * @param {String} voicing 
 * @param {String} note 
 */
const scaleIsTheoratical = (voicing, note) => {
    if (theoreticalScales[voicing.toLowerCase()].includes(note))
        return true;
}


/* ------------ Export Functions ------------ */

/**
 * Returns the chromatic scale with the obtions: 
 * Accidentals: 0 -> #/b    (unformatted)
 *              1 -> #      (ascending)
 *              2 -> b      (descending)
 * @param { Number } accidental
 * @param { String } note 
 */
const getChromaticScale = (accidental, note) => {
    let currentNote = getCurrentNoteIndex(note);
    let chromScale = [];

    for (let i = 0; i < notes.length; i++) {

        if (currentNote === notes.length) {
            currentNote = 0;
        } 

        chromScale.push(notes[currentNote]);
        currentNote++;
    }

    if (accidental === 0) {
        return chromScale;
    }

    for (let i = 0; i < chromScale.length; i++) {
        let noteToCut = chromScale[i];
        
        if (noteToCut.length > 1) {
            if (accidental === 1) {
                chromScale[i] = noteToCut.substr(0, 2);
            } else {
                chromScale[i] = noteToCut.substr(3, 5);
            }
        }
    }
    return chromScale;   
}

/**
 * Returns a 7 note scale by note and voicing
 * 
 * @param {String} voicing 
 * @param {String} note 
 */
const getHeptatonicScale = (voicing, note) => {

    if (scaleIsTheoratical(voicing, note))
        return THEORETICAL_PLACEHOLDER;

    const noteAmount = 7;
    let currentNote = getCurrentNoteIndex(note);

    let steps = [];         
    let scale = [];

    scales.forEach(element => {
        if (element.name === voicing) {
            steps = element.steps;
            return;
        } 
    });

    for (let i = 0; i < noteAmount; i++) {
        scale.push(notes[currentNote]);
        currentNote += steps[i];
        
        if (currentNote === notes.length) {
            currentNote = 0;
        }
        
        if (currentNote > notes.length) {
            currentNote = 1;
        }        
    }
    
    scale[0] = note;
    scale = clearScaleFromAccidents(scale);
    return scale;
}

const getPentatonicScale = (voicing, note) => {
    let voicingCleared = voicing;
    if (voicing.includes(' ')) { 
        voicingCleared = voicing.substr(0, voicing.indexOf(' '))
    }

    if (scaleIsTheoratical(voicingCleared, note)) {
        return THEORETICAL_PLACEHOLDER;
    }

    const parentScale = getHeptatonicScale(voicingCleared, note);
    let steps = [];
    scales.forEach(element => {
        if (element.name === voicing) {
            steps = element.steps;
        }
    });

    let scale = [];

    for (let i = 0; i < steps.length; i++) {
        scale[i] = parentScale[steps[i]];
    }

    if (voicingCleared === 'Major') { // m3
        scale[2] = getHeptatonicScale(voicingCleared, note)[2];
    }

    return scale;
}

export {
    heptatonicScales,
    allScales, 
    scales,
    getChromaticScale,
    getHeptatonicScale,
    getPentatonicScale
}
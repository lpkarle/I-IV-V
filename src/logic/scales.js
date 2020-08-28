import {notes, notesAll, enharmonicNotes, theoreticalScales} from './musicConst.js';
import * as MusicConst from './musicConst.js';

export const availableScales = ['Major', 'Minor'];
export const scales = [
    {name: 'Major', intervals: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7', 'P8'], steps: [0, 2, 2, 1, 2, 2, 2, 1]},
    {name: 'Minor', intervals: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7', 'P8'], steps: [0, 2, 1, 2, 2, 1, 2, 2]},

];

const minorScale = ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7', 'P8'];
const THEORETICAL_PLACEHOLDER = ['-', '-', '-', '-', '-', '-', '-'];

// 2 whole step, 1 half
const stepsMajor = [2, 2, 1, 2, 2, 2, 1];
const stepsMinor = [2, 1, 2, 2, 1, 2, 2];

/* ------------ Helper Functions ------------ */

/**
 * Returns the index of a given note from the note array.
 * 
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
 * 
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
    
    let tmpScale = [];      // ! evtl noch ändern

    // hole natürlichen Vorgänger
    let natPredecessor;
    
    // hole nachfolger
    let successor;

    // Hole Noten distanz zwischen erter und folgenote
    let noteDistance1;

    // Initialisiere die 2te Folgenote mit -1 
    let noteDistance2;

    tmpScale.push(scale[0]);
    
    
    for (let i = 0; i < scale.length - 1; i++) {        //! Var declaration unschön

        
        natPredecessor = tmpScale[i].substr(0, 1);
        successor = scale[i + 1];
        
        noteDistance1 = getNoteDistance(natPredecessor, successor[0]);
        noteDistance2 = -1;
        
        
        // initialisiere Distance2 wenn die länge von successor > 1     //! Fall 1: Nachvolger > 1
        if (successor.length > 1) {
           
            noteDistance2 = getNoteDistance(natPredecessor, successor[3]);
           
            if (noteDistance1 === 1 || noteDistance1 === 6) {
                tmpScale.push(successor[0] + MusicConst.SHARPSYM); 
            }
            if (noteDistance2 === 1 || noteDistance2 === 6) {
                tmpScale.push(successor[3] + MusicConst.FLATSYM);
            } 
        } else {    //! Fall 2: Einzelne Note C, D....
            
            // Wenn der Nachfolger einzelnote ist aber nicht den Abstand 1 hat muss es Accidental sein
            if (noteDistance1 === 1 || noteDistance1 === 6) { // Abstand 1 
                tmpScale.push(successor);
            } 
             else{  
                tmpScale.push(enharmonicNotes['note' + successor]);
            }
        }
    }

    // TODO Theoratical Scales 

    return tmpScale;
}

const scaleIsTheoratical = (type, note) => {
    if (type === 'major') 
        if (theoreticalScales.major.includes(note))
            return true;

    if (type === 'minor') 
        if (theoreticalScales.minor.includes(note))
            return true;
}


/* ------------ Export Functions ------------ */

/**
 * Returns the chromatic scale with the obtions: 
 * Accidentals: 0 -> #/b    (unformatted)
 *              1 -> #      (ascending)
 *              2 -> b      (descending)
 * @param { int } accidental
 * @param { string } note 
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
 * @param {String} type 
 * @param {String} note 
 */
const getHeptatonicScale = (type, note) => {

    if (scaleIsTheoratical(type, note))
        return THEORETICAL_PLACEHOLDER;

    const noteAmount = 7;       // ????            
    let currentNote = getCurrentNoteIndex(note);

    let scaleType = [];         
    let scale = [];

    switch (type) {     // ! outsource
        case 'major':
            scaleType = stepsMajor;
            break;
        case 'minor':
            scaleType = stepsMinor;
            break;
        default:
            break;
    }

    for (let i = 0; i < noteAmount; i++) {

        // hole derzeitige Note aus noten array und speichere in scale
        scale.push(notes[currentNote]);

        // erhöhe die currentNote um den Schritt im Scale-Muster (halb ganzschritt)
        currentNote += scaleType[i];
        
        // Wenn currentNote genau 12 ist -> nächste Note 0 -> A (War halbschritt)
        if (currentNote === notes.length) {
            currentNote = 0;
        }
        
        // Wenn current Note > 12 -> bei index 1 (War ganzschritt)
        if (currentNote > notes.length) {
            currentNote = 1;
        }        
    }
    
    // replace the first one with the input C# / Db -> C#
    scale[0] = note;

    // clear out accidentals
    scale = clearScaleFromAccidents(scale);
    
    return scale;
}


const getCircleOfFifths = () => {
    let circle = [];
    let cCromatic = getChromaticScale(0, 'C');

    let i = 0;

    while (circle.length < cCromatic.length) {
        circle.push(cCromatic[i]);

        i += 7;

        if (i > cCromatic.length - 1) {
            i = i - cCromatic.length; 
        }
    }

    return circle;
}



export {
    getChromaticScale,
    getHeptatonicScale,
    getCircleOfFifths,

}
import * as Scale from './scales';
import * as Chords from './chords';
import { instruments, tunings } from './tuning';
import * as MusicConst from './musicConst'


/* ------------ Scales ------------ */
const getScales = () => {
    return MusicConst.scales;
}
const getTableNotes = () => {
    return MusicConst.notesAll;
} 

const getChromaticScale = (type, note) => {
    let chromScale = Scale.getChromaticScale(type, note);
    let result = [];
    for (let i = 0; i < 2; i++) {
        chromScale.forEach(element => {
            result.push(element);
        });
    }
    result.push(note);
    return result;
}

const getChordsInKey = (note, voicing) => {

    const scale = Scale.getHeptatonicScale(voicing, note);
    let chords = [];
    let progression = []; 
    let res = [];

    switch (voicing) {
        case 'major':
            chords = Chords.chordsInMajorKey;
            progression = Chords.commonMajorProg;
            break;
        case 'minor':
            chords = Chords.chordsInMinorKey;
            progression = Chords.commonMinorProg;
            break;
        default:
            break;
    }
    
    progression.forEach(prog => {
        let tmp = [];
        prog.forEach(num => {
            tmp.push({num: chords[num - 1][0], note: scale[num - 1]});
        });
        res.push(tmp);
    });

    return {
        scale,
        chords,
        res
    }
}

const availableVoicings = ['Major', 'Minor'] //! not the right place
const getScaleByNote = (voicing, note) => {
    return Scale.getHeptatonicScale(voicing, note);
}

export const getScale = (voicing, note) => {

    let scale = {intervals: [], notes: []};
    const scales = Scale.scales;

    scales.forEach(element => {
        if (element.name === voicing) {
            scale.intervals = element.intervals;
            scale.notes = Scale.getHeptatonicScale(voicing.toLowerCase(), note);
            return;
        } 
    });
    return scale;
}


const getCircleOfFifths = () => {
    return Scale.getCircleOfFifths();
}


/* ------------ Tunings ------------ */
const getInstruments = () => {
    return instruments;
}

const getTuningNames = (instrument) => {
    const tuningNames = [];
    const tuningByInst = tunings[instrument.toLowerCase()];

    tuningByInst.forEach(element => {
        tuningNames.push(element.name);
    });
    
    return tuningNames;
}

/**
 * 
 * @param {String} instrument 
 * @param {String} name 
 * @param {Boolean} stringOrder 
 * @param {String} type
 */
const getTuningByName = (instrument, name, stringOrder, type) => {

    let i = 0;
    if (type.length > 1) { 
        if (type[1] === '♯') {
            i = 1;
        } else {
            i = 2;
        }
    }

    const t = tunings[instrument.toLowerCase()];
    let a = {name: '', notes: []};

    t.forEach(tuning => {
        if (tuning.name === name) {
            a.name = name;
            
            tuning.notes.forEach(note => {
                if (stringOrder) {
                    a.notes.push(getChromaticScale(i, note));
                } else {
                    a.notes.unshift(getChromaticScale(i, note));
                }
            });            
        }
    });
    return a;
}

/* ------------ Chords ------------ */
const getChords = () => {
    return Chords.availableChords;
}
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

const getTriad = (voicing, note) => {
    return Chords.getTriad(voicing, note);
}


export {
    getScales,
    getTableNotes,
    getChromaticScale,
    availableVoicings,
    getScaleByNote,
    getChordsInKey,
    getCircleOfFifths,
    getInstruments,
    getTuningNames,
    getTuningByName,

    getChords,
    getTriad,
}
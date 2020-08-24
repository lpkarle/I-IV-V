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

const getChromaticScale = (note) => {
    let chromScale = Scale.getChromaticScale(1, note);
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

    /* console.log(progression, chords); */
    
    progression.forEach(prog => {
        let tmp = [];
        prog.forEach(num => {
            tmp.push({num: chords[num - 1][0], note: scale[num - 1]});
        });
        res.push(tmp);
    });
    
    
    
    /* console.log(res); */

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
 */
const getTuningByName = (instrument, name, stringOrder) => {

    const t = tunings[instrument.toLowerCase()];
    let a = {name: '', notes: []};

    t.forEach(tuning => {
        if (tuning.name === name) {
            a.name = name;
            
            tuning.notes.forEach(note => {
                if (stringOrder) {
                    a.notes.push(getChromaticScale(note));
                } else {
                    a.notes.unshift(getChromaticScale(note));
                }
            });            
        }
    });
    return a;
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
}
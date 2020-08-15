import * as Scale from './scales';
import * as Chords from './chords';

const getTableNotes = () => {
    return Scale.getAllNotesForTable()
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

export {
    getTableNotes,
    availableVoicings,
    getScaleByNote,
    getChordsInKey,
    getCircleOfFifths
}
import * as Scale from './scales';
import * as Chords from './chords';
import ChordsInKey from '../components/ChordsInKey/ChordsInKey';

const getTableNotes = () => { return Scale.getAllNotesForTable() }  // !Namen!!




/* const getChordsInKey = (note, voicing) => {
    
    const scale = Scale.getHeptatonicScale(voicing, note);
    const chords = {};

    switch (voicing) {
        case 'major':
            chords = Chords.chordsInMajorKey;
            break;
        case 'minor':
            chords = ChordsInKey.chordsInMinorKey;
        default:
            break;
    }

    return {
        scale,
        chords
    }
} */

const availableVoicings = ['Major', 'Minor'] //! not the right place
const getScaleByNote = (voicing, note) => {
    return Scale.getHeptatonicScale(voicing, note);
}
const getChordsInKey = (voicing) => {
    switch (voicing) {
        case 'major':
            return Chords.chordsInMajorKey;
        case 'minor':
            return ChordsInKey.chordsInMinorKey;
        default:
            break;
    }
}


export {
    getTableNotes,
    availableVoicings,
    getScaleByNote,
    getChordsInKey,
}
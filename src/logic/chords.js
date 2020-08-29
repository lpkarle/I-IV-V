import { getHeptatonicScale } from './scales';


const availableChords = ['Major', 'Minor', '7th'];

const chords = [
    {name: 'Major', intervals: ['P1', 'M3', 'P5'], steps: [1, 3, 5], 
     chords: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'], progressions: [[1, 4, 5, 1], [1, 5, 6, 4], [6, 5, 4, 1]]},
    {name: 'Minor', intervals: ['P1', 'm3', 'P5'], steps: [1, 3, 5], 
     chords: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'], progressions: [[1, 4, 5, 1], [1, 5, 6, 4]]},
    {name: '7th', intervals: ['P1', 'm3', 'P5'], steps: [1, 3, 5]},
];

/**
 * Returns the notes of a chord by extracting the notes from the parent scale
 * @param {String} voicing 
 * @param {String} note 
 */
const getChordNotes = (voicing, note) => {
    let chordNotes = [];
    const parentScale = getHeptatonicScale(voicing, note);
    
    chords.forEach(element => {

        if (voicing === element.name) {
            
            element.steps.forEach(index => {
                chordNotes.push(parentScale[index-1]);    
            });
            return;
        }
    });
    return chordNotes;
}

export {
    chords,
    availableChords,
    getChordNotes,
}
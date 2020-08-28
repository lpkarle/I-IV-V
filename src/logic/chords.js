import { getHeptatonicScale } from './scales';

const availableChords = ['Major', 'Minor', '7th'];

const chords = [
    {name: 'Major', intervals: ['P1', 'M3', 'P5'], steps: [1, 3, 5]},
    {name: 'Minor', intervals: ['P1', 'm3', 'P5'], steps: [1, 3, 5]},
    {name: '7th', intervals: ['P1', 'm3', 'P5'], steps: [1, 3, 5]},
];

const triads = [
    {name: 'Major', intervals: ['P1', 'M3', 'P5'], steps: [1, 3, 5]},
    {name: 'Minor', intervals: ['P1', 'm3', 'P5'], steps: [1, 3, 5]},
    {name: '7th', intervals: ['P1', 'm3', 'P5'], steps: [1, 3, 5]},
];

const getTriad = (voicing, note) => {
    const triad = {intervals: [], notes: []};

    switch (voicing) {
        case 'Major': 

    }
    triads.forEach(element => {
        if (voicing === element.name) {
            triad.intervals = element.intervals;

            const scale = getHeptatonicScale(voicing.toLowerCase(), note);
            element.steps.forEach(index => {
                triad.notes.push(scale[index-1]);    
            });
        }
    });
    return triad;
}

export const getChordNotes = (voicing, note) => {
    let chordNotes = [];
    const parentScale = getHeptatonicScale(voicing.toLowerCase(), note);
    
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

const chordsInMajorKey = [
    ['I', 'major'], ['ii', 'minor'], ['iii', 'minor'], ['IV', 'major'], 
    ['V', 'major'], ['vi', 'minor'],['vii°', 'dim']
];
const chordsInMinorKey = [
    ['i', 'minor'], ['ii°', 'dim'], ['III', 'major'], ['iv', 'minor'],
    ['v', 'minor'], ['VI', 'major'], ['VII', 'major']
]

/* Common Chord Progressions */
const commonMajorProg = [
    [1, 4, 5, 1], [1, 5, 6, 4], [6, 5, 4, 1]
];
const commonMinorProg = [
    [1, 4, 5, 1], [1, 5, 6, 4]
];


export {
    chords,
    availableChords,
    chordsInMajorKey,
    chordsInMinorKey,

    commonMajorProg,
    commonMinorProg,

    getTriad,
}
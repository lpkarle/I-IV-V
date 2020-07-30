

/* const chordsInMajorKey = {
    firChord: ['I', 'major'],
    secChord: ['ii', 'minor'],
    thiChord: ['iii', 'minor'],
    fouChord: ['IV', 'major'],
    fifChord: ['V', 'major'],
    sixChord: ['vi', 'minor'],
    sevChord: ['vii°', 'dim']
}
const chordsInMinorKey = {
    firChord: ['i', 'minor'],
    secChord: ['ii°', 'dim'],
    thiChord: ['III', 'major'],
    fouChord: ['iv', 'minor'],
    fifChord: ['v', 'minor'],
    sixChord: ['VI', 'major'],
    sevChord: ['VII', 'major']
} */
/* const chordsInSeventhKey = { // ['I7', 'ii7', 'iii7', 'IV7', 'Vdom7', 'vi7', 'vii7b5'];
    firChord: ['i', 'minor'],
    secChord: ['ii°', 'dim'],
    thiChord: ['III', 'major'],
    fouChord: ['iv', 'minor'],
    fifChord: ['v', 'minor'],
    sixChord: ['VI', 'major'],
    sevChord: ['VII', 'major']
} */

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
    'I IV V I', 'I V vi IV'
];
const commonMinorProg = [
    'I IV V I', 'I V vi IV'
];


export {
    chordsInMajorKey,
    chordsInMinorKey,

    commonMajorProg,
    commonMinorProg
}
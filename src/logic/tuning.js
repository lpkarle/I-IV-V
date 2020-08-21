const instruments = ['Guitar', 'Bass'];
const tunings = {
    bass: [
        {name: 'Standart', notes: ['E', 'A', 'D', 'G']},
        {name: 'Drop-D', notes: ['D', 'A', 'D', 'G']},
    ],
    guitar: [
        {name: 'Standart', notes: ['E', 'A', 'D', 'G', 'B', 'E']},
        {name: 'Drop-D', notes: ['D', 'A', 'D', 'G', 'B', 'E']},
        {name: 'Open-D', notes: ['D', 'F#', 'D', 'G', 'B', 'D']}
    ]
}

export {
    instruments, 
    tunings
}
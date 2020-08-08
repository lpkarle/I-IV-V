const notes = ['A', 'A♯ / B♭', 'B', 'C', 'C♯ / D♭', 'D', 
               'D♯ / E♭', 'E', 'F', 'F♯ / G♭', 'G', 'G♯ / A♭'];

const notesAll = ['A', 'A♯', 'B♭', 'B', 'C♭', 'C', 'C♯', 'D♭', 'D', 
               'D♯', 'E♭', 'E', 'F', 'F♯', 'G♭', 'G', 'G♯', 'A♭'];

const enharmonicNotes = {
    noteC: 'B♯',
    noteE: 'F♭',
    noteF: 'E♯',
    noteB: 'C♭'
}

const theoreticalScales = {
    major: ['A♯', 'G♯', 'D♯'],
    minor: ['C♭', 'D♭', 'G♭']
}

export { 
    notes,
    notesAll,
    enharmonicNotes,
    theoreticalScales
};
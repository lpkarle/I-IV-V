import * as Scale from '../scales';

test('should get all notes as array from notes.js', () => {
    expect(Scale.getAllNotes()).toStrictEqual(['A', 'A♯ / B♭', 'B', 'C', 'C♯ / D♭', 'D', 
                                               'D♯ / E♭', 'E', 'F', 'F♯ / G♭', 'G', 'G♯ / A♭']);
});

// A-Chomatic
test('should get the A-Chromatic-Scale without cutted accidentals', () => {
    expect(Scale.getChromaticScale(0, 'A')).toStrictEqual(['A', 'A♯ / B♭', 'B', 'C', 'C♯ / D♭', 'D', 
                                                           'D♯ / E♭', 'E', 'F', 'F♯ / G♭', 'G', 'G♯ / A♭']);
});
test('should get the A-Chromatic-Scale with cutted bs', () => {
    expect(Scale.getChromaticScale(1, 'A')).toStrictEqual(['A', 'A♯', 'B', 'C', 'C♯', 'D', 
                                                           'D♯', 'E', 'F', 'F♯', 'G', 'G♯']);
});
test('should get the A-Chromatic-Scale with cutted #s', () => {
    expect(Scale.getChromaticScale(2, 'A')).toStrictEqual(['A', 'B♭', 'B', 'C', 'D♭', 'D', 
                                                           'E♭', 'E', 'F', 'G♭', 'G', 'A♭']);
});

// C#-Chomatic
test('should get the C#-Chromatic-Scale', () => {
    expect(Scale.getChromaticScale(1, 'C♯')).toStrictEqual(['C♯', 'D', 'D♯', 'E', 'F', 'F♯', 
                                                        'G', 'G♯', 'A', 'A♯', 'B', 'C']);
});

/* -------------------------------- Major and Minor - Natural -------------------------------- */
/* -- C -- */ 
test('should get the C-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('major', 'C')).toStrictEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
});
test('should get the C-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'C')).toStrictEqual(['C', 'D', 'E♭', 'F', 'G', 'A♭', 'B♭']);
}); 

/* -- D -- */ 
test('should get the D-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('major', 'D')).toStrictEqual(['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯']);
});
test('should get the D-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'D')).toStrictEqual(['D', 'E', 'F', 'G', 'A', 'B♭', 'C']);
}); 

/* -- E -- */
test('should get the E-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('major', 'E')).toStrictEqual(['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯']);
});
test('should get the E-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'E')).toStrictEqual(['E', 'F♯', 'G', 'A', 'B', 'C', 'D']);
});

/* -- F -- */
test('should get the F-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('major', 'F')).toStrictEqual(['F', 'G', 'A', 'B♭', 'C', 'D', 'E']);
});
test('should get the F-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'F')).toStrictEqual(['F', 'G', 'A♭', 'B♭', 'C', 'D♭', 'E♭']);
});

/* -- G -- */
test('should get the G-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('major', 'G')).toStrictEqual(['G', 'A', 'B', 'C', 'D', 'E', 'F♯']);
});
test('should get the G-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'G')).toStrictEqual(['G', 'A', 'B♭', 'C', 'D', 'E♭', 'F']);
});

/* -- A -- */
test('should get the A-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('major', 'A')).toStrictEqual(['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯']);
});
test('should get the A-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'A')).toStrictEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
});

/* -- B -- */
test('should get the B-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('major', 'B')).toStrictEqual(['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯']);
});
test('should get the B-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'B')).toStrictEqual(['B', 'C♯', 'D', 'E', 'F♯', 'G', 'A']);
}); 


/* -------------------------------- Major and Minor - # -------------------------------- */

/* -- C# -- */
test('should get the C#-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('major', 'C♯')).toStrictEqual(['C♯', 'D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B♯']);
});
test('should get the C#-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'C♯')).toStrictEqual(['C♯', 'D♯', 'E', 'F♯', 'G♯', 'A', 'B']);
}); 

/* -- D# -- */
/* test('should get the D#-Major-Scale', () => { // ! only theoratical
    expect(Scale.getSevenNoteScale('major', 'D#')).toStrictEqual(['D#', 'E#', 'F𝄪', 'G#', 'A#', 'B#', 'C𝄪']);
}); */
test('should get the D#-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'D♯')).toStrictEqual(['D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B', 'C♯']);
});

/* -- F# -- */
test('should get the F#-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('major', 'F♯')).toStrictEqual(['F♯', 'G♯', 'A♯', 'B', 'C♯', 'D♯', 'E♯']);
});
test('should get the F#-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'F♯')).toStrictEqual(['F♯', 'G♯', 'A', 'B', 'C♯', 'D', 'E']);
});

/* -- G# -- */
/* test('should get the G#-Major-Scale', () => {   // !! only theoretical
    expect(Scale.getSevenNoteScale('major', 'G♯')).toStrictEqual(['G♯', 'A♯', 'B', 'C♯', 'D♯', 'E', 'F𝄪']);
}); */
test('should get the G#-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'G♯')).toStrictEqual(['G♯', 'A♯', 'B', 'C♯', 'D♯', 'E', 'F♯']);
});

/* -- A# -- */
/* test('should get the A#-Minor-Scale', () => { // !! only theoretical
    expect(Scale.getSevenNoteScale('minor', 'A♯')).toStrictEqual(['A♯', 'B♯', 'C𝄪', 'D♯', 'E♯', 'F𝄪', 'G𝄪']);
}); */
test('should get the A#-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'A♯')).toStrictEqual(['A♯', 'B♯', 'C♯', 'D♯', 'E♯', 'F♯', 'G♯']);
});


/* -------------------------------- Major and Minor - b -------------------------------- */

/* -- Cb -- */
test('should get the Cb-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('major', 'C♭')).toStrictEqual(['C♭', 'D♭', 'E♭', 'F♭', 'G♭', 'A♭', 'B♭']);
});
/* // nur theoretisch
test('should get the Db-Minor-Scale', () => {
    expect(Scale.getSevenNoteScale('minor', 'Db')).toStrictEqual(['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb']);
}); */

/* -- Db -- */
test('should get the Db-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('major', 'D♭')).toStrictEqual(['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C']);
});
/* // nur theoretisch
test('should get the Db-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'Db')).toStrictEqual(['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb']);
}); */

/* -- Eb -- */
test('should get the Eb-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('major', 'E♭')).toStrictEqual(['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D']);
});
test('should get the Eb-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'E♭')).toStrictEqual(['E♭', 'F', 'G♭', 'A♭', 'B♭', 'C♭', 'D♭']);
});

/* -- Gb -- */
test('should get the Gb-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('major', 'G♭')).toStrictEqual(['G♭', 'A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F']);
});
/* test('should get the Gb-Minor-Scale', () => { // ! only theoratical
    expect(Scale.getHeptatonicScale('minor', 'Gb')).toStrictEqual(['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db']);
}); */

/* -- Ab -- */
test('should get the Ab-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('major', 'A♭')).toStrictEqual(['A♭', 'B♭', 'C', 'D♭', 'E♭', 'F', 'G']);
});
test('should get the Ab-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'A♭')).toStrictEqual(['A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F♭', 'G♭']);
});

/* -- Bb -- */
test('should get the Bb-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('major', 'B♭')).toStrictEqual(['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A']);
});
test('should get the Bb-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('minor', 'B♭')).toStrictEqual(['B♭', 'C', 'D♭', 'E♭', 'F', 'G♭', 'A♭']);
});

// Circle of Fifths
/* test('should get the circle of fifths', () => {
    expect(Scale.getCircleOfFifths()).toStrictEqual(['C', 'G', 'D', 'A', 'E', 'B', 
                                                     'F# / Gb', 'C# / Db', 'G# / Ab', 'Eb', 'Bb', 'F']);
}); */



/* -------------------------------- Pentatonic - Major and Minor -------------------------------- */
/* -- A -- 
test('should get the A-Major-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('major', 'A')).toStrictEqual(['A', 'B', 'C♯', 'E', 'F♯']);
});
test('should get the A-Minor-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('minor', 'A')).toStrictEqual(['A', 'C', 'D', 'E', 'G']);
});*/

/* -- Bb -- 
test('should get the Bb-Major-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('major', 'B♭')).toStrictEqual(['B♭', 'C', 'D', 'F', 'G']);
});
test('should get the Bb-Minor-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('minor', 'B♭')).toStrictEqual(['B♭', 'D♭', 'E♭', 'F', 'A♭']);
});*/


/* -------------------------------- Blues - Major and Minor -------------------------------- */

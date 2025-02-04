import * as Scale from '../scales';

// A-Chomatic
test('should get the A-Chromatic-Scale without cutted accidentals', () => {
    expect(Scale.getChromaticScale(0, 'A')).toStrictEqual(['A', 'A♯/B♭', 'B', 'C', 'C♯/D♭', 'D', 
                                                           'D♯/E♭', 'E', 'F', 'F♯/G♭', 'G', 'G♯/A♭']);
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
    expect(Scale.getHeptatonicScale('Major', 'C')).toStrictEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B']);
});
test('should get the C-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'C')).toStrictEqual(['C', 'D', 'E♭', 'F', 'G', 'A♭', 'B♭']);
}); 

/* -- D -- */ 
test('should get the D-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('Major', 'D')).toStrictEqual(['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯']);
});
test('should get the D-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'D')).toStrictEqual(['D', 'E', 'F', 'G', 'A', 'B♭', 'C']);
}); 

/* -- E -- */
test('should get the E-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('Major', 'E')).toStrictEqual(['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯']);
});
test('should get the E-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'E')).toStrictEqual(['E', 'F♯', 'G', 'A', 'B', 'C', 'D']);
});

/* -- F -- */
test('should get the F-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('Major', 'F')).toStrictEqual(['F', 'G', 'A', 'B♭', 'C', 'D', 'E']);
});
test('should get the F-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'F')).toStrictEqual(['F', 'G', 'A♭', 'B♭', 'C', 'D♭', 'E♭']);
});

/* -- G -- */
test('should get the G-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('Major', 'G')).toStrictEqual(['G', 'A', 'B', 'C', 'D', 'E', 'F♯']);
});
test('should get the G-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'G')).toStrictEqual(['G', 'A', 'B♭', 'C', 'D', 'E♭', 'F']);
});

/* -- A -- */
test('should get the A-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('Major', 'A')).toStrictEqual(['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯']);
});
test('should get the A-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'A')).toStrictEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
});

/* -- B -- */
test('should get the B-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('Major', 'B')).toStrictEqual(['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯']);
});
test('should get the B-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'B')).toStrictEqual(['B', 'C♯', 'D', 'E', 'F♯', 'G', 'A']);
}); 


/* -------------------------------- Major and Minor - ♯ -------------------------------- */

/* -- C# -- */
test('should get the C#-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('Major', 'C♯')).toStrictEqual(['C♯', 'D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B♯']);
});
test('should get the C#-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'C♯')).toStrictEqual(['C♯', 'D♯', 'E', 'F♯', 'G♯', 'A', 'B']);
}); 

/* -- D# -- */
/* test('should get the D#-Major-Scale', () => { // ! only theoratical
    expect(Scale.getSevenNoteScale('Major', 'D#')).toStrictEqual(['D#', 'E#', 'F𝄪', 'G#', 'A#', 'B#', 'C𝄪']);
}); */
test('should get the D#-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'D♯')).toStrictEqual(['D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B', 'C♯']);
});

/* -- F# -- */
test('should get the F#-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('Major', 'F♯')).toStrictEqual(['F♯', 'G♯', 'A♯', 'B', 'C♯', 'D♯', 'E♯']);
});
test('should get the F#-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'F♯')).toStrictEqual(['F♯', 'G♯', 'A', 'B', 'C♯', 'D', 'E']);
});

/* -- G# -- */
/* test('should get the G#-Major-Scale', () => {   // !! only theoretical
    expect(Scale.getSevenNoteScale('Major', 'G♯')).toStrictEqual(['G♯', 'A♯', 'B', 'C♯', 'D♯', 'E', 'F𝄪']);
}); */
test('should get the G#-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'G♯')).toStrictEqual(['G♯', 'A♯', 'B', 'C♯', 'D♯', 'E', 'F♯']);
});

/* -- A# -- */
/* test('should get the A#-Major-Scale', () => { // !! only theoretical
    expect(Scale.getSevenNoteScale('Major', 'A♯')).toStrictEqual(['A♯', 'B♯', 'C𝄪', 'D♯', 'E♯', 'F𝄪', 'G𝄪']);
}); */
test('should get the A#-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'A♯')).toStrictEqual(['A♯', 'B♯', 'C♯', 'D♯', 'E♯', 'F♯', 'G♯']);
});

/* -------------------------------- Major and Minor - ♭ -------------------------------- */
/* -- Cb -- */
test('should get the Cb-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('Major', 'C♭')).toStrictEqual(['C♭', 'D♭', 'E♭', 'F♭', 'G♭', 'A♭', 'B♭']);
});
/* // nur theoretisch
test('should get the Db-Minor-Scale', () => {
    expect(Scale.getSevenNoteScale('Minor', 'Db')).toStrictEqual(['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb']);
}); */

/* -- Db -- */
test('should get the Db-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('Major', 'D♭')).toStrictEqual(['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C']);
});
/* // nur theoretisch
test('should get the Db-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'Db')).toStrictEqual(['Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb']);
}); */

/* -- Eb -- */
test('should get the Eb-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('Major', 'E♭')).toStrictEqual(['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D']);
});
test('should get the Eb-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'E♭')).toStrictEqual(['E♭', 'F', 'G♭', 'A♭', 'B♭', 'C♭', 'D♭']);
});

/* -- Gb -- */
test('should get the Gb-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('Major', 'G♭')).toStrictEqual(['G♭', 'A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F']);
});
/* test('should get the Gb-Minor-Scale', () => { // ! only theoratical
    expect(Scale.getHeptatonicScale('Minor', 'Gb')).toStrictEqual(['Eb', 'F', 'Gb', 'Ab', 'Bb', 'Cb', 'Db']);
}); */

/* -- Ab -- */
test('should get the Ab-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('Major', 'A♭')).toStrictEqual(['A♭', 'B♭', 'C', 'D♭', 'E♭', 'F', 'G']);
});
test('should get the Ab-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'A♭')).toStrictEqual(['A♭', 'B♭', 'C♭', 'D♭', 'E♭', 'F♭', 'G♭']);
});

/* -- Bb -- */
test('should get the Bb-Major-Scale', () => {
    expect(Scale.getHeptatonicScale('Major', 'B♭')).toStrictEqual(['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A']);
});
test('should get the Bb-Minor-Scale', () => {
    expect(Scale.getHeptatonicScale('Minor', 'B♭')).toStrictEqual(['B♭', 'C', 'D♭', 'E♭', 'F', 'G♭', 'A♭']);
});


/* -------------------------------- Pentatonic - Major and Minor -------------------------------- */
/* -- A -- */
test('should get the A-Major-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Major', 'A')).toStrictEqual(['A', 'B', 'C♯', 'E', 'F♯']);
});
test('should get the A-Minor-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Minor', 'A')).toStrictEqual(['A', 'C', 'D', 'E', 'G']);
});

/* -- B -- */
test('should get the B-Major-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Major', 'B')).toStrictEqual(['B', 'C♯', 'D♯', 'F♯', 'G♯']);
});
test('should get the B-Minor-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Minor', 'B')).toStrictEqual(['B', 'C', 'D', 'E', 'G']);
});

/* -- C -- */
test('should get the C-Major-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Major', 'C')).toStrictEqual(['C', 'D', 'E', 'G', 'A']);
});
test('should get the C-Minor-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Minor', 'C')).toStrictEqual(['C', 'E♭', 'F', 'G', 'B♭']);
});

/* -- D -- */
test('should get the D-Major-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Major', 'D')).toStrictEqual(['D', 'E', 'F♯', 'A', 'B']);
});
test('should get the D-Minor-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Minor', 'D')).toStrictEqual(['A', 'C', 'D', 'E', 'G']);
});

/* -- E -- */
test('should get the E-Major-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Major', 'E')).toStrictEqual(['C', 'D', 'E', 'G', 'A']);
});
test('should get the E-Minor-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Minor', 'E')).toStrictEqual(['E', 'G', 'A', 'B', 'D']);
});

/* -- F -- */
test('should get the F-Major-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Major', 'F')).toStrictEqual(['C', 'D', 'E', 'G', 'A']);
});
test('should get the F-Minor-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Minor', 'F')).toStrictEqual(['A', 'C', 'D', 'E', 'G']);
});

/* -- G -- */
test('should get the G-Major-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Major', 'G')).toStrictEqual(['C', 'D', 'E', 'G', 'A']);
});
test('should get the G-Minor-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Minor', 'G')).toStrictEqual(['A', 'C', 'D', 'E', 'G']);
});

/* -- F♯ -- */
test('should get the F♯-Major-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Major', 'F♯')).toStrictEqual(['F♯', 'D', 'E', 'G', 'A']);
});
test('should get the F♯-Minor-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Minor', 'F♯')).toStrictEqual(['F♯', 'A', 'B', 'C♯', 'E']);
});

/* -- G♯ -- */
test('should get the G♯-Major-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Major', 'G♯')).toStrictEqual(['G♯', 'B', 'C♯', 'D♯', 'F♯']);
});
test('should get the G♯-Minor-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Minor', 'G♯')).toStrictEqual(['G♯', 'B', 'C♯', 'D♯', 'F♯']);
});



/* -- Bb -- */
test('should get the Bb-Major-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Major', 'B♭')).toStrictEqual(['B♭', 'C', 'D', 'F', 'G']);
});
test('should get the Bb-Minor-Pentatonic-Scale', () => {
    expect(Scale.getPentatonicScale('Minor', 'B♭')).toStrictEqual(['B♭', 'D♭', 'E♭', 'F', 'A♭']);
});


/* -------------------------------- Blues - Major and Minor -------------------------------- */
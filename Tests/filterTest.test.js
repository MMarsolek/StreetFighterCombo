const filter = require('../utils/filter');

test('Should return censored string',()=>{
    expect(filter('Boob')).toBe('****')
});

test('Should not return censored string',()=>{
    expect(filter('Hello! This is a great assessment for the assassins that take the assessments of dams.')).toBe('Hello! This is a great assessment for the assassins that take the assessments of dams.')
});

test('A string with chained swear words should be censored',()=>{
    expect(filter('Fuck, Shit Piss off, Dick head Asses Bastard Bitch Damn.')).toBe('****, **** **** off, **** head ***** ******* ***** ****.')
});


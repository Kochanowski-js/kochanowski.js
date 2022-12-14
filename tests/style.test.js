import { countSyllables } from '../models/CQGrade.js';

test('Syllables', () => {
    expect(countSyllables('Litwo! Ojczyzno moja! ty jesteś jak zdrowie.')).toBe(13)
    expect(countSyllables('Ile cię trzeba cenić, ten tylko się dowie,')).toBe(13)
    expect(countSyllables('Kto cię stracił. Dziś piękność twą w całej ozdobie')).toBe(13)
    expect(countSyllables('Widzę i opisuję, bo tęsknię po tobie.')).toBe(13)
});

//test that makes sure score is calculated the right way todo
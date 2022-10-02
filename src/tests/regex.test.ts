import r, { getSentences, matchOutsideQuotes } from "../regex"

//Example programs
const a = `Drukuj("Witaj świecie"). Drukuj("Witaj świecie"). Drukuj("Witaj świecie").`
const b = `Drukuj("Witaj, świecie."). Drukuj("Witaj, świecie!"). Drukuj("Witaj. świecie.").`
const c = `Zmiennej y przypisz wartość 5. y zwiększ o 1. Drukuj(y).`


test('Is starting from small case', () => {

    expect("janek").toMatch(r.firstCharLower)
    expect("ma ktoś jakiś pomysł").toMatch(r.firstCharLower)
    expect("to (nie) powinno ERRORA WYWALIĆ").toMatch(r.firstCharLower)
    expect("() => drukuj.").not.toMatch(r.firstCharLower)
    expect("[] Przeciwko").not.toMatch(r.firstCharLower)
    expect("Nie mam pomysłu").not.toMatch(r.firstCharLower)
    expect("Janek").not.toMatch(r.firstCharLower)
    
    expect("Zmiennej y przypisz wartość 5.").not.toMatch(r.firstCharLower)
    expect("y zwiększ o 1.").toMatch(r.firstCharLower)
    expect("Drukuj(y).").not.toMatch(r.firstCharLower)

})

test('Splitting by sentences (count)', () => {

    expect(a.match(r.sentencesDots)).toHaveLength(3)
    expect(b.match(r.sentencesDots)).toHaveLength(3)
    expect(c.match(r.sentencesDots)).toHaveLength(3)

    expect(a.split(r.sentencesDots).filter(Boolean)).toHaveLength(3)
    expect(b.split(r.sentencesDots).filter(Boolean)).toHaveLength(3)
    expect(c.split(r.sentencesDots).filter(Boolean)).toHaveLength(3)

})

test('Splitting by sentences (values)', () => {

    expect(getSentences(a)).toStrictEqual(["Drukuj(\"Witaj świecie\")", "Drukuj(\"Witaj świecie\")", "Drukuj(\"Witaj świecie\")"])
    expect(getSentences(b)).toStrictEqual(["Drukuj(\"Witaj, świecie.\")", "Drukuj(\"Witaj, świecie!\")", "Drukuj(\"Witaj. świecie.\")"])
    expect(getSentences(c)).toStrictEqual(["Zmiennej y przypisz wartość 5", "y zwiększ o 1", "Drukuj(y)"])

})

test('Count characters', () => {

    expect(matchOutsideQuotes('%% %" % " %% "%%%" %%', "%")).toBe(7)
    expect(matchOutsideQuotes('e. ee. eee. "hello.".', '.')).toBe(4)
    expect(matchOutsideQuotes('e. ee. eee. "hello.".', ',')).toBe(0)

})
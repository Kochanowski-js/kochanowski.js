/**
 * Converts .pol to .js
 * @param src Kochanowski.js file content
 * @returns JavaScript file content
 */
export default function convertToJs(src: string) {
    
    //Remove weird characters from the code.
    src = src.replaceAll(/\n|\r/g, '');

    //Split the file between operations, then remove undefined
    let sentences = getSentences(src);

    // Check if the code is written correctly
    throwErrors(sentences);

    // Convert keywords
    return wordConverter(sentences)
}

function countChars(str: string[], match: string) {
    return str.join('').split(match).length - 1;
}

/**
 * Checks if the code is written correctly
 * @param sentences Array of instructions
 */
function throwErrors(sentences: string[]) {

    // Which symbols cannot be used outside quotations
    const illegalSymbols = ['+', '-', '*', '/']

    // Not matching quotes
    if (countChars(sentences, '"') % 2) throw new SyntaxError(`Błąd: Nie domykanie cudzysłowiów (sens)`)

    // Not matching brackets - btw i am aware that you also need to match them inside strings :>
    if (countChars(sentences, '{') != countChars(sentences, '}')) throw new SyntaxError(`Błąd: Nie domykanie klamerek (sens)`)
    if (countChars(sentences, '[') != countChars(sentences, ']')) throw new SyntaxError(`Błąd: Nie domykanie nawiasów kwadratowych (sens)`)
    if (countChars(sentences, '(') != countChars(sentences, ')')) throw new SyntaxError(`Błąd: Nie domykanie nawiasów (sens)`)

    for (let i = 0; i < sentences.length; i++) {

        const firstChar = sentences[i].replaceAll(' ', '')[0];
        if (!firstChar.match(/[A-Z]|}|{/)) throw new SyntaxError(`Błąd w linii ${i+1}: Rozpoczynanie zdań z małej litery (ort)`)

        // Illegal characters
        for (let j of illegalSymbols) {
            if (countCharFixed(sentences[i], j)) throw new SyntaxError(`Błąd w linii ${i+1}: Używanie ang*elskich symboli (jęz) (Symbol ${j})`)
        }

    }


}

let translatedKeywords = [
    [', ', '.'],
    ['Brak', 'null'],
    ['Niezdefiniowane', 'undefined'],
    ['Dla', 'for'],
    ['Dopóki', 'while'],
    ['zwiększ o', '+='],
    ['Drukuj', 'console.log'],
    ['Jeżeli', 'if'],
    ['Stałej', 'const'],
    ['Zmiennej', 'let'],
    ['przypisz wartość', '='],
    ['nie jest równe', '!='],
    ['jest równe', '=='],
    ['jest większe od', '>'],
    ['jest mniejsze od', '<'],
    ['jest mniejsze bądź równe', '<='],
    ['jest większe bądź równe', '>='],
    ['Wyczekuj', 'await'],
    ['Złam', 'break'],
    ['Łap', 'catch'],
    ['Klasa', 'class'],
    ['Kontynuuj', 'continue'],
    ['Rób', 'do'],
    ['W przeciwnym wypadku', 'else'],
    ['Fałsz', 'false'],
    ['Prawda', 'true'],
    ['Funkcja', 'function'],
    ['Załącz', 'import'],
    ['Zwróć', 'return'],
    ['z biblioteki', 'from'],
    ['wewnątrz', 'in'],
    ['oraz', ','],
    
    // Addition
    ['plus', '+'],
    ['dodać', '+'],
    ['dodane do', '+'],

    // Substraction
    ['minus', '-'],
    ['odjąć', '-'],
    ['odjęte od', '-'],
    
    // Multiplication
    ['razy', '*'],
    ['pomnożyć przez', '*'],
    ['pomnożone przez', '*'],
    ['pomnożona przez', '*'],

    // Division
    ['podzielić na', '/'],
    ['podzielone na', '/'],
    ['podzielona na', '/'],
    ['podzielony na', '/'],

    // Rasing to the power
    ['do potęgi', '**'],
    ['do kwadratu', '**2'],
    ['do sześcianu', '**3'],
    ['kwadrat', '**2'],
    ['sześcian', '**3'],
    ['pierwiastek', '**0.5'],

    // π
    ['ciasto', 'Math.PI'],
    ['pi', 'Math.PI'],
    ['𝝅', 'Math.PI'],
    ['π', 'Math.PI'],
    
    // Random
    ['losowaLiczba', 'Math.random()'],
    ['losowanie', 'Math.random()'],

    // Dots (for objects)
    [' z upchniętym ', '.'],
]

function wordConverter(lines: string[]) {

    for (let i in lines) {

        for (let j in translatedKeywords) {
            const keywords = new RegExp(`${translatedKeywords[j][0]}(?=([^"]*"[^"]*")*[^"]*$)`, 'g');

            lines[i] = lines[i].replaceAll(keywords, translatedKeywords[j][1]);
        }
    }

    return lines.join(';')+';'
}

function getSentences(src: string): string[] {
    return src.split(/\.(?=(?:(?:[^"]*"){2})*[^"]*$)/g).filter( e => e.trim() );
}

/**
 * Count char outside strings
 * @param src Source
 * @param match Match
 * @returns How many occurences
 */
function countCharFixed(src: string, match: string): number {

    let countRegex = new RegExp(`\\${match}(?=(?:(?:[^"]*"){2})*[^"]*$)`);
    return (src.match(countRegex) || []).length;

}
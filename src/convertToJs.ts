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

    return wordConverter(sentences)
}

/**
 * Checks if the code is written correctly
 * @param sentences Array of instructions
 */
function throwErrors(sentences: string[]) {

    let c = sentences.join('').split('"').length - 1;

    if (c % 2) {
        throw new SyntaxError(`Błąd: Nie domykanie cudzysłowiów (idk)`)
    }

    for (let i = 0; i < sentences.length; i++) {

        if (!sentences[i].replaceAll(' ', '').length) continue;
        const firstChar = sentences[i].replaceAll(' ', '')[0];

        if (!firstChar.match(/[A-Z]|}|{/)) {
            throw new SyntaxError(`Błąd w linii ${i+1}: Rozpoczynanie zdań z małej litery (ort)`)
        }

    }
}

let translatedKeywords = [
    [',', '.'],
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
    ['z biblioteki', 'from'],
    ['wewnątrz', 'in'],
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

    let sentences = [];
    let isString = false;

    let sentence = '';
    for (let i = 0; i < src.length; i++) {
    
        if (src[i] == '"') isString = !isString 

        if (src[i] == '.') {
            if (isString) {
                sentence += src[i];
                continue;
            } else {
                sentences.push(sentence);
                sentence = '';
            }
        } else {
            sentence += src[i];
        }

    }

    return sentences
}
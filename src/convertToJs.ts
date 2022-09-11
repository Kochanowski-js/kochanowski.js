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
    [',', '.'],

    // Libraries
    ['Załącz', 'import'],
    ['Zwróć', 'return'],
    ['z biblioteki', 'from'],

    // Constants
    ['Brak', 'null'],
    ['Niezdefiniowane', 'undefined'],
    ['Fałsz', 'false'],
    ['Prawda', 'true'],

    // Functions & Classes
    ['Funkcja', 'function'],
    ['Wyczekuj', 'await'],
    ['Klasa', 'class'],
    ['Konstruktor', 'constructor'],
    
    // If else & Loops
    ['Jeżeli', 'if'],
    ['Jeśli', 'if'],
    ['W przeciwnym wypadku', 'else'],
    
    ['Dla', 'for'],
    ['Dopóki', 'while'],
    ['Rób', 'do'],
    
    ['Sróbój', 'try'],
    ['Łap', 'catch'],
    ['Złam', 'break'],
    ['Kontynuuj', 'continue'],

    // Assigments    
    ['Stałej', 'const'],
    ['Stałych', 'const'],
    ['Stałym', 'const'],
    ['Stały', 'const'],
    ['Stałe', 'const'],
    ['Stała', 'const'],

    ['Zmiennemu', 'let'],
    ['Zmiennej', 'let'],
    ['Zmienne', 'let'],
    ['Zmiennym', 'let'],
    ['Zmienny', 'let'],
    ['Zmienna', 'let'],

    ['której wartość jest równa', '='],
    ['który wartość jest równa', '='],
    ['któremu wartość jest równa', '='],
    ['gdzie wartość jest równa', '='],

    ['przypisz wartość', '='],

    // Comparsions
    ['nie jest równe', '!='],
    ['nie jest równy', '!='],
    ['nie jest równa', '!='],

    ['jest równe', '=='],
    ['jest równa', '=='],
    ['jest równy', '=='],

    ['jest większe od', '>'],
    ['jest większa od', '>'],
    ['jest większy od', '>'],

    ['jest mniejsze od', '<'],
    ['jest mniejsza od', '<'],
    ['jest mniejszy od', '<'],

    ['jest mniejsza bądź równa', '<='],
    ['jest mniejszy bądź równy', '<='],
    ['jest mniejsze bądź równe', '<='],

    ['jest większe bądź równe', '>='],
    ['jest większy bądź równy', '>='],
    ['jest większa bądź równa', '>='],
    
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

    // Modulos
    ['modulować na', '%'],
    ['modulowane na', '%'],
    ['modulowana na', '%'],
    ['modulowny na', '%'],

    ['zmodulować na', '%'],
    ['zmodulowane na', '%'],
    ['zmodulowana na', '%'],
    ['zmodulowny na', '%'],

    // Other (MATH)
    ['zwiększ o', '+='],
    ['zmniejsz o', '-='],
    ['pomnoż o', '*='],
    ['podziel o', '/='],
    ['moduluj o', '%='],
    ['zmoduluj o', '%='],

    // Dots (for objects)
    ['z upchniętym', '.'],

    // Other
    ['To', 'this'],
    ['Drukuj', 'console.log'],
    ['wewnątrz', 'in'],
    ['oraz', ','],
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

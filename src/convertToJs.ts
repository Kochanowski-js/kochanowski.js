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

    //C++ Base
    ["Załącz biblioteke", "#include"],
    ["Używając", "using"],
    ["przestrzeni nazw", "namespace"],
    ["Definiując", "#define"],
    ["Główna", "main"],
    ['z upchniętym', '::'],
    [';', '\n'],
    ['wypluj', '<<'],
    ['wpluj', '>>'],
    ['Bp', ''],

    //Var types
    ["Liczba", "int"],
    ["Liczby", "int"],
    ["Liczbie", "int"],

    ["Podwójny", "double"],
    ["Podwójnea", "double"],
    ["Podwójnej", "double"],
    ["Podwójnemu", "double"],

    ["Latać", "float"],
    ["Latającej", "float"],
    ["Latającemu", "float"],
    ["Latająy", "float"],

    ["Binarny", "Boolean"],
    ["Binarnej", "Boolean"],
    ["Binarnemu", "Boolean"],

    ["Znak", "char"],
    ["Znak", "char"],
    ["Znak", "char"],

    ["Nazwa", "string"],
    ["Nazwie", "string"],

    ['której wartość jest równa', '='],

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


    // Other
    [',', '.'],
    ['Brak', 'null'],
    ['Niezdefiniowane', 'undefined'],
    ['Dla', 'for'],
    ['Dopóki', 'while'],
    ['zwiększ o', '+='],
    ['Jeżeli', 'if'],
    ['przypisz wartość', '='],
    ['Złam', 'break'],
    ['Klasa', 'class'],
    ['Kontynuuj', 'continue'],
    ['Rób', 'do'],
    ['W przeciwnym wypadku', 'else'],
    ['Fałsz', 'false'],
    ['Prawda', 'true'],
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

    // Modulos
    ['modulować na', '%'],
    ['modulowane na', '%'],
    ['modulowana na', '%'],
    ['modulowny na', '%'],

    ['zmodulować na', '%'],
    ['zmodulowane na', '%'],
    ['zmodulowana na', '%'],
    ['zmodulowny na', '%'],
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

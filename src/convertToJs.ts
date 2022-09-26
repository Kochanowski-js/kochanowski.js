import translatedKeywords from "./keywords";

/**
 * Converts .pol to .js
 * @param src Kochanowski.js file content
 * @returns JavaScript file content
 */
export default function convertToJs(src: string) {
    
    src = src.replaceAll(/\n|\r/g, '');
    let sentences = getSentences(src);
    throwErrors(sentences);

    return wordConverter(sentences);

}

function countChars(str: string[], match: string) {
    return str.join('').split(match).length - 1;
}

function countCharFixed(src: string, match: string): number {
    let countRegex = new RegExp(`\\${match}(?=(?:(?:[^"]*"){2})*[^"]*$)`);
    return (src.match(countRegex) || []).length;
}

function getSentences(src: string): string[] {
    return src.split(/\.(?=(?:(?:[^"]*"){2})*[^"]*$)/g).filter( e => e.trim() );
}

function wordConverter(lines: string[]) {

    for (let i in lines) {

        for (let j in translatedKeywords) {
            const keywords = new RegExp(`${translatedKeywords[j][0]}(?=([^"]*"[^"]*")*[^"]*$)`, 'g');

            lines[i] = lines[i].replaceAll(keywords, translatedKeywords[j][1]);
        }
    }

    return lines.join(';')+';'
}

/**
 * Checks if the code is written correctly
 * @param sentences Array of instructions
 */
function throwErrors(sentences: string[]) {

    // Which symbols cannot be used outside quotations
    const illegalSymbols = ['+', '-', '*', '/', '%']
    const brackets = [["[", "]"], ["{", "}"], ["(", ")"]]
    const quotes = ['"', "'", "`"]

    for (let i = 0; i < sentences.length; i++) {

        const firstChar = sentences[i].replaceAll(' ', '')[0];
        if (!firstChar.match(/[A-Z]|}|{/)) throw new SyntaxError(`Błąd w linii ${i+1}: Rozpoczynanie zdań z małej litery (ort)`)

        // Illegal characters
        for (let j of illegalSymbols) {
            if (countCharFixed(sentences[i], j)) throw new SyntaxError(`Błąd w linii ${i+1}: Używanie ang*elskich symboli (jęz) (Symbol ${j})`)
        }

        // Not matching quotes
        for (let j of quotes) {
            if (countChars(sentences, j) % 2) throw new SyntaxError(`Błąd w linii ${i+1} Nie domykanie cudzysłowiów (sens)`)
        }

        // Not matching brackets
        for (let j of brackets) {
            if (countChars(sentences, j[0]) != countChars(sentences, j[1])) throw new SyntaxError(`Błąd w linii ${i+1}: Nie domykanie nawiasów (sens)`)
        }

    }


}
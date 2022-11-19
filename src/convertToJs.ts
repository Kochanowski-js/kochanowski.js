import translatedKeywords from "./keywords";
import getPoints from "./CQGrade";
import r, { getSentences, matchOutsideQuotes, outsideConstructor } from "./regex";

/**
 * Converts .pol to .js
 * @param src Kochanowski.js file content
 * @returns JavaScript file content
 */
export default function convertToJs(src: string) {
    
    let sentences = getSentences(src);
    let score = getPoints(src);
    console.log(score)

    // Making lives harder
    throwRandomErrors(sentences);

    return wordConverter(sentences);

}

function wordConverter(lines: string[]) {

    lines = lines.map(e => convertToLower(e));

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
function throwRandomErrors(sentences: string[]) {

    // Which symbols cannot be used outside quotations
    const illegalSymbols = ['+', '-', '*', '/', '%']
    const brackets = [["[", "]"], ["{", "}"], ["(", ")"]]

    for (let i = 0; i < sentences.length; i++) {

        if (sentences[i].match(r.firstCharLower))
            throw new SyntaxError(`Błąd w linii ${i+1}: Rozpoczynanie zdań z małej litery (ort)`);

        // Illegal characters
        for (let j of illegalSymbols) {
            if (matchOutsideQuotes(sentences[i], j))
                throw new SyntaxError(`Błąd w linii ${i+1}: Używanie ang*elskich symboli (jęz) (Symbol ${j})`);
        }

        // Not matching brackets
        for (let j of brackets) {
            if (matchOutsideQuotes(sentences.join("\n"), j[0]) != matchOutsideQuotes(sentences.join("\n"), j[1]))
                throw new SyntaxError(`Błąd w linii ${i+1}: Nie domykanie nawiasów (sens)`);
        }
    }
}

/**
 * Converts every character to lower case that isn't in quotes
 * @param content Content
 * @returns Modified string
 */
export function convertToLower(content: string): string {

    // Drukuj("Witaj świecie"). => drukuj("witaj świecie").
    return content.replaceAll(r.anythingOutsideQuotes, function(txt) {
        return txt.toLocaleLowerCase()
    });

}
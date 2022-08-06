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
    console.log(sentences)

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

        if (!firstChar.match(/[A-Z]/)) {
            throw new SyntaxError(`Błąd w linii ${i+1}: Rozpoczynanie zdań z małej litery (ort)`)
        }

    }
}

function wordConverter(lines: string[]) {

    for (let i in lines) {
        lines[i] = lines[i].replaceAll(/Drukuj(?=([^"]*"[^"]*")*[^"]*$)/g, 'console.log')
        lines[i] = lines[i].replaceAll(/Jeżeli(?=([^"]*"[^"]*")*[^"]*$)/g, 'if')
        lines[i] = lines[i].replaceAll(/jest równe(?=([^"]*"[^"]*")*[^"]*$)/g, '==')
        lines[i] = lines[i].replaceAll(/jest większe od(?=([^"]*"[^"]*")*[^"]*$)/g, '>')
        lines[i] = lines[i].replaceAll(/jest mniejsze od(?=([^"]*"[^"]*")*[^"]*$)/g, '<')
        lines[i] = lines[i].replaceAll(/jest mniejsze bądź równe od(?=([^"]*"[^"]*")*[^"]*$)/g, '<=')
        lines[i] = lines[i].replaceAll(/jest większe bądź równe od(?=([^"]*"[^"]*")*[^"]*$)/g, '=>')
        lines[i] = lines[i].replaceAll(/jest mniejsze lub równe od(?=([^"]*"[^"]*")*[^"]*$)/g, '<=')
        lines[i] = lines[i].replaceAll(/jest większe lub równe od(?=([^"]*"[^"]*")*[^"]*$)/g, '=>')
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
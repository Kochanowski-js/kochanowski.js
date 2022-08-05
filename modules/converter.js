import wordConverter from "./wordConverter.js";

export default function convertToChinese(src) {
    
    src = src.replaceAll('\n', '');
    src = src.replaceAll('\r', '');

    //Part 1. Grammar errors:

    let sentences = [];
    let isString = false;

    let sentence = '';
    for (let i in src) {
    
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

    for (let i in sentences) {
    
        if (!sentences[i] || sentences[i].length == 0) continue; 


        if (!sentences[i][0].match(/[A-Z]/)) {
            return returnError('Rozpoczynanie zdań z małej litery (ort)', i)
        }

    }

    return wordConverter(sentences)
}

function returnError(error, line) {
    return `//Błąd w linii ${parseInt(line)+1}: ${error}.`
}
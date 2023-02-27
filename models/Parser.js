import Lexer from "./Lexer.js";

/**
 * Determines whether a given string has valid parenthesis matches.
 *
 * @param {string} str - The string to check for valid parenthesis matches.
 *                      Only contains parenthesis characters: (, ), [, ], {, }.
 * @returns {boolean} - True if the string contains valid parenthesis matches, 
 *                      false otherwise.
 */ 
function matchParenthesis(str) {

    const paren = [ "[", "]", "(", ")", "{", "}" ]
    let parenStack = [];

    for (let i in str) {
        if (paren.indexOf(str[i]) % 2 === 0) {

            parenStack.push(str[i]);
            
        } else {

            // paren[paren.indexOf(str[i]) - 1] converts from a closing parenthesis to the opening one  
            const lastOpening = parenStack.pop();
            if (lastOpening !== paren[paren.indexOf(str[i]) - 1])
                return false;

        }
    }

    return parenStack.length === 0;

}

/**
 * Returns a string containing only opening and closing parenthesis characters from an array of tokens.
 *
 * @param {Lexer} tokens - An array of tokens created using the Lexer class.
 * @returns {string} A string containing only opening and closing parenthesis characters.
 *
 */
function tokensToParens(tokens) {

    let onlyParenthesis = "";
    const parens = ["[", "(", "{", "]", ")", "}"];
    
    for (let token of tokens) {
        if (parens.includes(token.value)) {
          onlyParenthesis += token.value;
        }
      }

    return onlyParenthesis;

}

// const lexer = new Lexer(`def function FUNCNAME args [A,B,C] [] [] [[[][[]]]] callback 1 LINES1; 1`).tokenize();

class Parser {

    constructor (tokens) {

        this.tokens = tokens;
        this.mem = {
            variables: {},
            functions: {}
        }; // efecient :)

    }

    compute(expression) {
        console.log(`Compute the expression ${expression}`)
    }

}

export {
    matchParenthesis, tokensToParens
}
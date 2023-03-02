import Lexer, { generateAbstractSyntaxTree } from "./Lexer.js";

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

    constructor (AST) {

        this.tokens = AST;
        this.mem = {
            variables: {},
            functions: {}
        }; // efecient :)

    }

    execute() {

        const tokens = this.tokens
        
        for (let i in tokens) {
            if ( tokens[i].type.startsWith("PAREN_") ) {
                this.execute(tokens[i].value)
            }
        }

        for (let i in tokens) {
            if ( tokens[i].type === "ASSIGN" ) {
                this.assign(tokens[i])
            }
        }

    }

    assign(token) {
        const value = token.value

        if (token.type === "ASSIGN") {

            //TODO: Add functions

            if (this.mem.variables[token.varName] === undefined) {

                if (token.value.type === "VARIABLE") {
                    token.value = this.mem.variables[token.value.value]
                }

                this.mem.variables[token.varName] = token.value
            } else {
                throw new Error(`Variable ${token.varName} already defined with value ${this.mem.variables[varName]}`)
            }

        }

        console.log(`Assign variable ${token.varName} := ${token.value.value}`)
    }

    compute(token) {

        if (token.type === "OPERATOR") {

        }

        console.log(`Compute the expression ${expression}`)
    }

}

function parseExpression(expr) {
    const tokens = new Lexer(expr).tokenize();
    const ast = generateAbstractSyntaxTree(tokens);
    const parsed = new Parser(ast);
    
    parsed.execute()
    
    return parsed;
}

export {
    matchParenthesis, tokensToParens, parseExpression
}
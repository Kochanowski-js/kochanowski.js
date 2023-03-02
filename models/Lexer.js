import { matchParenthesis, tokensToParens } from "./Parser.js";

class Lexer {
    
    constructor(input) {
      this.input = input.replaceAll(/(^|\n)##.*(\n|$)/g, '');
      this.pos = 0;
      this.currentChar = this.input[this.pos];
    }
  
    /**
     * Tokenizes input text and returns an array of tokens.
     * @returns {Array} An array of tokens.
     */
    tokenize() {
        let tokens = [];
        let currentToken = this.getNextToken();

        while (currentToken.type !== "EOF") {
            tokens.push(currentToken);
            currentToken = this.getNextToken();
        }

        return tokens;
    }

    simplify(tokens) {
        // KPL to readable format, which is then tokenized
        return tokens;
    }

    /**
     * Retrieves the next token from the input text.    
     * @returns {Object} A basic token with type and value
     */
    getNextToken() {
        while (this.currentChar !== null) {

            if (/\s/.test(this.currentChar)) {
                this.skipWhitespace();
                continue;
            }

            if (/[a-z]/i.test(this.currentChar)) {
                return this.handleWord();
            }
        
            if (/\d/.test(this.currentChar)) {
                return this.handleNumber();
            }

            if (/\[|\(/.test(this.currentChar)) {
                const bracket = this.currentChar
                this.advance();
                return { type: "L_PAREN", value: bracket };
            }
        
            if (/\]|\)/.test(this.currentChar)) {
                const bracket = this.currentChar
                this.advance();
                return { type: "R_PAREN", value: bracket };
            }
        
            if (this.currentChar === ",") {
                this.advance();
                return { type: "COMMA", value: "," };
            }

            if (this.currentChar === "-") {
                this.advance();
                return { type: "DASH", value: "-" };
            }

            if (this.currentChar === ";") {
                this.advance();
                return { type: "SEPARATOR", value: ";" };
            }

            if (this.currentChar === '"') {
                let value = '';
                this.pos++;

                while (this.input[this.pos] !== '"') {
                    value += this.input[this.pos++];
                }

                this.advance();
                return { type: 'STRING', value };
            }
        
            const char = this.currentChar;
            this.advance();

            return { type: "SYMBOL", value: char };

        }
        
        return { type: "EOF", value: null };
    }

    handleWord() {
        let word = "";
        while (this.currentChar !== null && /[a-z|1-9]/i.test(this.currentChar)) {
            word += this.currentChar;
            this.advance();
        }
    
        if (this.isKeyword(word)) {
            return { type: "KEYWORD", value: word };
        }

        if (this.isAssign(word)) {
            return { type: "ASSIGN", value: word };
        }

        if (this.isOperator(word)) {
            return { type: "OPERATOR", value: word };
        }
    
        return { type: "VARIABLE", value: word };
    }
    
    handleNumber() {
        let number = "";
        while (this.currentChar !== null && /\d/.test(this.currentChar)) {
            number += this.currentChar;
            this.advance();
        }
    
        return { type: "LITERAL", value: parseInt(number, 10) };
    }
    
    isKeyword(word) {
        return word.match(/function/)
    }

    isAssign(word) {
        return word.match(/def|var|varname|vartype|varvalue/)
    }

    isOperator(word) {
        return word.match(/add|sub|mul|div/)
    }
  
    advance() {
        this.pos++;
        this.currentChar = (this.pos > this.input.length - 1) ? null : this.input[this.pos];
    }
  
    skipWhitespace() {
        while (this.currentChar !== null && /\s/.test(this.currentChar)) {
            this.advance();
        }
    }

}

/**
 * Generates an abstract syntax tree (AST) from an array of tokens.
 *
 * @param {Array} tokens - An array of tokens representing a program.
 * @returns {Object} An abstract syntax tree (AST) representing the program.
 * @throws {Error} If the input is not a valid array of tokens.
 *
 */
function generateAbstractSyntaxTree(tokens) {

    const orderOfOperations = [ /mul|div/, /add|sub/ ]

    // Check if the parenthesis match
    const onlyParens = tokensToParens(tokens);
    if (!matchParenthesis(onlyParens))
        throw new Error("Parenthesis do not match")

    for (let i in tokens) {

        if (tokens[i].type === 'R_PAREN') {

            let endIndex = i;
            while (tokens[i].type !== 'L_PAREN') i--;
            let startIndex = i;

            let newToken = {
                type: `PAREN_${tokens[i].value}`,
                value: generateAbstractSyntaxTree(tokens.slice(startIndex+1, endIndex))
            }

            tokens.splice(startIndex, endIndex - startIndex + 1, newToken);

        }

    }

    for (let o in orderOfOperations) {
        for (let i in tokens) {

            if (tokens[i].type === 'OPERATOR' && orderOfOperations[o].test(tokens[i].value)) {
                
                const newToken = {
                    type: 'OPERATOR',
                    value: tokens[i].value,
                    left: tokens[i-1],
                    right: tokens[parseInt(i)+1]
                }

                tokens.splice(parseInt(i)-1, 3, newToken);
    
            }
    
        }
    }

    for (let i = 0; i < tokens.length; i++) {

        if (tokens[i].type === 'ASSIGN' && tokens[i].value === "def") {

            // correct variable declaration syntax:
            // def [var|fun] (varname NAME) (varvalue VALUE);
            // () = order not required

            const declarationIndex = i;
            let isFunction = tokens[declarationIndex+1] === 'fun';
            
            while (tokens[i].type !== 'ASSIGN' || tokens[i].value !== "varname") i++;
            let varName = tokens[i+1];
            i = declarationIndex;
            
            while (tokens[i].type !== 'ASSIGN' || tokens[i].value !== "varvalue") i++;
            let valueIndex = i+1;

            while (tokens[i].type !== 'SEPARATOR') i++;
            let valueEndIndex = i;

            let value = tokens.slice(valueIndex, valueEndIndex);


            while (tokens[i].type !== 'SEPARATOR') i++;

            const newToken = { type: 'ASSIGN', varName: varName.value, value, isFunction }

            tokens.splice(declarationIndex, i, newToken);

            i = declarationIndex + 1;


        }

    }

    return tokens
}
  
export default Lexer;
export { generateAbstractSyntaxTree };
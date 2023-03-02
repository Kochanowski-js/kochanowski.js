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
                tokens[i] = this.execute(tokens[i].value)
            }
        }

        for (let i in tokens) {
            if ( tokens[i].type === "OPERATOR" ) {
                tokens[i] = this.compute(tokens[i])
            }
        }

        for (let i in tokens) {
            if ( tokens[i].type === "ASSIGN" ) {
                this.assign(tokens[i])
            }
        }

        return tokens

    }

    assign(token) {

        if (token.varName === undefined) {
            console.log(this.tokens)
            throw new Error('Bug in the parser. Variable name undefined')
        }

        if (this.mem.variables[token.varName] !== undefined)
            throw new Error(`Variable ${token.varName} already defined with value ${this.mem.variables[token.varName]}`)

        token.value = token.value[0]

        if (token.value.type === "VARIABLE")
            token.value = this.mem.variables[token.value.value]
            
        if (token.value.type === "OPERATOR")
            token.value = this.compute(token.value);
            
        this.mem.variables[token.varName] = token.value

        // console.log(`Assign variable ${token.varName} := ${token.value}`)
    }

    compute(token) {

        const sign = token.value

        let left = token.left
        let right = token.right
        
        if (left.type === "VARIABLE")
        left.value = this.mem.variables[left.value].value
        
        if (right.type === "VARIABLE")
        right.value = this.mem.variables[right.value].value

        if (left.type === "OPERATOR")
            left = this.compute(left)

        if (right.type === "OPERATOR")
            right = this.compute(right)



        let value;
        switch (sign) {
            case 'add':
                value = left.value + right.value; break
            case 'sub':
                value = left.value - right.value; break
            case 'mul':
                value = left.value * right.value; break
            case 'div':
                if (right.value === 0)
                    throw new Error("Division by 0")
                value = left.value / right.value; break
        }
        
        return {
            type: "LITERAL",
            value
        }

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
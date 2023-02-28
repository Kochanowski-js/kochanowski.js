class Lexer {
    constructor(input) {
      this.input = input;
      this.pos = 0;
      this.currentChar = this.input[this.pos];
    }
  
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
        return word.match(/def|function|args|callback|var|val/)
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

function generateAbstractSyntaxTree(tokens) {

    for (let i in tokens) {

        if (tokens[i].type === 'R_PAREN') {

            let endIndex = i;
            while (tokens[i].type !== 'L_PAREN') i--;
            let startIndex = i;

            const newToken = {
                type: `PAREN_${tokens[i].value}`,
                value: generateAbstractSyntaxTree(tokens.slice(startIndex+1, endIndex))
            }

            tokens.splice(startIndex, endIndex - startIndex + 1, newToken);

        }

    }

    const orderOfOperations = [ /add|sub/, /mul|div/ ]

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

    return tokens
}
  
export default Lexer;
export { generateAbstractSyntaxTree };
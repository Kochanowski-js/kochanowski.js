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

            if (this.currentChar === "[") {
                this.advance();
                return { type: "LEFT_BRACKET", value: "[" };
            }
        
            if (this.currentChar === "]") {
                this.advance();
                return { type: "RIGHT_BRACKET", value: "]" };
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
                this.pos++;
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
        return word.match(/def|function|args|callback|var/)
    }

    isOperator(word) {
        return word.match(/add|sub|return/)
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
  
export default Lexer;
class Lexer {
    constructor(input) {
        this.input = input;
        this.pos = 0;
    }
  
    nextToken() {
        while (this.pos < this.input.length) {
            let char = this.input[this.pos];
            if (char === ' ') {
                this.pos++;
                continue;
            }
            if (char === '+') {
                this.pos++;
                return { type: 'PLUS', value: '+' };
            }
            if (char === '-') {
                this.pos++;
                return { type: 'MINUS', value: '-' };
            }
            if (/\d/.test(char)) {
                let value = '';
                while (this.pos < this.input.length && /\d/.test(this.input[this.pos])) {
                    value += this.input[this.pos++];
                }
                return { type: 'INTEGER', value: parseInt(value) };
            }
            if (char === '"') {
                let value = '';
                this.pos++;
                while (this.input[this.pos] !== '"') {
                  value += this.input[this.pos++];
                }
                this.pos++;
                return { type: 'STRING', value };
            }
            throw new Error(`Unexpected character: ${char}`);
        }

        return { type: 'EOF', value: null };

    }
}

let lexer = new Lexer("3 + 4 - 5 \"kurwa mać\"");

let currentToken = lexer.nextToken();
while (currentToken.type !== 'EOF') {
  console.log(currentToken);
  currentToken = lexer.nextToken();
}
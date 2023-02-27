import Lexer from "../models/Lexer";

describe('Lexer', () => {
    it('Tokenize a string with a single left bracket', () => {
        const input = '[';
        const expectedOutput = [{ type: 'LEFT_BRACKET', value: '[' }];
        const output = new Lexer(input).tokenize();
        expect(output).toEqual(expectedOutput);
    });
  
    it('Tokenize a string with multiple left brackets', () => {
        const input = '[[[';
        const expectedOutput = [
            { type: 'LEFT_BRACKET', value: '[' },
            { type: 'LEFT_BRACKET', value: '[' },
            { type: 'LEFT_BRACKET', value: '[' },
        ];
        const output = new Lexer(input).tokenize();
        expect(output).toEqual(expectedOutput);
    });
  
    it('Tokenize a string with a left bracket and other characters', () => {
        const input = '[abc]';
        const expectedOutput = [
            { type: 'LEFT_BRACKET', value: '[' },
            { type: 'VARIABLE', value: 'abc' },
            { type: 'RIGHT_BRACKET', value: ']' },
        ];
        const output = new Lexer(input).tokenize();
        expect(output).toEqual(expectedOutput);
    });

    it('Tokenize a string with identifiers and operators', () => {
        const input = 'x = 42 * y;';
        const expectedOutput = [
            { type: 'VARIABLE', value: 'x' },
            { type: 'SYMBOL', value: '=' },
            { type: 'LITERAL', value: 42 },
            { type: 'SYMBOL', value: '*' },
            { type: 'VARIABLE', value: 'y' },
            { type: 'SEPARATOR', value: ';' },
        ];
        const output = new Lexer(input).tokenize();
        expect(output).toEqual(expectedOutput);
    });

    it('Tokenize a KPL variable definition', () => {
        const input = 'def var VARNAME val "PIERDOLE TO KURWA JEST 23 GODZINA KURWA JUTRO SPRAWDZIAN Z CHEMII MAM DO KURWY";';
        const expectedOutput = [
            { type: 'KEYWORD', value: 'def' },
            { type: 'KEYWORD', value: 'var' },
            { type: 'VARIABLE', value: 'VARNAME' },
            { type: 'KEYWORD', value: 'val' },
            { type: 'STRING', value: 'PIERDOLE TO KURWA JEST 23 GODZINA KURWA JUTRO SPRAWDZIAN Z CHEMII MAM DO KURWY' },
            { type: 'SEPARATOR', value: ';' },
        ];
        const output = new Lexer(input).tokenize();
        expect(output).toEqual(expectedOutput);
    });
});
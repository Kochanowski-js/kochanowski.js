import Lexer, { generateAbstractSyntaxTree } from "../models/Lexer";

describe('Lexer', () => {
    it('Tokenize a string with a single left bracket', () => {
        const input = '[';
        const expectedOutput = [{ type: 'L_PAREN', value: '[' }];
        const output = new Lexer(input).tokenize();
        expect(output).toEqual(expectedOutput);
    });
  
    it('Tokenize a string with multiple left brackets', () => {
        const input = '[[[';
        const expectedOutput = [
            { type: 'L_PAREN', value: '[' },
            { type: 'L_PAREN', value: '[' },
            { type: 'L_PAREN', value: '[' },
        ];
        const output = new Lexer(input).tokenize();
        expect(output).toEqual(expectedOutput);
    });
  
    it('Tokenize a string with a left bracket and other characters', () => {
        const input = '[abc]';
        const expectedOutput = [
            { type: 'L_PAREN', value: '[' },
            { type: 'VARIABLE', value: 'abc' },
            { type: 'R_PAREN', value: ']' },
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
        const input = 'def varname VARNAME varvalue "hello";';
        const expectedOutput = [
            { type: 'ASSIGN', value: 'def' },
            { type: 'ASSIGN', value: 'varname' },
            { type: 'VARIABLE', value: 'VARNAME' },
            { type: 'ASSIGN', value: 'varvalue' },
            { type: 'STRING', value: 'hello' },
            { type: 'SEPARATOR', value: ';' },
        ];
        const output = new Lexer(input).tokenize();
        expect(output).toEqual(expectedOutput);
    });
});

describe('Abstract Syntax Tree', () => {

    it('Parse basic addition', () => {

        const output = JSON.stringify(
            generateAbstractSyntaxTree(
                new Lexer("2 plus 2").tokenize()
            )
        );

        expect(output).toEqual("[{\"type\":\"LITERAL\",\"value\":2},{\"type\":\"VARIABLE\",\"value\":\"plus\"},{\"type\":\"LITERAL\",\"value\":2}]")

    });

    it('Parse brackets', () => {

        const output = JSON.stringify(
            generateAbstractSyntaxTree(
                new Lexer("[2 plus 2]").tokenize()
            )
        );

        expect(output).toEqual("[{\"type\":\"PAREN_[\",\"value\":[{\"type\":\"LITERAL\",\"value\":2},{\"type\":\"VARIABLE\",\"value\":\"plus\"},{\"type\":\"LITERAL\",\"value\":2}]}]")

    });

    it('Parse simple computations with the correct order of operations', () => {

        const output = JSON.stringify(
            generateAbstractSyntaxTree(
                new Lexer("(2 plus 2) mul (85 div 2137)").tokenize()
            )
        );

        expect(output).toEqual("[{\"type\":\"OPERATOR\",\"value\":\"mul\",\"left\":{\"type\":\"PAREN_(\",\"value\":[{\"type\":\"LITERAL\",\"value\":2},{\"type\":\"VARIABLE\",\"value\":\"plus\"},{\"type\":\"LITERAL\",\"value\":2}]},\"right\":{\"type\":\"PAREN_(\",\"value\":[{\"type\":\"OPERATOR\",\"value\":\"div\",\"left\":{\"type\":\"LITERAL\",\"value\":85},\"right\":{\"type\":\"LITERAL\",\"value\":2137}}]}}]")

    });

    it('Parse variable assignment', () => {

        const output = JSON.stringify(
            generateAbstractSyntaxTree(
                new Lexer("def var varname foo varvalue 123;").tokenize()
            )
        );

        expect(output).toEqual("[{\"type\":\"ASSIGN\",\"varName\":{\"type\":\"VARIABLE\",\"value\":\"foo\"},\"value\":{\"type\":\"LITERAL\",\"value\":123},\"isFunction\":false},{\"type\":\"SEPARATOR\",\"value\":\";\"}]")

    });

})
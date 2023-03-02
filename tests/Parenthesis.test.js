import { matchParenthesis, tokensToParens } from "../models/Parser";

describe('matchParenthsis', () => {
    it('Should return true for an empty string', () => {
        expect(matchParenthesis('')).toBe(true);
    });

    it('Should return true for a string with balanced parentheses', () => {
        expect(matchParenthesis('(())')).toBe(true);
        expect(matchParenthesis('(){}[]')).toBe(true);
        expect(matchParenthesis('{[()]}')).toBe(true);
        expect(matchParenthesis('([]){}')).toBe(true);
        expect(matchParenthesis('({[]})')).toBe(true);
        expect(matchParenthesis('[({})]')).toBe(true);
        expect(matchParenthesis('(([]){}[()])(){}[()]')).toBe(true);
    });

    it('Should return false for a string with unbalanced parentheses', () => {
        expect(matchParenthesis('(]')).toBe(false);
        expect(matchParenthesis('([)]')).toBe(false);
        expect(matchParenthesis('{(})')).toBe(false);
        expect(matchParenthesis('([)]')).toBe(false);
        expect(matchParenthesis('((')).toBe(false);
        expect(matchParenthesis('))')).toBe(false);
    });
});

describe('tokensToParens', () => {
    it('Returns a string with only opening and closing parenthesis characters', () => {
        const tokens = [ 
            { value: '[' }, { value: 'foo' }, { value: ']' }, { value: '(' }, { value: ')' },
            { value: '{' }, { value: '}' },
        ];
        const result = tokensToParens(tokens);
        expect(result).toEqual('[](){}');
    });
  
    it('Returns an empty string if there are no parenthesis characters', () => {
        const tokens = [
            { value: 'foo' }, { value: 'bar' }, { value: 'baz' },
        ];
        const result = tokensToParens(tokens);
        expect(result).toEqual('');
    });
  
    it('Works with different sets of parenthesis characters', () => {
        const tokens = [ 
            { value: 'foo' }, { value: '[' }, { value: 'bar' }, { value: ']' },
            { value: '{' }, { value: '}' }, { value: '(' }, { value: 'baz' }, { value: ')' },
        ];
        const result = tokensToParens(tokens);
        expect(result).toEqual('[]{}()');
    });
  });
  
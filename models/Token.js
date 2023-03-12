import { KError } from "./ErrorHandler.js";
import Lexer from "./Lexer.js";

/**
 * Token class for Lexer.
 * @class
 */
class Token {
 
    /**
     * Creates a new Token object.
     * @constructor
     * @param {string} type - The type of the token
     * @param {string} value - The value of the token
     * @param {Object} ctx - Additional info for error handling (optional)
     */
    constructor (type, value, ctx) {
        this.type = type;
        this.value = value;

        // Error Handling
        this.ctx = ctx;
    }

    throwError(code) {
        throw new KError(code, this.ctx);
    }

}

class EOFToken extends Token {

    /**
     * End of File token
     * @param {Lexer} lexer - When used inside a Lexer, use "this" keyword.
     */
    constructor (lexer) {

        const pos = lexer.getPos()
        const lineContent = lexer.getLine(pos[0]);

        super("EOF", null, {line: pos[0], col: pos[1], code: lineContent});
    }

}

class LiteralToken extends Token {

    /**
     * Token for strings, integers, booleans, floats etc.
     * @param {Lexer} lexer - When used inside a Lexer, use "this" keyword.
     * @param {string} type - The type of the token.
     * @param {string|number} value - The literal value of the token. 
     */
    constructor (lexer, type, value) {

        const pos = lexer.getPos()
        const lineContent = lexer.getLine(pos[0]);

        super(type, value, {line: pos[0], col: pos[1], code: lineContent});

    }


}

class AssignOperator extends Token {

    /**
     * Token for strings, integers, booleans, floats etc.
     * @param {string} name - The name of the variable
     * @param {LiteralToken} value - The value of the variable. 
     */
    constructor (name, value) {

        if (value[0].ctx !== undefined) {
            super("ASSIGN", value, value[0].ctx);
        } else {
            super("ASSIGN", value);
        }
        
        this.varName = name;
        this.isFunction = false; // TODO
        this.isDefine = true; // TODO

    }

} 

export {
    Token, EOFToken, LiteralToken, AssignOperator
}
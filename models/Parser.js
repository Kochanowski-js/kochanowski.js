import Lexer from "./Lexer";

const lexer = new Lexer(`def function FUNCNAME args [A,B,C] callback 1 LINES1;`);

let currentToken = lexer.getNextToken();
while (currentToken.type !== "EOF") {
  console.log(currentToken);
  currentToken = lexer.getNextToken();
}
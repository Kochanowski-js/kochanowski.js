import Lexer from "./Lexer.js";

const input = new Lexer(`def var X val 5; def var X val 5;`).tokenize();
const output = [];
let currentGroup = [];

for (const item of input) {
    if (item.type === "SEPARATOR") {
        output.push(currentGroup);
        currentGroup = [];
    } else {
        currentGroup.push(item);
    }
}

if (currentGroup.length > 0) {
    output.push(currentGroup);
}

console.log(output);

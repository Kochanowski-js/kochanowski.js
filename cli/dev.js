import { parseExpression } from "../models/Parser.js";
import fs from "fs";

function dev() {

    const input = fs.readFileSync("index.kpl", 'utf8');    
    const output = parseExpression(input);

    console.table(output.mem.variables)

}

export { dev }
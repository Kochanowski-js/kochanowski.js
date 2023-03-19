import { parseExpression } from "../models/Parser.js";
import fs from "fs";
import { KError } from "../models/ErrorHandler.js";
async function dev() {

    const input = fs.readFileSync("index.kpl", 'utf8');
    const output = parseExpression(input);

}

export { dev }
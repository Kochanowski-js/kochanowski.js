import { parseExpression } from "../models/Parser.js";
import fs from "fs";
import { KError } from "../models/ErrorHandler.js";
async function dev() {

    const input = fs.readFileSync("index.kpl", 'utf8');
    const output = parseExpression(input)

    console.log('Variables:')
    for (let i in output.mem.variables) {
        console.log(" *", i, output.mem.variables[i].value)
    }

    new KError(1, {
        line: 64,
        col: 50,
        fileName: "index.kpl",
        code: "Lorem ipsum dolor sit amet consectenur adipisit sit elit. Make the line longer so it fits somewhere",
    })

}

export { dev }
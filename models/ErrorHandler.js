import chalk from "chalk";
import terminalLink from 'terminal-link';
import { choose } from "../utils/Math.js";
import errorCodes from "../dict/errorCodes.js";

const newLine = "\n";

/**
 * Custom error handler so it looks nice
 */
class KError {

    constructor(code, context) {
        this.code = code;
        this.context = context;

        const documentationLink = `https://github.com/Kochanowski-js/kochanowski.js/wiki/Errors#${this.code}`

        console.log("");

        switch (code % 4) {
            case 0:
                console.log(chalk.bgYellow.bold(`     ⚠  E${this.code}: ${errorCodes[this.code][0]}`.padEnd(64)))
                break;
            
            case 1:
                console.log(chalk.bgRedBright.bold(`     ⚠  E${this.code}:  ${errorCodes[this.code][0]}`.padEnd(64)))
                break;
        
            default:
                break;
        }

        console.log("");

        if (context !== undefined) {

            const parsedString = trimStringWithFocus(context.code, 64-6, context.col);

            console.log("     "+chalk.gray(`line ${chalk.white(context.line)};${chalk.white(context.col)} of ${chalk.white(context.fileName)}:`))
            console.log("     "+parsedString[0])
            console.log("     "+ chalk.bold.blue("▲ HERE".padStart(parsedString[1]+6))+"\n")
            
        }

        if (errorCodes[this.code][1]) {
            console.log("     "+chalk.blue(`Hint: ${errorCodes[this.code][1]}\n`));
        }
            
            console.log(chalk.italic.gray("     "+"ⓘ  Get more information on", terminalLink("the official documentation", documentationLink)))

        console.log()


        process.exit(1);

    }


}

class ScoreError extends KError {
  /**
   * Throw an error when not enough points.
   * @param {number[]} points Array of points per each cathegory
   */
  constructor(points) {
    const sum = points.reduce((a, b) => a + b, 0);
    const passed = sum >= 40;

    // TODO: If you have a better way of creating this string, feel free to change it.
    const message = `${!passed ? "Nieodpowiednia" : "Odpowiednia"} ilość punktow:` +
                    `\n\n 1. Styl:` +
                    `\n * Ilość sylab w linijce: ${points[0]}pkt` +
                    `\n * Długość tekstu: ${points[1]}pkt` +
                    `\n * Antyczność słownictwa:` +
                    `\n * Partiotyczność:` +
                    `\n\n 2. Poprawność merytoryczna:` +
                    `\n * co?` +
                    `\n\n Łącznie: ${sum}pkt/40pkt (Minimum)`+
                    `\n Komentarz: ${splash(sum)}`;

    super(message, passed ? 2 : 0);
  }
}

function trimStringWithFocus(str, maxLength, focusColumn) {

    const leftBound = Math.max(focusColumn - Math.floor(maxLength / 2), 0);
    const rightBound = Math.min(leftBound + maxLength - 1, str.length - 1);
  
    let trimmedStr = str.substring(leftBound, rightBound + 1);
    if (leftBound > 0) {
      trimmedStr = "…" + trimmedStr.substring(1);
    }
    if (rightBound < str.length - 1) {
      trimmedStr = trimmedStr.substring(0, maxLength - 1) + "…";
    }
  
    const newFocusColumn = focusColumn - leftBound;
    return [ trimmedStr, newFocusColumn ];
    
}
  

export { ScoreError, KError };

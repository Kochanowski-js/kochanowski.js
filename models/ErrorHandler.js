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

        if (errorCodes[this.code] === undefined) {
            throw new KError(2)
        }

        const args = process.argv.slice(2);
        const useNerd = args.includes("--nerd");

        let icons = {};
        icons.warning = (useNerd) ? "\uea6c" : "⚠";
        icons.error = (useNerd) ? "\uea87" : "⚠";
        icons.debug = (useNerd) ? "\uebdc" : "⚠";
        icons.success = (useNerd) ? "" : "⚠";
        
        icons.arrow = (useNerd) ? "\uf0aa" : "▲ ";
        icons.hint = (useNerd) ? "\uea61 " : "";
        icons.docs = (useNerd) ? "\udb81\udd9f" : "ⓘ ";
        
        const documentationLink = `https://github.com/Kochanowski-js/kochanowski.js/wiki/Errors#${this.code}`

        console.log("");

        switch (errorCodes[this.code][0]) {
            case 1:
                console.log(chalk.bgYellow.bold(`     ${icons.warning}  E${this.code}: ${errorCodes[this.code][1]}`.padEnd(64)))
                break;
            
            case 0:
                console.log(chalk.bgRedBright.bold(`     ${icons.error}  E${this.code}: ${errorCodes[this.code][1]}`.padEnd(64)))
                break;

            case 3:
                console.log(chalk.bgBlue.bold(`     ${icons.debug}  E${this.code}: ${errorCodes[this.code][1]}`.padEnd(64)))
                break;
                
            default:
                break;
        }

        console.log("");

        if (context !== undefined) {

            const parsedString = trimStringWithFocus(context.code, 64-6, context.col);

            console.log("     "+chalk.gray(`line ${chalk.white(context.line)};${chalk.white(context.col)}: `))
            console.log("     "+parsedString[0])
            console.log("     "+ chalk.bold.blue((icons.arrow + "  HERE").padStart(parsedString[1]+4))+"\n")
            
        }

        if (errorCodes[this.code][2]) {
            console.log("     "+chalk.blue(`${icons.hint}Hint: ${errorCodes[this.code][2]}`));
        }
            
        // remove?
        console.log(chalk.italic.gray("     "+icons.docs+" Get more information on", terminalLink("the official documentation", documentationLink)))

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

import chalk from "chalk";
import errorCodes from "../dict/errorCodes.js";

const args = process.argv.slice(2);
const useNerd = args.includes("--nerd");

const icons = {
    arrow: useNerd ? "\uf0aa" : "▲ ",
    docs: useNerd ? "\udb81\udd9f" : "ⓘ "
};

const errorTypes = {
    1: { bg: 'bgYellow', icon: "\uea6c" },
    0: { bg: 'bgRedBright', icon: "\uea87" },
    3: { bg: 'bgBlue', icon: "\uebdc" },
};

function KError(code, context) {

    if (errorCodes[code] === undefined) throw new KError(2)

    console.log();

    const { bg, icon } = errorTypes[errorCodes[code][0]];
    const message = `     ${useNerd ? icon: "⚠"}  E${code}: ${errorCodes[code][1]}`.padEnd(64);

    console.log(chalk[bg].bold(message));
    console.log();

    if (context !== undefined) {
        const parsedString = trimStringWithFocus(context.code, 64 - 6, context.col);
    
        console.log(`     ${chalk.gray(`line ${chalk.white(context.line)};${chalk.white(context.col)}: `)}`);
        console.log(`     ${parsedString[0]}`);
        console.log(`     ${chalk.bold.blue(`${icons.arrow}  HERE`.padStart(parsedString[1] + 4))}\n`);
    }

    if (errorCodes[code][2]) {
        console.log(`     ${chalk.blue(`Hint: ${errorCodes[code][2]}`)}`);
    }

    process.exit(1);

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
  

export { KError };

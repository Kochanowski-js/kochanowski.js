import getStem from 'stemmer_pl';
import { operationsRegex } from "./regex";

let memory: Record<string, any> = {};

function generateName(name: string): string {
  return name.split(" ").map(getStem).join("_");
}

/**
 * Parses the input value to return a number, a value from memory, or evaluates 
 * an operation based on `operators.json`.
 * 
 * @param {string} value - The string value to be parsed.
 * @returns {any} The parsed value, which could be a number, a value from memory, or the result of an evaluated operation.
 * @throws {Error} - Throws an error if an unsupported operation is encountered.
 */
function parseValue(value: string): any {
  value = value.trim();

  if (!isNaN(Number(value))) {
    return Number(value);
  }

  if (memory[generateName(value)] !== undefined) {
    return memory[generateName(value)];
  }

  // Recursive operation parsing
  for (const [key, regex] of Object.entries(operationsRegex)) {
    const match = value.match(regex);
    if (match) {
      const parsedOperands = match.slice(1).map(parseValue);
      const operations: Record<string, (a: any, b: any) => any> = {
        add: (a, b) => a + b,
        subtract: (a, b) => a - b,
        multiply: (a, b) => a * b,
        divide: (a, b) => a / b,
        greater_than: (a, b) => a > b,
        less_than: (a, b) => a < b,
        greater_or_equal: (a, b) => a >= b,
        less_or_equal: (a, b) => a <= b,
        equal: (a, b) => a === b,
        not_equal: (a, b) => a !== b
      };

      const operation = operations[key];
      if (operation) {
        return operation(parsedOperands[0], parsedOperands[1]);
      } else {
        throw new Error(`Unsupported operation: ${key}`);
      }
    }
  }
  return value;
}

/**
 * Executes a given instruction by performing an action based on the instruction type.
 * 
 * @param {Instruction} instruction - The instruction to be executed. 
 * @returns {void}
 */
export function executeInstruction(instruction: Instruction): boolean | void {

  switch (instruction.type) {
    case "assign":
    case "create":
      memory[generateName(instruction.params[0])] = parseValue(instruction.params[1]);
      break;
    case "print":
      console.log(parseValue(instruction.params[0]));
      break;
    case "if":
      return parseValue(instruction.params[0]);
    default:
      break;
  }
}
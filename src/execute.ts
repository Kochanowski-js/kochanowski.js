import schemasData from "../data/schemas.json";
import getStem from 'stemmer_pl';
import { operationsRegex } from "./regex";

const schemas = schemasData as Schemas;
let memory: Record<string, any> = {};
let conditionStack: { condition: boolean, skipping: boolean }[] = [];
let executionStack: boolean[] = [];

function createVariable(name: string, value: any) {
  if (doesVariableExist(name)) {
    throw new Error(`Variable ${name} already declared.`);
  } else {
    memory[generateName(name)] = parseValue(value);
  }
}

function assignVariable(name: string, value: any) {
  if (!doesVariableExist(name)) {
    throw new Error(`Variable ${name} is not declared.`);
  } else {
    memory[generateName(name)] = parseValue(value);
  }
}

function doesVariableExist(name: string): boolean {
  return !!memory[generateName(name)];
}

function generateName(name: string) {
  return variableStemmer(name);
}

function parseValue(value: string): any {
  value = value.trim();

  if (!isNaN(Number(value))) {
    return Number(value);
  }

  if (doesVariableExist(value)) {
    return memory[generateName(value)];
  }

  // Recursive operation parsing
  for (const [key, regex] of Object.entries(operationsRegex)) {
    const match = value.match(regex);
    if (match) {
      const parsedOperands = match.slice(1).map(parseValue);
      switch (key) {
        case 'add':
          return parsedOperands[0] + parsedOperands[1];
        case 'subtract':
          return parsedOperands[0] - parsedOperands[1];
        case 'multiply':
          return parsedOperands[0] * parsedOperands[1];
        case 'divide':
          return parsedOperands[0] / parsedOperands[1];
        case 'greater_than':
          return parsedOperands[0] > parsedOperands[1];
        case 'less_than':
          return parsedOperands[0] < parsedOperands[1];
        case 'greater_or_equal':
          return parsedOperands[0] >= parsedOperands[1];
        case 'less_or_equal':
          return parsedOperands[0] <= parsedOperands[1];
        case 'equal':
          return parsedOperands[0] === parsedOperands[1];
        case 'not_equal':
          return parsedOperands[0] !== parsedOperands[1];
        default:
          throw new Error(`Unsupported operation: ${key}`);
      }
    }
  }
  return value;
}

function variableStemmer(name: string): string {
  return name.split(" ").map(getStem).join("_");
}


export function execute(instruction: Instruction): void {

  // Determine whether to skip execution based on the condition stack
  const shouldSkip = conditionStack.length > 0 && conditionStack[conditionStack.length - 1].skipping;

  switch (instruction.name) {
    case "create":
      if (!shouldSkip) createVariable(instruction.values[0], instruction.values[1]);
      break;
    case "assign":
      if (!shouldSkip) assignVariable(instruction.values[0], instruction.values[1]);
      break;
    case "print":
      if (!shouldSkip) console.log(parseValue(instruction.values[0]));
      break;
    case "if":
      const conditionResult = parseValue(instruction.values[0]) as boolean;
      conditionStack.push({ condition: conditionResult, skipping: !conditionResult });
      executionStack.push(!conditionResult);
      break;
    case "else":
      if (conditionStack.length === 0) {
        throw new Error("Else without matching if.");
      }
      const topIf = conditionStack[conditionStack.length - 1];
      topIf.skipping = topIf.condition;
      executionStack.push(topIf.skipping);
      break;
    case "endif":
      if (conditionStack.length === 0) {
        throw new Error("End if without matching if.");
      }
      conditionStack.pop();
      executionStack.pop();
      break;
    case "loop":
      if (!shouldSkip) console.log(`TODO loop cn(${instruction.values[0]}) 1..m(${instruction.values[1]})`); // Implement iterator loop
      break;
    case "endloop":
      if (!shouldSkip) console.log(`TODO endloop`); // Implement loop end
      break;
    case "unknown":
      break;
    default:
      throw new Error(`Unknown token name: ${instruction.name}`);
  }
}
import { Token } from "./patterns";
import schemasData from "../data/schemas.json";
import getStem from 'stemmer_pl';
import { Schemas, operationsRegex } from "./regex";

type ParsedValue = string | number | ParsedOperation;

interface ParsedOperation {
  type: string;
  operands: ParsedValue[];
}

const schemas = schemasData as Schemas;
let memory: Record<string, any> = {};
let conditionStack: { condition: boolean, skipping: boolean }[] = [];
let executionStack: boolean[] = []; // Stack to manage execution state within conditional blocks

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

export function execute(token: Token): void {
  const schema = schemas[token.name];
  if (!schema) {
    throw new Error(`Schema not found for token name: ${token.name}`);
  }

  // Determine whether to skip execution based on the condition stack
  const shouldSkip = conditionStack.length > 0 && conditionStack[conditionStack.length - 1].skipping;

  switch (token.name) {
    case "create":
    case "create_no_name":
    case "create_short":
      if (!shouldSkip) createVariable(token.values[0], token.values[1]);
      break;
    case "create_reverse":
      if (!shouldSkip) createVariable(token.values[1], token.values[0]);
      break;
    case "assign":
    case "assign_short":
    case "assign_shortest":
      if (!shouldSkip) assignVariable(token.values[0], token.values[1]);
      break;
    case "assign_reverse":
    case "assign_reverse_no_name":
    case "assign_reverse_short":
    case "assign_reverse_shortest":
      if (!shouldSkip) assignVariable(token.values[1], token.values[0]);
      break;
    case "print":
      if (!shouldSkip) console.log(parseValue(token.values[0]));
      break;
    case "if_clause_start":
      const conditionResult = parseValue(token.values[0]) as boolean;
      conditionStack.push({ condition: conditionResult, skipping: !conditionResult });
      executionStack.push(!conditionResult);
      break;
    case "if_clause_else":
      if (conditionStack.length === 0) {
        throw new Error("Else without matching if.");
      }
      const topIf = conditionStack[conditionStack.length - 1];
      topIf.skipping = topIf.condition;
      executionStack.push(topIf.skipping);
      break;
    case "if_clause_end":
      if (conditionStack.length === 0) {
        throw new Error("End if without matching if.");
      }
      conditionStack.pop();
      executionStack.pop();
      break;
    case "loop_start":
    case "loop_start_short":
      if (!shouldSkip) console.log(`TODO loop i 1..m(${token.values[0]})`); // Implement loop start
      break;
    case "loop_start_iterator":
      if (!shouldSkip) console.log(`TODO loop cn(${token.values[0]}) 1..m(${token.values[1]})`); // Implement iterator loop
      break;
    case "loop_end":
      if (!shouldSkip) console.log(`TODO endloop`); // Implement loop end
      break;
    case "not_found":
      break;
    default:
      throw new Error(`Unknown token name: ${token.name}`);
  }
}

function variableStemmer(name: string): string {
  return name.split(" ").map(getStem).join("_");
}

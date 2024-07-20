import { Token } from "./patterns";
import schemasData from "../data/schemas.json"
import getStem from 'stemmer_pl'
import { Schemas, operationsRegex } from "./regex";

type ParsedValue = string | number | ParsedOperation;
interface ParsedOperation {
  type: string;
  operands: ParsedValue[];
}

const schemas = schemasData as Schemas;
var memory: Record<string, any> = {};

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

  // If it's a number, return as a number
  if (!isNaN(Number(value))) {
    return Number(value);
  }

  // If it's a variable, return its value
  if (doesVariableExist(value)) {
    return memory[generateName(value)];
  }

  // Check for operations
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
        // Add more operations as needed
        default:
          throw new Error(`Unsupported operation: ${key}`);
      }
    }
  }

  // If it's a string, return as is
  return value;
}


export function execute(token: Token): string {

  const schema = schemas[token.name];
  if (!schema) {
    throw new Error(`Schema not found for token name: ${token.name}`);
  }

  switch (token.name) {
    case "create":
    case "create_no_name":
    case "create_short":
      createVariable(token.values[0], token.values[1])
      break;
    case "create_reverse":
      createVariable(token.values[1], token.values[0])
      break;
    case "assign":
    case "assign_short":
    case "assign_shortest":
      assignVariable(token.values[0], token.values[1])
      break;
    case "assign_reverse":
    case "assign_reverse_no_name":
    case "assign_reverse_short":
    case "assign_reverse_shortest":
      assignVariable(token.values[1], token.values[0])
      break;
    case "print":
      console.log(parseValue(token.values[0]))
      break;
    case "if_clause_start":
      console.log(`TODO if m(${token.values[0]})`) // TO BE IMPLEMENTED
      break;
    case "if_clause_else":
      console.log(`TODO else`) // TO BE IMPLEMENTED
      break;
    case "if_clause_end":
      console.log(`TODO endif`) // TO BE IMPLEMENTED
      break;
    case "loop_start":
    case "loop_start_short":
      console.log(`TODO loop i 1..m(${token.values[0]})`) // TO BE IMPLEMENTED
      break;
    case "loop_start_iterator":
      console.log(`TODO loop cn(${token.values[0]}) 1..m(${token.values[1]})`) // TO BE IMPLEMENTED
      break;
    case "loop_end":
      console.log(`TODO endloop`) // TO BE IMPLEMENTED
    default:
      throw new Error(`Unknown token name: ${token.name}`);

  }
  return "console.log(':3')"; // will remove soon, it's needed because of later execution steps

}

function variableStemmer(name: string): string {
  return name.split(" ").map(getStem).join("_");
}
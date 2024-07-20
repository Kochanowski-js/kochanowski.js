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

function parseValue(value: string): ParsedValue {

  value = value.trim();

  if (!isNaN(Number(value))) {
    return `int:${value}`;
  }

  if (doesVariableExist(value)) {
    return `var:${value}`;
  }

  for (const [key, regex] of Object.entries(operationsRegex)) {
    const match = value.match(regex);
    if (match) {
      const parsedOperands = match.slice(1).map(parseValue);
      return {
        type: key,
        operands: parsedOperands
      };
    }
  }

  return `str:"${value}"`;
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
      console.log(`var cn(${token.values[0]}) = m(${token.values[1]})`)
      break;
    case "create_reverse":
      createVariable(token.values[1], token.values[0])
      console.log(`var cn(${token.values[1]}) = m(${token.values[0]})`)
      break;
    case "assign":
    case "assign_short":
    case "assign_shortest":
      assignVariable(token.values[0], token.values[1])
      console.log(`cn(${token.values[0]}) := m(${token.values[1]})`)
      break;
    case "assign_reverse":
    case "assign_reverse_no_name":
    case "assign_reverse_short":
    case "assign_reverse_shortest":
      assignVariable(token.values[1], token.values[0])
      console.log(`cn(${token.values[1]}) := m(${token.values[0]})`)
      break;
    case "print":
      console.log(`out << m(${token.values[0]})`)
      break;
    case "if_clause_start":
      console.log(`if m(${token.values[0]})`)
      break;
    case "if_clause_else":
      console.log(`else`)
      break;
    case "if_clause_end":
      console.log(`endif`)
      break;
    case "loop_start":
    case "loop_start_short":
      console.log(`loop i 1..m(${token.values[0]})`)
      break;
    case "loop_start_iterator":
      console.log(`loop cn(${token.values[0]}) 1..m(${token.values[1]})`)
      break;
    case "loop_end":
      console.log(`endloop`)

    default:
      break;
  }

  console.log(memory)

  // console.log(token.name)
  return "console.log(':3')";
  // return translateValues(translation, formattedValues);

}

function variableStemmer(name: string): string {
  return name.split(" ").map(getStem).join("_");
}
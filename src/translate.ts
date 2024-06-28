import { getPatternValues, Token } from "./patterns";
import schemasData from "../data/schemas.json"
import getStem from 'stemmer_pl'
const schemas = schemasData as Schemas;

enum VariableTypes { STRING, NUMBER, NAME, VALUE }

type Schemas = Record<string, { translation: string; schema: string; type: VariableTypeString[] }>;
type VariableTypeString = keyof typeof VariableTypes;


function formatVariable(input: string, type: VariableTypes): string {
  switch (type) {
    case VariableTypes.STRING:
      return `"${input}"`;

    case VariableTypes.NUMBER:
      const parsedNumber = parseFloat(input);

      if (isNaN(parsedNumber)) {
        throw new Error(`Invalid number input: ${input}`);
      }

      return parsedNumber.toString();

    case VariableTypes.NAME:
      if (input[0] === '"') {
        return input;
      }

      return variableStemmer(input)

    case VariableTypes.VALUE:
      const numValue = parseFloat(input);

      if (!isNaN(numValue)) {
        return numValue.toString();
      }

      const token = getPatternValues(input);

      if (!token) {
        throw new Error(`Invalid value input: ${input}`);
      }

      return interpret(token);

    default:
      throw new Error(`Unsupported type: ${type}`);


  }
}

/**
 * Translate pattern to JavaScript
 * @param token KPL pattern
 * @returns JavaScript code
 */
export function interpret(token: Token): string {

  const schema = schemas[token.name];
  if (!schema || !schema.translation || !schema.type) {
    throw new Error(`Schema not found for token name: ${token.name}`);
  }

  const types = schema.type;
  const formattedValues = token.values.map((value, index) => {
    const valueType = VariableTypes[types[index]];
    return formatVariable(value, valueType);
  });

  const translation = schema.translation;
  return translateValues(translation, formattedValues);

}

/**
 * Translates placeholder values in a string using a provided array of values.
 * @param input The string containing placeholders in the format {0}
 * @param values An array of strings to replace the placeholders
 * @returns The translated string with placeholders replaced by corresponding values
 */
function translateValues(input: string, values: string[]): string {

  return input.replace(/{(\d+)}/g, (_match, indexStr) => {
    const index = Number(indexStr);

    if (isNaN(index) || index < 0 || index >= values.length) {
      throw new RangeError(`Placeholder index {${index}} is out of bounds`);
    }

    return values[index];
  });

}

function variableStemmer(name: string): string {
  return name.split(" ").map(getStem).join("_");
}
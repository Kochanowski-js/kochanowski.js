import { getPatternValues, Token } from "./patterns";

type Schemas = Record<string, { translation: string; schema: string; type: string[] }>;
import schemasData from "../data/schemas.json"
const schemas = schemasData as Schemas;

enum VariableTypes {
  "STRING",
  "NUMBER",
  "NAME",
  "VALUE"
}

function formatVariable(input: string, type: VariableTypes = VariableTypes.STRING): string {
  switch (type) {
    case VariableTypes.STRING:
      return '"' + input + '"';
    case VariableTypes.NUMBER:
      return parseFloat(input).toString();
    case VariableTypes.NAME:
      return input.replaceAll(" ", "_").toLocaleLowerCase()
    case VariableTypes.VALUE:

      if (!isNaN(Number(input))) {
        return parseFloat(input).toString()
      }

      const token = getPatternValues(input);
      return translate(token);

  }
}

/**
 * Translate pattern to JavaScript
 * @param token KPL pattern
 * @returns JavaScript code
 */
export function translate(token: Token): string {
  const types = schemas[token.name].type;
  const formattedValues = token.values.map((value, index) => {
    const valueType = types ? VariableTypes[types[index] as keyof typeof VariableTypes] : VariableTypes.STRING;
    return formatVariable(value, valueType);
  });

  const translation = schemas[token.name].translation;
  return translateValues(translation, formattedValues);
}

/**
 * Translates placeholder values in a string using a provided array of values.
 * @param translation The string containing placeholders in the format {0}
 * @param values An array of strings to replace the placeholders
 * @returns The translated string with placeholders replaced by corresponding values
 */
function translateValues(translation: string, values: string[]): string {
  return translation.replace(/{(\d+)}/g, (_, index) => values[parseInt(index)]);
}
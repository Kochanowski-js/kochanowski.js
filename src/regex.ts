type Synonyms = Record<string, string[]>;
export type Schemas = Record<string, string>;

import synonymsData from "../data/synonyms.json"
import schemasData from "../data/schemas.json"
import operationsData from "../data/operators.json"
const synonyms = synonymsData as Synonyms;
const schemas = schemasData as Schemas;
const operations = operationsData as Synonyms;

/**
 * This function creates a regular expression of a schema using synonyms from external data. 
 * @param schema String of a schema, where arguments are "{}"
 * @returns Regular expression matching the schema with flag "i"
 */
function buildRegex(schema: string): RegExp {
  const synonymMap = schema.split(" ").map(word =>
    word === "{}" ? '(.+)' : `(?:${synonyms[word].join("|")})`
  ).join(" ");

  return new RegExp(synonymMap, 'i');
}

function buildOperatorRegex(values: string[]): RegExp {
  return new RegExp(`(.+)\\s+(?:${values.join("|")})\\s+(.+)`, 'i')
}

// Building regex for each schema and storing them in an object
const schemasRegex: Record<string, RegExp> = Object.fromEntries(
  Object.entries(schemas).map(([key, value]) => [key, buildRegex(value)])
);

const operationsRegex: Record<string, RegExp> = Object.fromEntries(
  Object.entries(operations).map(([key, value]) => [key, buildOperatorRegex(value)])
);

export default schemasRegex;
export { operationsRegex };
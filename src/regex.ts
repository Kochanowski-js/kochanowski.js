import synonymsData from "../data/synonyms.json"
import schemasData from "../data/schemas.json"
import operationsData from "../data/operators.json"

const synonyms: Synonyms = synonymsData;
const schemas: Schemas = schemasData;
const operations: Operations = operationsData;

/**
 * This function creates a regular expression of a schema using synonyms from external data. 
 * @param schema - String of a schema, where arguments are "{}"
 * @returns Regular expression matching the schema with flag "i"
 */
function buildRegex(schema: string): RegExp {
  const synonymMap = schema.split(" ").map(word =>
    word === "{}" ? '(.+)' : `(?:${synonyms[word].join("|")})`
  ).join(" ");

  return new RegExp(synonymMap, 'i');
}

/**
 * This function creates a regular expression for operations using provided values.
 * @param values - Array of operator strings
 * @returns Regular expression matching the operations with flag "i"
 */
function buildOperatorRegex(values: string[]): RegExp {
  return new RegExp(`(.+)\\s+(?:${values.join("|")})\\s+(.+)`, 'i');
}

// Building regex for each schema and storing them in an object
export const schemasRegex: RegexDictionary = Object.fromEntries(
  Object.entries(schemas).map(([key, value]) => [key, buildRegex(value)])
);

// Building regex for each operation and storing them in an object
export const operationsRegex: RegexDictionary = Object.fromEntries(
  Object.entries(operations).map(([key, value]) => [key, buildOperatorRegex(value)])
);
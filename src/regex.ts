type Synonyms = Record<string, string[]>;
type Schemas = Record<string, { translation: string; schema: string; type: string[] }>;

import synonymsData from "../data/synonyms.json"
import schemasData from "../data/schemas.json"
const synonyms = synonymsData as Synonyms;
const schemas = schemasData as Schemas;

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

// Building regex for each schema and storing them in an object
const schemasRegex: Record<string, RegExp> = Object.fromEntries(
  Object.entries(schemas).map(([key, value]) => [key, buildRegex(value.schema)])
);

export default schemasRegex;
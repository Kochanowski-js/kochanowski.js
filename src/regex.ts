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
  const synonymMap = schema.split(" ").map(key => {
    if (key == "{}") {
      return '(.+)'; // Group element
    } else {
      return `(?:${synonyms[key].join("|")})`; // [a, b, c] -> (?:a|b|c)
    }
  }).join(" ");

  return new RegExp(synonymMap, 'i');
}

const schemasRegex: Record<string, RegExp> = {};

// Building schemas for every row in `schemas.json` 
for (const [key, value] of Object.entries(schemas)) {
  schemasRegex[key] = buildRegex(value.schema);
}

export default schemasRegex;
import { schemasRegex } from "./regex";

/**
 * Checks schemas generated by schemasRegex for matches in the given pattern.
 * Returns a match or "not_found" if no match is found.
 * 
 * @param pattern - The input string to be checked
 * @returns An object containing the matched schema name and values
 */
export function getRawInstruction(pattern: string): RawInstruction {
  for (const [schemaName, regex] of Object.entries(schemasRegex)) {
    const match = pattern.match(regex);
    if (match) {
      return {
        name: schemaName,
        values: match.slice(1) // Remove object types in an array + first element
      };
    }
  }

  return {
    name: "not_found",
    values: [pattern]
  }
}

/**
 * Normalizes a raw instruction into a standardized format.
 *
 * @param instruction - The raw instruction to normalize.
 * @returns The normalized instruction.
 */
export function normalizeInstruction(instruction: RawInstruction): Instruction {
  const mappings: Record<string, InstructionType> = {
    "create": "create",
    "create_no_name": "create",
    "create_short": "create",
    "create_reverse": "create",
    "assign": "assign",
    "assign_short": "assign",
    "assign_shortest": "assign",
    "assign_reverse": "assign",
    "assign_reverse_no_name": "assign",
    "assign_reverse_short": "assign",
    "assign_reverse_shortest": "assign",
    "print": "print",
    "if_clause_start": "if",
    "if_clause_else": "else",
    "if_clause_end": "endif",
    "loop_start": "loop",
    "loop_start_short": "loop",
    "loop_start_iterator": "loop",
    "loop_end": "endloop",
    "not_found": "unknown",
  };

  const valueMappings: { [key: string]: (values: any[]) => any[] } = {
    "create": values => ["create_reverse"].includes(instruction.name) ? [values[1], values[0]] : [values[0], values[1]],
    "assign": values => ["assign_reverse", "assign_reverse_no_name", "assign_reverse_short", "assign_reverse_shortest"].includes(instruction.name) ? [values[1], values[0]] : [values[0], values[1]],
    "print": values => [values[0]],
    "if": values => [values[0]],
    "else": _ => [],
    "endif": _ => [],
    "loop": values => ["loop_start_iterator"].includes(instruction.name) ? [values[0], values[1]] : ["_", values[0]],
    "endloop": _ => [],
    "unknown": _ => [],
  };

  const normalizedType: InstructionType = mappings[instruction.name] || "unknown";
  const normalizedParams = (valueMappings[normalizedType] || (() => []))(instruction.values);

  return {
    type: normalizedType,
    params: normalizedParams,
  };
}

import { executeInstruction } from "./execute";
import { getRawInstruction, normalizeInstruction } from "./instruction";

export default function run(code: string) {
  const instructions = code.split(".").map(line => {
    return normalizeInstruction(getRawInstruction(line));
  });

  for (let i = 0; i < instructions.length; i++) {
    const result = executeInstruction(instructions[i]);

    if (result === false) {
      while (instructions[i].type !== "else" && instructions[i].type !== "endif") {
        i++;
      }
      if (instructions[i].type === "else") {
        i++;
        executeInstruction(instructions[i]); // Missing first instruction
      }
    }

    if (instructions[i].type === "else") {
      while (instructions[i].type !== "endif") {
        i++;
      }
    }

  }

  console.table(instructions)
}
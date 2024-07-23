import { executeInstruction } from "./execute";
import { getRawInstruction, normalizeInstruction } from "./instruction";

export default function run(code: string) {
  let instructions = code.split(".").map(line => {
    return normalizeInstruction(getRawInstruction(line));
  });

  console.table(instructions)
}
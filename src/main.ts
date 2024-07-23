import { executeInstruction } from "./execute";
import { getRawInstruction, normalizeInstruction } from "./instruction";

function runInstructions(instructions: Instruction[]) {
  let i = 0;
  const n = instructions.length;

  while (i < n) {
    const instruction = instructions[i];
    const type = instruction.type;
    const parameters = instruction.params;

    if (type === "if") {
      const shouldExecute = executeInstruction(instruction);

      if (!shouldExecute) {
        // Skip to the corresponding else or endif
        let level = 1;
        while (level > 0 && i < n) {
          i++;
          const currentType = instructions[i].type;
          if (currentType === "if") level++;
          if (currentType === "endif") level--;
          if (currentType === "else" && level === 1) break;
        }
      }
    } else if (type === "else") {
      // Skip to endif
      let level = 1;
      while (level > 0 && i < n) {
        i++;
        const currentType = instructions[i].type;
        if (currentType === "if") level++;
        if (currentType === "endif") level--;
      }
    } else if (type === "endif") {
      // No action needed, just proceed
    } else if (type === "loop") {
      const loopVar = parameters[0];

      executeInstruction({
        type: "create",
        params: [loopVar, "0"]
      });

      const iterations = Number(parameters[1])
      const loopStart = i;

      // Find the end of the loop
      let level = 1;
      while (level > 0 && i < n) {
        i++;
        const currentType = instructions[i].type;
        if (currentType === "loop") level++;
        if (currentType === "endloop") level--;
      }
      const loopEnd = i;

      // Execute the loop body
      for (let j = 0; j < iterations; j++) {
        runInstructions(instructions.slice(loopStart + 1, loopEnd));

        executeInstruction({
          type: "assign",
          params: [loopVar, (j + 1).toString()]
        });
      }
    } else if (type === "endloop") {
      // No action needed, just proceed
    } else {
      executeInstruction(instruction);
    }
    i++;
  }
}

export default function run(code: string) {
  const instructions: Instruction[] = code.split(".").map(line => {
    return normalizeInstruction(getRawInstruction(line));
  });

  runInstructions(instructions);
  console.table(instructions);
}
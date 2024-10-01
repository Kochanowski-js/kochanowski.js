declare module 'stemmer_pl';

type Synonyms = Record<string, string[]>;
type Schemas = Record<string, string>;
type Operations = Record<string, string[]>;
type RegexDictionary = Record<string, RegExp>;

interface RawInstruction {
  name: string;
  values: string[];
}

type InstructionType = "create" | "assign" | "print" | "if" | "else" | "endif" | "loop" | "endloop" | "unknown"
interface Instruction {
  type: InstructionType;
  params: string[];
}
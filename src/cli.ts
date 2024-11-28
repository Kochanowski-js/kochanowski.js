#!/usr/bin/env node

import { existsSync, promises as fsPromises } from 'fs';
import run from './main';

const inputFile = process.argv[2];

if (!inputFile) {
  console.error('Error: Usage: npm start <inputFilePath>');
  process.exit(1);
}

if (!existsSync(inputFile)) {
  console.error('Error: Input file not found:', inputFile);
  process.exit(1);
}

(async () => {
  try {
    const code = await fsPromises.readFile(inputFile, 'utf8');
    try {
      run(code);
    } catch (err) {
      console.error('Error running the code:', err);
      process.exit(1);
    }
  } catch (err) {
    console.error('Error reading input file:', err);
    process.exit(1);
  }
})();

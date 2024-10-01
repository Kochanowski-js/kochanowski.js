#!/usr/bin/env node

import * as fs from 'fs';
import run from './main';

const inputFile: string = process.argv[2];

if (!inputFile) {
  console.error('Usage: npm start <inputFile>');
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error('Error: File not found');
  process.exit(1);
}

fs.readFile(inputFile, 'utf8', (err, code) => {
  
  if (err) {
    console.error('Error reading input file:', err);
    process.exit(1);
  }

  run(code);

});

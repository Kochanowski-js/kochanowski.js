#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { getPatternValues } from './patterns';
import { interpret } from './translate';

const inputFile: string = process.argv[2];

if (!inputFile) {
  console.error('Usage: npm start <inputFile>');
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error('Error: File not found');
  process.exit(1);
}

const fileExtension: string = path.extname(inputFile);
if (fileExtension !== '.kpl') {
  console.error('Error: Invalid file type. Expected a Kochanowski Programming Language file (.kpl)');
  process.exit(1);
}

fs.readFile(inputFile, 'utf8', (err, code) => {
  if (err) {
    console.error('Error reading input file:', err);
    process.exit(1);
  }

  const lines: string[] = code.split(".");

  const translations: string[] = lines.map(line => {
    const token = getPatternValues(line);
    return interpret(token);
  });

  const translatedCode: string = translations.join('\n');

  eval(translatedCode);
});

#!/usr/bin/env node

import { getChatCompletion } from './inference';
import * as output from './output';

async function main() {
  const args = process.argv.slice(2);
  const prompt = args.join(' ');
  output.message('🧑‍💻:', prompt);
  output.progress('💠: Thinking...');

  const response = await getChatCompletion(prompt);
  output.clearLine();
  output.message('💠:', response);
}

void main();

#!/usr/bin/env node

import { parseConfig } from './config';
import { getChatCompletion } from './inference';
import * as output from './output';

async function main() {
  const config = await parseConfig();
  output.debug('Config:', config);

  const args = process.argv.slice(2);
  const prompt = args.join(' ');
  output.message('🧑‍💻:', prompt);
  output.progress('💠: Thinking...');

  const response = await getChatCompletion(config, prompt);
  output.clearLine();
  output.message('💠:', response);
}

void main();

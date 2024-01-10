import type { CommandModule } from 'yargs';
import { parseConfig } from '../config';
import { getChatCompletion } from '../inference';
import * as output from '../output';

export interface PromptOptions {
  /** Show verbose-level logs. */
  verbose: boolean;
}

export const command: CommandModule<{}, PromptOptions> = {
  command: ['$0'],
  describe: 'ask the AI with prompt',
  builder: (yargs) => {
    return yargs.option('verbose', {
      type: 'boolean',
      default: false,
      describe: 'Output verbose level logs',
    });
  },
  handler: (args) => run(args._.join(' '), args),
};

export async function run(prompt: string, options: PromptOptions) {
  if (options.verbose) {
    output.setVerbose(true);
  }

  const config = await parseConfig();
  output.debug('Config:', config);

  output.message('🧑‍💻:', prompt);
  output.progress('💠: Thinking...');

  const [message, response] = await getChatCompletion(config, prompt);
  output.clearLine();
  output.message('💠:', message);
  output.debug('Response:', response);
}

import type { CommandModule } from 'yargs';
import { parseConfig } from '../config';
import { getChatCompletion } from '../inference';
import * as output from '../io';

export interface PromptOptions {
  interactive: boolean;

  /** Show verbose-level logs. */
  verbose: boolean;
}

export const command: CommandModule<{}, PromptOptions> = {
  command: ['$0'],
  describe: 'ask the AI with prompt',
  builder: (yargs) =>
    yargs
      .option('interactive', {
        alias: 'i',
        type: 'boolean',
        default: false,
        describe: 'Start an interactive conversation',
      })
      .option('verbose', {
        alias: 'V',
        type: 'boolean',
        default: false,
        describe: 'Verbose output',
      }),
  handler: (args) => run(args._.join(' '), args),
};

export async function run(prompt: string, options: PromptOptions) {
  if (options.verbose) {
    output.setVerbose(true);
  }

  const config = await parseConfig();
  output.outputVerbose('Config:', config);

  if (prompt.trim()) {
    output.outputUser(prompt);
    output.outputAiProgress('Thinking...');

    const [message, response] = await getChatCompletion(config, prompt);
    output.clearLine();
    output.outputAi(message);
    output.outputVerbose('Response:', response);
  } else {
    output.outputAi('Hello, how can I help you? Press Cmd+C to exit.');
  }

  if (!options.interactive) {
    return;
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const userPrompt = await output.inputLine('me: ');
    output.outputAiProgress('Thinking...');

    const [message, response] = await getChatCompletion(config, userPrompt);
    output.clearLine();
    output.outputAi(message);
    output.outputVerbose('Response:', response);
  }
}

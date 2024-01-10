import OpenAI from 'openai';
import 'dotenv/config';
import * as output from './output';
import type { Config } from './config';

const systemMessage = {
  role: 'system',
  content: 'You are a helpful assistant responding in a concise manner to user questions.',
} as const;

export async function getChatCompletion(config: Config, prompt: string) {
  const openai = new OpenAI({
    apiKey: config.openAiApiKey,
  });

  const userMessage = {
    role: 'user',
    content: prompt,
  } as const;

  const response = await openai.chat.completions.create({
    messages: [systemMessage, userMessage],
    model: config.model,
  });

  output.debug('Response object:', response);

  return response.choices[0]?.message.content;
}

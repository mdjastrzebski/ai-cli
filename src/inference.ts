import OpenAI from 'openai';
import 'dotenv/config';
import * as output from './output';

const MODEL = 'gpt-3.5-turbo' as const;

if (!process.env.OPENAI_API_KEY) {
  output.error(
    'OpenAI API key not found! Add "OPENAI_API_KEY=<your-openai-api-key>" to your .env file.'
  );
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemMessage = {
  role: 'system',
  content: 'You are a helpful assistant responding in a concise manner to user questions.',
} as const;

export async function getChatCompletion(prompt: string) {
  const userMessage = {
    role: 'user',
    content: prompt,
  } as const;

  const response = await openai.chat.completions.create({
    messages: [systemMessage, userMessage],
    model: MODEL,
  });

  output.debug('Response object:', response);

  return response.choices[0]?.message.content;
}

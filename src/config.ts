import * as fs from 'fs/promises';
import * as os from 'os';
import * as path from 'path';
import { Type, type Static } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

const CONFIG_FILENAME = '.airc';
const DEFAULT_MODEL = 'gpt-4';

const ConfigSchema = Type.Object({
  openAiApiKey: Type.String(),
  model: Type.String({ default: DEFAULT_MODEL }),
});

export type Config = Static<typeof ConfigSchema>;

export async function parseConfig() {
  const configPath = path.join(os.homedir(), CONFIG_FILENAME);
  const content = await fs.readFile(configPath);
  const json = JSON.parse(content.toString());

  const configWithDefaults = Value.Default(ConfigSchema, json);
  return Value.Decode(ConfigSchema, configWithDefaults);
}

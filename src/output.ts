import readline from 'readline';

let verbose = false;

export function setVerbose(value: boolean) {
  verbose = value;
}

export function message(message: string, ...args: unknown[]) {
  console.log(message, ...args);
}

export function progress(message: string) {
  process.stdout.write(message);
}

/**
 * Clears current lint. To be used in conjunction with `progress`.
 */
export function clearLine() {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
}

export function debug(message: string, ...args: unknown[]) {
  if (!verbose) return;

  console.debug(`🔸`, message, ...args);
}

export function error(message: string, ...args: unknown[]) {
  console.error(`ERROR:`, message, ...args);
}

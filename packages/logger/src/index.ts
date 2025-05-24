// Alternative: Export a logger object with typed methods
export const logger = {
  log: (message: string): void => {
    console.log(`${'Logger - ' + new Date().toISOString() + ': ' + message}`);
  },
  error: (message: string | Error): void => {
    console.error(`${'Logger - ' + new Date().toISOString() + ': ' + message}`);
  },
  warn: (message: string): void => {
    console.warn(`${'Logger - ' + new Date().toISOString() + ': ' + message}`);
  },
  info: (message: string): void => {
    console.info(`${'Logger - ' + new Date().toISOString() + ': ' + message}`);
  }
};

export default logger;
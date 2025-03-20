// Alternative: Export a logger object with typed methods
export const logger = {
    log: (message: string): void => {
        console.log(`${'Logger - ' + new Date().toISOString() + ': ' + message}`);
    },
    error: (message: string | Error): void => {
        console.log(`${'Logger - ' + new Date().toISOString() + ': ' + message}`);
    },
    warn: (message: string): void => {
        console.log(`${'Logger - ' + new Date().toISOString() + ': ' + message}`);
    },
    info: (message: string): void => {
        console.log(`${'Logger - ' + new Date().toISOString() + ': ' + message}`);
    }
} as const;
/**
 * Production Logger
 * Only logs to console in development mode
 * In production, errors can be sent to monitoring service (Sentry, etc.)
 */

type LogLevel = 'log' | 'error' | 'warn' | 'info';

const isDev = import.meta.env.DEV;

export const logger = {
    log: (...args: unknown[]) => {
        if (isDev) {
            console.log(...args);
        }
    },

    error: (...args: unknown[]) => {
        if (isDev) {
            console.error(...args);
        }
        // TODO: Send to error tracking service in production (e.g., Sentry)
        // sentry.captureException(args[0]);
    },

    warn: (...args: unknown[]) => {
        if (isDev) {
            console.warn(...args);
        }
    },

    info: (...args: unknown[]) => {
        if (isDev) {
            console.info(...args);
        }
    },
};

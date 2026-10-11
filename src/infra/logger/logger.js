import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

const logger = pino(
    isProduction
        ? {
            level: process.env.LOG_LEVEL || 'info'
        }
        : {
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname'
                }
            }
        }
);

export default logger;

import dotenv from 'dotenv';
import pino from 'pino';
import pinoHttp from 'pino-http';

// TODO: consider creating config singleton so we only load dotenv once and can access it anywhere afterwards
dotenv.config();

export const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
});
export const expressLogger = pinoHttp({ logger });

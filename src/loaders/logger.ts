import env from '@config';
import winston from 'winston';

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
});

const consoleOpts = {
  handleExceptions: true,
  level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  ),
};

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf((info) => {
    if (info.stack) {
      return `[${info.timestamp} ${info.level}]: ${info.message}\nError Stack: ${info.stack}`;
    }
    return `[${info.timestamp} ${info.level}]: ${info.message}`;
  }),
);

const transports = [new winston.transports.Console(consoleOpts)];

const logger = winston.createLogger({
  level: env.isProduction ? 'info' : 'debug',
  levels: winston.config.npm.levels,
  format: logFormat,
  transports,
});

export default logger;

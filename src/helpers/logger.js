/* Packages */
import { join } from 'path';
import { transports, format, createLogger } from 'winston';

/* Modules and files */
import winstonConfig from '../config/winston';

/* Logger */
const logger = createLogger({
  levels: winstonConfig.custom.levels, // Load levels from config
  level: winstonConfig.level, // Set current level from config
  format: format.combine(
    format.timestamp(),
    format.prettyPrint(),
    format.colorize({ level: true, colors: winstonConfig.custom.colors }),
    format.printf((log) => `[${log.timestamp}] ${log.level}: ${log.message}`)
  ),
  transports: [
    new transports.Console({
      level: winstonConfig.level,
    }),
    new transports.File({
      filename: join(__dirname, '../logs/error.log'),
      level: 'error',
    }),
    new transports.File({
      filename: join(__dirname, '../logs/access.log'),
      level: 'access',
    }),
    new transports.File({
      filename: join(__dirname, '../logs/combined.log'),
    }),
  ],
});

export default logger;

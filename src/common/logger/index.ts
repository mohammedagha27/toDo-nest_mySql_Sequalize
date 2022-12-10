import { ConsoleLogger } from '@nestjs/common';
import * as winston from 'winston';
const { combine, timestamp, printf, colorize, prettyPrint } = winston.format;
const logger = winston.createLogger({
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'hh:mm:ss',
    }),
    prettyPrint(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports: [new winston.transports.Console()],
});
export class CustomLogger extends ConsoleLogger {
  debug(message: string) {
    super.error(message);
    logger.error(message);
  }

  error(message: string) {
    super.error(message);
    logger.error(message);
  }

  log(message: string) {
    super.log(message);
    logger.info(message);
  }

  warn(message: string) {
    super.warn(message);
    logger.warn(message);
  }
}

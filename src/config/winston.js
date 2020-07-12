/* Enviorment variables */
const { LOG_LEVEL } = process.env;
if (!LOG_LEVEL) throw new Error('Missing LOG_LEVEL environment variable');

// Winston configuration
const winstonConfig = {
  level: process.env.LOG_LEVEL,
  custom: {
    levels: {
      error: 0, // When something goes completly wrong
      warning: 1, // Warning logs (too many requests, many failed login attempts)
      info: 2, // Informational logs (server start, time, system information)
      access: 3, // Inbound requests or resources access
      debug: 4, // Testing and debugging
    },
    colors: {
      error: 'red',
      warning: 'yellow',
      info: 'green',
      access: 'magenta',
      debug: 'cyan',
    },
  },
};

export default winstonConfig;

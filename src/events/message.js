/* Modules and files */
import logger from '../helpers/logger';
import commandHandler from '../handlers/commands';

/* Enviorment variables */
const { COMMAND_PREFIX } = process.env;
if (!COMMAND_PREFIX) throw new Error('Missing COMMAND_PREFIX environment variable');

/* Handling */
export const messageEventHandler = async (message) => {
  // if (message.author.bot) return; // Was the message sent by a bot?
  if (message.content.startsWith(COMMAND_PREFIX)) {
    await commandHandler(message);
  }
};

/* Loader */
export const loader = async (clientObject) => {
  logger.info('Handler for the [message] event loaded');
  clientObject.on('message', async (message) => {
    await messageEventHandler(message);
  });
};

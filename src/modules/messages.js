/* Modules and files */
import logger from '../helpers/logger';

/* Message functionality */
export const sendTextMessage = async (textChannel, text) => {
  logger.debug(`Sending message to text channel [${textChannel.id}]`);
  await textChannel.send(text);
};

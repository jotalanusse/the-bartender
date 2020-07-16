/* Modules and files */
import logger from '../helpers/logger';
import { removeSSMLTags } from '../helpers/helpers';

/* Message functionality */
export const sendTextMessage = async (textChannel, text) => {
  logger.debug(`Sending message to text channel [${textChannel.id}]`);
  const sanitizedText = removeSSMLTags(text);
  await textChannel.send(sanitizedText);
};

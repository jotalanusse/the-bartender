/* Modules and files */
import logger from '../helpers/logger';
import { removeSSMLTags } from '../helpers/helpers';

/* Enviorment variables */
const { PREFIX } = process.env;
if (!PREFIX) throw new Error('Missing PREFIX environment variable');

/* Message functionality */
export const sendTextMessage = async (textChannel, text) => {
  logger.debug(`Sending message to text channel [${textChannel.id}]`);
  const sanitizedText = removeSSMLTags(text);
  await textChannel.send(sanitizedText);
};

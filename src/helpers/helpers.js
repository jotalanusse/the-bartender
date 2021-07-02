/* Packages */
import { appendFileSync } from 'fs';
import { createHash } from 'crypto';

/* Modules and files */
import logger from './logger';

/* Enviorment variables */
const { COMMAND_MAX_LENGTH } = process.env;
if (!COMMAND_MAX_LENGTH) throw new Error('Missing COMMAND_MAX_LENGTH environment variable');

/* Functions */
export const hashString = (string) => {
  return createHash('md5').update(string).digest('hex');
};

export const saveFile = (filePath, buffer) => {
  logger.debug(`Writing file [${filePath}] to disk...`);
  appendFileSync(filePath, buffer);
  logger.debug(`File [${filePath}] saved`);
};

export const removeSSMLTags = (text) => {
  logger.debug(`Removing SSML tags...`);

  const regex = /(<([^>]+)>)/gi;
  return text.replace(regex, '');
};

export const randomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const replacePlaceholders = (text, script, message) => {
  logger.debug(`Replacing placeholders...`);

  const placeholders = {
    '[USERNAME]': () => message.author.username,
    '[MENU_ITEM]': () => randomArrayElement(script),
    '[COMMAND_LENGTH]': () => message.content.length,
    '[COMMAND_MAX_LENGTH]': () => COMMAND_MAX_LENGTH,
  };

  let finalText = text;

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(placeholders)) {
    finalText = finalText.replace(key, value());
  }

  return finalText;
};

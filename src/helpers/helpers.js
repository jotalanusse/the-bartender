/* Packages */
import { appendFileSync } from 'fs';
import { createHash } from 'crypto';

/* Modules and files */
import logger from './logger';

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
  const regex = /(<([^>]+)>)/gi;
  return text.replace(regex, '');
};

/* Modules and files */
import logger from '../helpers/logger';
import { configureAudioFilesPath } from '../modules/audio';

/* Handling */
const setClientState = async (clientObject, text, type) => {
  await clientObject.user.setActivity(text, {
    type,
  });
};

export const readyEventHandler = async (clientObject) => {
  logger.info('The Bartender is now online!');
  configureAudioFilesPath(); // TODO: I don't know if this function should be in this file
  await setClientState(clientObject, 'with my feelings', 'PLAYING'); // Set our awsome state
};

/* Loader */
export const loader = async (clientObject) => {
  logger.info('Handler for the [ready] event loaded');
  clientObject.on('ready', async () => {
    await readyEventHandler(clientObject);
  });
};

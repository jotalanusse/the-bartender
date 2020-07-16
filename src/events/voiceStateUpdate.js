/* Modules and files */
import logger from '../helpers/logger';
import clientState from '../state';
import { playVoiceMessage } from '../modules/voice';

/* Handling */
export const voiceStateUpdateHandler = async (oldState, newState) => {

};

/* Loader */
export const loader = async (clientObject) => {
  logger.info('Handler for the [voiceStateUpdate] event loaded');
  clientObject.on('voiceStateUpdate', async (oldState, newState) => {
    await voiceStateUpdateHandler(oldState, newState);
  });
};

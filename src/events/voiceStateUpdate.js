/* Modules and files */
import logger from '../helpers/logger';
import clientState from '../state';
import script from '../modules/script';
import { playVoiceMessage } from '../modules/voice';

/* Handling */
const userConnectedToClientChannel = (clientObject, userState) => {
  if (userState.id !== clientObject.user.id && clientState.voiceConnections[userState.channelID]) {
    logger.debug(
      `User [${userState.id}] joined to the same voice channel [${userState.channelID}] as the client`
    );
    return true;
  }
  return false;
};

export const welcomeUserHandler = async (clientObject, oldState, newState) => {
  if (userConnectedToClientChannel(clientObject, newState)) {
    const voiceConnection = clientState.voiceConnections[newState.channelID];
    const { username } = newState.guild.members.cache.get(oldState.id).user;
    const text = script.userJoinedVoiceChannel({ username });

    await playVoiceMessage(voiceConnection, `<break time="1800ms"/>${text}`);
  }
};

// TODO: I don't know if this handler is very useful or consistent
export const clientConnectionStateHandler = async (clientObject, oldState, newState) => {
  if (newState.id === clientObject.user.id) {
    logger.connection(`Client changed It's connection state`);

    if (!oldState.channelID && newState.channelID) {
      logger.connection(`The client connected to voice channel [${newState.channelID}]`);
    } else if (oldState.channelID && newState.channelID) {
      logger.connection(
        `The client switched from voice channel [${oldState.channelID}] to channel [${newState.channelID}]`
      );
    } else if (oldState.channelID && !newState.channelID) {
      logger.connection(`The client disconnected from voice channel [${oldState.channelID}]`);
      logger.debug('Removing voice connection from the state');
      delete clientState.voiceConnections[oldState.channelID];
    }
  }
};

/* Loader */
export const loader = async (clientObject) => {
  logger.info('Handler for the [voiceStateUpdate] event loaded');
  clientObject.on('voiceStateUpdate', async (oldState, newState) => {
    await welcomeUserHandler(clientObject, oldState, newState);
    clientConnectionStateHandler(clientObject, oldState, newState); // Probably this is going to be async in the future
  });
};

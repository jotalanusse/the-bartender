/* Modules and files */
import logger from '../helpers/logger';
import clientState from '../state';
import script from '../modules/script';
import { playVoiceMessage } from '../modules/voice';

/* Handling */
const userConnectedToClientChannel = (clientObject, oldState, newState) => {
  // User is the client
  if (newState.id === clientObject.user.id) {
    return false;
  }

  // Filter user state updates so we only continue when a user joins a channel
  if (!((!oldState.channelID && newState.channelID) || oldState.channelID !== newState.channelID)) {
    return false;
  }

  // If the client has a voice connection to the given voice channel
  if (clientState.voiceConnections[newState.channelID]) {
    logger.debug(
      `User [${newState.id}] joined one of the voice channels [${newState.channelID}] in which the client is present`
    );
    return true;
  }

  return false;
};

export const welcomeUserHandler = async (clientObject, oldState, newState) => {
  if (userConnectedToClientChannel(clientObject, oldState, newState)) {
    const voiceConnection = clientState.voiceConnections[newState.channelID];
    const { username } = newState.guild.members.cache.get(oldState.id).user;
    const text = script.userJoinedVoiceChannel({ username });

    await playVoiceMessage(voiceConnection, `<break time="1800ms"/>${text}`); // We add a break to wait for the user's voice connection
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
    clientConnectionStateHandler(clientObject, oldState, newState); // Probably this is going to be async in the future
    await welcomeUserHandler(clientObject, oldState, newState);
  });
};

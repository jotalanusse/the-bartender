/* Packages */
import { existsSync, readdirSync, mkdirSync } from 'fs';

/* Modules and files */
import logger from '../helpers/logger';
import clientState from '../state';

/* Enviorment variables */
const { AUDIO_PATH } = process.env;
if (!AUDIO_PATH) throw new Error('Missing VOICE_PATH environment variable');

/* Audio functionality */
// TODO: I don't really know where to put this functions, so for now it stays here
export const configureAudioFilesPath = async (audioFilespath) => {
  if (!existsSync(audioFilespath)) {
    logger.debug(`Audio folder [${audioFilespath}] does not exists, creating one...`);
    mkdirSync(audioFilespath);
  } else {
    const totalFiles = readdirSync(audioFilespath).length;
    logger.debug(`Audio folder [${audioFilespath}] found with [${totalFiles}] files`);
  }
};

export const connectToVoiceChannel = async (voiceChannel) => {
  const existingVoiceConnection = clientState.voiceConnections[voiceChannel.id];
  if (existingVoiceConnection) {
    logger.debug(`A connection for the voice channel [${voiceChannel.id}] already exists`);
    return existingVoiceConnection;
  }

  logger.debug(
    `No existing voice connection for voice channel [${voiceChannel.id}] found, connecting to voice channel...`
  );
  const voiceConnection = await voiceChannel.join();
  logger.debug('Connection successful');

  logger.debug('Saving voice connection to the state');
  clientState.voiceConnections[voiceChannel.id] = voiceConnection;

  return voiceConnection;
};

export const playAudioFile = async (voiceConnection, filePath) => {
  logger.debug(`Playing audio file [${filePath}] at voice channel [${voiceConnection.channel.id}]`);
  await voiceConnection.play(filePath, { volume: 1 });
};

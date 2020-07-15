/* Packages */
import text2wav from 'text2wav';
import { createHash } from 'crypto';
import { join } from 'path';
import { existsSync, readdirSync, mkdirSync, appendFileSync } from 'fs';

/* Modules and files */
import logger from './helpers/logger';

/* Enviorment variables */
const { VOICE_VOICE, VOICE_VARIANT, VOICE_SPEED, VOICE_PITCH, VOICE_PATH } = process.env;

if (!VOICE_VOICE) throw new Error('Missing VOICE_VOICE environment variable');
if (!VOICE_VARIANT) throw new Error('Missing VOICE_VARIANT environment variable');
if (!VOICE_SPEED) throw new Error('Missing VOICE_SPEED environment variable');
if (!VOICE_PITCH) throw new Error('Missing VOICE_PITCH environment variable');
if (!VOICE_PATH) throw new Error('Missing VOICE_PATH environment variable');

// Check if the audio folder exists
if (!existsSync(VOICE_PATH)) {
  logger.debug(`Audio folder [${VOICE_PATH}] does not exists, creating one...`);
  mkdirSync(VOICE_PATH);
} else {
  const totalFiles = readdirSync(VOICE_PATH).length;
  logger.debug(`Audio folder [${VOICE_PATH}] found with [${totalFiles}] files`);
}

/* Voice functionality */
export const synthesizeVoice = async (text) => {
  const fileName = `${VOICE_VOICE}+${VOICE_VARIANT}+${VOICE_SPEED}+${VOICE_PITCH}+${text}`;
  const fileNameHash = createHash('md5').update(fileName).digest('hex');
  const filePath = join(VOICE_PATH, `${fileNameHash}.mp3`);

  if (existsSync(filePath)) {
    logger.debug(`Voice file [${filePath}] already exists, returning file path...`);
    return filePath;
  }

  logger.debug(`Voice file [${filePath}] is not synthesized yet, synthesizing...`);
  const synthesizedVoice = await text2wav(text, {
    voice: `${VOICE_VOICE}+${VOICE_VARIANT}`,
    speed: VOICE_SPEED,
    pitch: VOICE_PITCH,
    hasTags: true,
  });
  logger.debug(`Voice successfuly synthesized`);

  const voiceBuffer = Buffer.from(synthesizedVoice);
  appendFileSync(filePath, voiceBuffer);

  logger.debug(`Voice file [${filePath}] saved`);

  return filePath;
};

export const connectToVoiceChannel = async (voiceChannel) => {
  logger.debug('Connecting to voice channel...');
  if (!voiceChannel) {
    logger.debug('Invalid voice channel, unable to connect');
    return null;
  }

  const connection = await voiceChannel.join();
  logger.debug('Connection successful');
  return connection;
};

export const playMessage = async (voiceConnection, text) => {
  if (!voiceConnection) {
    logger.debug(`The voice message won't be played because no valid connection was provided`);
  } else {
    const filePath = await synthesizeVoice(text);

    logger.debug(`Playing voice file [${filePath}]`);
    await voiceConnection.play(filePath, { volume: 1 });
  }
};

/* Packages */
import { existsSync } from 'fs';
import text2wav from 'text2wav';
import { join } from 'path';

/* Modules and files */
import logger from '../helpers/logger';
import { hashString, saveFile } from '../helpers/helpers';
// import clientState from '../state';
import { playAudioFile } from './audio';

/* Enviorment variables */
const { VOICE_VOICE, VOICE_VARIANT, VOICE_SPEED, VOICE_PITCH, AUDIO_PATH } = process.env;
if (!VOICE_VOICE) throw new Error('Missing VOICE_VOICE environment variable');
if (!VOICE_VARIANT) throw new Error('Missing VOICE_VARIANT environment variable');
if (!VOICE_SPEED) throw new Error('Missing VOICE_SPEED environment variable');
if (!VOICE_PITCH) throw new Error('Missing VOICE_PITCH environment variable');
if (!AUDIO_PATH) throw new Error('Missing AUDIO_PATH environment variable');

/* Voice functionality */
export const synthesizeVoice = async (text, voice, variant, speed, pitch) => {
  logger.debug(`Synthesizing voice...`);
  const synthesizedVoice = await text2wav(text, {
    voice: `${voice}+${variant}`,
    speed,
    pitch,
    hasTags: true, // We use SSML tags for more epic voice lines
  });
  logger.debug(`Voice successfuly synthesized`);

  return Buffer.from(synthesizedVoice);
};

export const createVoice = async (text) => {
  const fileName = `${VOICE_VOICE}+${VOICE_VARIANT}+${VOICE_SPEED}+${VOICE_PITCH}+${text}`;
  const fileNameHash = hashString(fileName);
  const filePath = join(AUDIO_PATH, `${fileNameHash}.mp3`);

  if (existsSync(filePath)) {
    logger.debug(`Voice file [${filePath}] already exists, returning file path...`);
    return filePath;
  }
  logger.debug(`Voice file [${filePath}] does not exist, we have to create it`);

  const voiceBuffer = await synthesizeVoice(
    text,
    VOICE_VOICE,
    VOICE_VARIANT,
    VOICE_SPEED,
    VOICE_PITCH
  );
  saveFile(filePath, voiceBuffer);

  return filePath;
};

export const playVoiceMessage = async (voiceConnection, text) => {
  const filePath = await createVoice(text);
  await playAudioFile(voiceConnection, filePath);
};

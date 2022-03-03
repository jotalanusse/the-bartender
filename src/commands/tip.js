/* Modules and files */
import clientState from '../state';
import script from '../modules/script';
import { removeSSMLTags, randomArrayElement, replacePlaceholders } from '../helpers/helpers';
import { sendTextMessage } from '../modules/messages';
import { playVoiceMessage } from '../modules/voice';

const tip = async (message) => {
  // Useful variables
  const voiceChannel = message.member.voice.channel;
  const voiceConnection = clientState.voiceConnections[voiceChannel?.id]; // Thanks @inakineitor
  const textChannel = message.channel;

  // Command logic
  const scriptOptions = script.tip;
  const scriptText = randomArrayElement(scriptOptions);
  const finalText = replacePlaceholders(scriptText, message);
  const sanitizedText = removeSSMLTags(finalText);

  await Promise.all([
    sendTextMessage(textChannel, sanitizedText),
    playVoiceMessage(voiceConnection, sanitizedText),
  ]);
};

export default tip;

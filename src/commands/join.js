/* Modules and files */
import clientState from '../state';
import script from '../modules/script';
import { removeSSMLTags, randomArrayElement, replacePlaceholders } from '../helpers/helpers';
import { sendTextMessage } from '../modules/messages';
import { playVoiceMessage } from '../modules/voice';
import { connectToVoiceChannel } from '../modules/audio';

const join = async (message) => {
  // Useful variables
  const voiceChannel = message.member.voice.channel;
  let voiceConnection = clientState.voiceConnections[voiceChannel?.id]; // Thanks @inakineitor
  const textChannel = message.channel;

  // Command logic
  const scriptOptions = script.join;
  const scriptText = randomArrayElement(scriptOptions);
  const finalText = replacePlaceholders(scriptText, message);
  const sanitizedText = removeSSMLTags(finalText);

  voiceConnection = await connectToVoiceChannel(voiceChannel);
  // voiceConnection = clientState.voiceConnections[voiceChannel.id]; // We have to update the current voiceConnection object

  await Promise.all([
    sendTextMessage(textChannel, sanitizedText),
    playVoiceMessage(voiceConnection, sanitizedText),
  ]);
};

export default join;

/* Modules and files */
import clientState from '../state';
import script from '../modules/script';
import { removeSSMLTags, randomArrayElement, replacePlaceholders } from '../helpers/helpers';
import { sendTextMessage } from '../modules/messages';
import { playVoiceMessage } from '../modules/voice';
import { connectToVoiceChannel } from '../modules/audio';

const silentJoin = async (message) => {
  // Useful variables
  const voiceChannel = message.member.voice.channel;
  const voiceConnection = clientState.voiceConnections[voiceChannel?.id]; // Thanks @inakineitor
  const textChannel = message.channel;

  // Command logic
  const scriptOptions = script.join;
  const scriptText = randomArrayElement(scriptOptions);
  const sanitizedText = removeSSMLTags(scriptText);
  const finalText = replacePlaceholders(sanitizedText, script, message);

  await connectToVoiceChannel(voiceChannel);
  // voiceConnection = clientState.voiceConnections[voiceChannel.id]; // We have to update the current voiceConnection object

  await Promise.all([
    sendTextMessage(textChannel, finalText),
    // playVoiceMessage(voiceConnection, scriptText),
  ]);
};

export default silentJoin;

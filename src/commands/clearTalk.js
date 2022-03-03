// /* Modules and files */
// import clientState from '../state';
// import script from '../modules/script';
// import { removeSSMLTags, randomArrayElement, replacePlaceholders } from '../helpers/helpers';
// import { sendTextMessage } from '../modules/messages';
// import { playVoiceMessage } from '../modules/voice';

// const clearTalk = async (message) => {
//   // Useful variables
//   const voiceChannel = message.member.voice.channel;
//   const voiceConnection = clientState.voiceConnections[voiceChannel?.id]; // Thanks @inakineitor
//   const textChannel = message.channel;

//   clientState.conversations[textChannel.id] = []; // Clear the conversation

//   // Command logic
//   const scriptOptions = script.clearTalk;
//   const scriptText = randomArrayElement(scriptOptions);
//   const sanitizedText = removeSSMLTags(scriptText);
//   const finalText = replacePlaceholders(sanitizedText, message);

//   await Promise.all([
//     sendTextMessage(textChannel, finalText),
//     playVoiceMessage(voiceConnection, scriptText),
//   ]);
// };

// export default clearTalk;

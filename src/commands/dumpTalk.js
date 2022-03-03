// /* Packages */
// import Discord from 'discord.js';

// /* Modules and files */
// import clientState from '../state';
// import script from '../modules/script';
// import { removeSSMLTags, randomArrayElement, replacePlaceholders } from '../helpers/helpers';
// import { sendTextMessage } from '../modules/messages';
// import { playVoiceMessage } from '../modules/voice';
// import { parsePromptArray } from './talk';

// const dumpTalk = async (message) => {
//   // Useful variables
//   const voiceChannel = message.member.voice.channel;
//   const voiceConnection = clientState.voiceConnections[voiceChannel?.id]; // Thanks @inakineitor
//   const textChannel = message.channel;

//   const conversationDumpText = parsePromptArray(clientState.conversations[textChannel.id] || []); // Get the current conversation and parse it

//   const embedMessage = new Discord.MessageEmbed()
//     .setColor('#4c2461')
//     .setTitle('Conversation dump')
//     .setDescription(conversationDumpText)
//     .setTimestamp()
//     .setFooter('The best bartender');

//   // Command logic
//   const scriptOptions = script.dumpTalk;
//   const scriptText = randomArrayElement(scriptOptions);
//   const sanitizedText = removeSSMLTags(scriptText);
//   const finalText = replacePlaceholders(sanitizedText, message);

//   await Promise.all([
//     sendTextMessage(textChannel, finalText),
//     sendTextMessage(textChannel, embedMessage),
//     playVoiceMessage(voiceConnection, scriptText),
//   ]);
// };

// export default dumpTalk;

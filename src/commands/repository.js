/* Packages */
import Discord from 'discord.js';

/* Modules and files */
import clientState from '../state';
import script from '../modules/script';
import { removeSSMLTags, randomArrayElement, replacePlaceholders } from '../helpers/helpers';
import { sendTextMessage } from '../modules/messages';
import { playVoiceMessage } from '../modules/voice';

const repository = async (message) => {
  // Useful variables
  const voiceChannel = message.member.voice.channel;
  const voiceConnection = clientState.voiceConnections[voiceChannel?.id]; // Thanks @inakineitor
  const textChannel = message.channel;

  // Command logic
  const scriptOptions = script.repository;
  const scriptText = randomArrayElement(scriptOptions);
  const finalText = replacePlaceholders(scriptText, message);
  const sanitizedText = removeSSMLTags(finalText);

  const embedMessage = new Discord.MessageEmbed()
    .setColor('#4c2461')
    .setTitle('The Bartender')
    .setURL('https://github.com/jotalanusse/the-bartender/')
    .setDescription(
      'The Bartender is a bot made for you to fill your dead, empty soul. It will help you overcome your sadness with it’s shitty sense of humor and it’s lame jokes. With The Bartender by your side there is no way you can feel alone, that’s for sure (I promise you will end up muting it).'
    )
    .setTimestamp()
    .setFooter('The best bartender');

  await Promise.all([
    sendTextMessage(textChannel, finalText),
    sendTextMessage(textChannel, embedMessage),
    playVoiceMessage(voiceConnection, scriptText),
  ]);
};

export default repository;

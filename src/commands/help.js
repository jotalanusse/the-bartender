/* Packages */
import Discord from 'discord.js';

/* Modules and files */
import clientState from '../state';
import script from '../modules/script';
import { removeSSMLTags, randomArrayElement, replacePlaceholders } from '../helpers/helpers';
import { sendTextMessage } from '../modules/messages';
import { playVoiceMessage } from '../modules/voice';

/* Enviorment variables */
const { COMMAND_PREFIX } = process.env;
if (!COMMAND_PREFIX) throw new Error('Missing COMMAND_PREFIX environment variable');

const help = async (message) => {
  // Useful variables
  const voiceChannel = message.member.voice.channel;
  const voiceConnection = clientState.voiceConnections[voiceChannel?.id]; // Thanks @inakineitor
  const textChannel = message.channel;

  // Command logic
  const scriptOptions = script.help;
  const scriptText = randomArrayElement(scriptOptions);
  const finalText = replacePlaceholders(scriptText, message);
  const sanitizedText = removeSSMLTags(finalText);

  const embedMessage = new Discord.MessageEmbed()
    .setColor('#4c2461')
    .setTitle('Help menu')
    .setDescription(
      `Hey ${message.author.username}, here you have some commands you can use with The Bartender. In the near future it will be able to do much more, have fun!`
    )
    .addFields([
      {
        name: `${COMMAND_PREFIX}help, commands`,
        value: 'Display this menu',
      },
      // {
      //   name: `${COMMAND_PREFIX}talk`,
      //   value: 'Talk with The Bartender, and tell him about your meaningless problems',
      // },
      // {
      //   name: `${COMMAND_PREFIX}cleartalk`,
      //   value: 'Clear the conversation and start again',
      // },
      // {
      //   name: `${COMMAND_PREFIX}dumptalk`,
      //   value: 'Dump the conversation with the bartender',
      // },
      {
        name: `${COMMAND_PREFIX}test`,
        value: 'Send a test message',
      },
      {
        name: `${COMMAND_PREFIX}join`,
        value: `Join the user's voice channel`,
      },
      {
        name: `${COMMAND_PREFIX}github, repository, repo`,
        value: 'Show the link for the project git repository',
      },
      {
        name: `${COMMAND_PREFIX}tts`,
        value: 'Play a message in the currently connected voice channel',
      },
      {
        name: `${COMMAND_PREFIX}silentjoin`,
        value: `Join the user's voice channel without talking (shhh)`,
      },
      {
        name: `${COMMAND_PREFIX}leave`,
        value: 'Leave the voice cjannel',
      },
      {
        name: `${COMMAND_PREFIX}random`,
        value: 'Say something random',
      },
      {
        name: `${COMMAND_PREFIX}support`,
        value: 'Receive some emotional support',
      },
      {
        name: `${COMMAND_PREFIX}tip`,
        value: 'Tip The Bartender for his awsome service',
      },
      {
        name: `${COMMAND_PREFIX}menu`,
        value: `Show today's menu`,
      },
    ])
    .setTimestamp()
    .setFooter('The best bartender');

  await Promise.all([
    sendTextMessage(textChannel, finalText),
    sendTextMessage(textChannel, embedMessage),
    playVoiceMessage(voiceConnection, scriptText),
  ]);
};

export default help;

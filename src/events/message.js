/* Packages */
import Discord from 'discord.js';

/* Modules and files */
import logger from '../helpers/logger';
import clientState from '../state';
import script from '../modules/script';
import { connectToVoiceChannel, disconnectFromVoiceChannel } from '../modules/audio';
import { removeSSMLTags } from '../helpers/helpers';
import { sendTextMessage } from '../modules/messages';
import { playVoiceMessage } from '../modules/voice';

/* Enviorment variables */
const { COMMAND_PREFIX, COMMAND_MAX_CHARS } = process.env;
if (!COMMAND_PREFIX) throw new Error('Missing COMMAND_PREFIX environment variable');
if (!COMMAND_MAX_CHARS) throw new Error('Missing COMMAND_MAX_CHARS environment variable');

/* Handling */
export const messageEventHandler = async (message) => {
  if (message.author.bot) return; // Was the message sent by a bot?
  if (!message.content.startsWith(COMMAND_PREFIX)) return; // Does it starts with our assigned prefix?

  // Useful variables
  const voiceChannel = message.member.voice.channel;
  let voiceConnection = clientState.voiceConnections[voiceChannel?.id]; // Thanks @inakineitor
  const textChannel = message.channel;

  // Command variables
  const splittedMessage = message.content.split(/ (.+)/);
  const command = splittedMessage[0];
  const argument = splittedMessage[1];
  const argumentLength = argument?.length || 0; // We do this in case the command doesn't have any arguments

  logger.debug(`New command detected [${command}]`);

  // Check if the command is too long (definition of "mucho texto pa")
  if (argumentLength > COMMAND_MAX_CHARS) {
    logger.warning(
      `User [${message.author.id}] sent a command too long [${argumentLength}] characters, max accepted length is [${COMMAND_MAX_CHARS}] characters`
    );

    const text = script.commandTooLong({
      username: message.author.username,
      characterLimit: COMMAND_MAX_CHARS,
      characterCount: argumentLength,
    });
    await Promise.all([
      sendTextMessage(textChannel, removeSSMLTags(text)),
      playVoiceMessage(voiceConnection, text),
    ]);

    return;
  }

  const handleCommand = async () => {
    switch (command) {
      // A test command for testing voice and chat functionality
      case `${COMMAND_PREFIX}test`: {
        const text = script.test({ username: message.author.username });
        await Promise.all([
          sendTextMessage(textChannel, removeSSMLTags(text)),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }

      // Join the voice channel the user is currently in
      case `${COMMAND_PREFIX}join`: {
        const text = script.join({ username: message.author.username });

        await connectToVoiceChannel(voiceChannel);
        voiceConnection = clientState.voiceConnections[voiceChannel.id]; // We have to update the current voiceConnection object

        await Promise.all([
          sendTextMessage(textChannel, removeSSMLTags(text)),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }

      // Show the source code repository
      case `${COMMAND_PREFIX}github`:
      case `${COMMAND_PREFIX}repository`:
      case `${COMMAND_PREFIX}repo`: {
        const text = script.repository({ username: message.author.username });

        const embedMessage = new Discord.MessageEmbed()
          .setColor('#4c2461')
          .setTitle('The Bartender')
          .setURL('https://github.com/jotalanusse/the-bartender/')
          // .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
          .setDescription(
            'The Bartender is a bot made for you to fill your dead, empty soul. It will help you overcome your sadness with it’s shitty sense of humor and it’s lame jokes. With The Bartender by your side there is no way you can feel alone, that’s for sure (I promise you will end up muting it).'
          )
          // .setThumbnail('https://i.imgur.com/wSTFkRM.png')
          .setTimestamp()
          .setFooter('The best bartender');

        await Promise.all([
          sendTextMessage(textChannel, embedMessage),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }

      // Speak a voiceline in the name of a user
      case `${COMMAND_PREFIX}tts`: {
        const text = `${message.author.username} said: ${argument}`;
        await Promise.all([
          sendTextMessage(textChannel, removeSSMLTags(text)),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }

      // Join the voice channel the user is currently in, but without speaking
      case `${COMMAND_PREFIX}silentjoin`: {
        const text = script.join({ username: message.author.username });

        await connectToVoiceChannel(voiceChannel);
        voiceConnection = clientState.voiceConnections[voiceChannel.id]; // We have to update the current voiceConnection object

        await sendTextMessage(textChannel, removeSSMLTags(text));
        break;
      }

      // Leave the voice channel the user is currently in
      case `${COMMAND_PREFIX}leave`: {
        const text = script.leave({ username: message.author.username });

        await disconnectFromVoiceChannel(voiceChannel);

        await sendTextMessage(textChannel, removeSSMLTags(text));
        break;
      }

      // Say something random
      case `${COMMAND_PREFIX}random`: {
        const text = script.random({ username: message.author.username });
        await Promise.all([
          sendTextMessage(textChannel, removeSSMLTags(text)),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }

      // Show some support to the user
      case `${COMMAND_PREFIX}support`: {
        const text = script.support({ username: message.author.username });
        await Promise.all([
          sendTextMessage(textChannel, removeSSMLTags(text)),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }

      // Tip the bartender
      case `${COMMAND_PREFIX}tip`: {
        const text = script.tip({ username: message.author.username });
        await Promise.all([
          sendTextMessage(textChannel, removeSSMLTags(text)),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }

      // Orser something the bartender
      case `${COMMAND_PREFIX}order`: {
        const text = script.orderResponses({ username: message.author.username, order: argument });
        await Promise.all([
          sendTextMessage(textChannel, removeSSMLTags(text)),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }

      // Ask the bartender for the menu
      case `${COMMAND_PREFIX}menu`: {
        const text = script.menu({ username: message.author.username });
        await Promise.all([
          sendTextMessage(textChannel, removeSSMLTags(text)),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }

      // Unknown command situation
      default: {
        const text = script.unknownCommand({ username: message.author.username });
        await Promise.all([
          sendTextMessage(textChannel, removeSSMLTags(text)),
          playVoiceMessage(voiceConnection, text),
        ]);
      }
    }
  };

  await handleCommand(command); // We do the switch inside a function so we can use async/await
};

/* Loader */
export const loader = async (clientObject) => {
  logger.info('Handler for the [message] event loaded');
  clientObject.on('message', async (message) => {
    await messageEventHandler(message);
  });
};

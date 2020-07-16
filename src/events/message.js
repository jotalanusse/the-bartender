/* Modules and files */
import logger from '../helpers/logger';
import clientState from '../state';
import script from '../modules/script';
import { connectToVoiceChannel, disconnectFromVoiceChannel } from '../modules/audio';
import { sendTextMessage } from '../modules/messages';
import { playVoiceMessage } from '../modules/voice';

/* Enviorment variables */
const { PREFIX } = process.env;
if (!PREFIX) throw new Error('Missing PREFIX environment variable');

/* Handling */
export const messageEventHandler = async (message) => {
  if (message.author.bot) return; // Was the message sent by a bot?
  if (!message.content.startsWith(PREFIX)) return; // Does it starts with our assigned prefix?

  // Useful variables
  const voiceChannel = message.member.voice.channel;
  let voiceConnection = clientState.voiceConnections[voiceChannel?.id]; // Thanks Inakineitor
  const textChannel = message.channel;
  const command = message.content.split(' ')[0];

  logger.debug(`New command detected [${command}]`);

  const handleCommand = async () => {
    switch (command) {
      case `${PREFIX}test`: {
        const text = script.test({ username: message.author.username });
        await Promise.all([
          sendTextMessage(textChannel, text),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }
      case `${PREFIX}join`: {
        const text = script.join({ username: message.author.username });

        await connectToVoiceChannel(voiceChannel);
        voiceConnection = clientState.voiceConnections[voiceChannel.id]; // We have to update the current voiceConnection object

        await Promise.all([
          sendTextMessage(textChannel, text),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }
      case `${PREFIX}silentjoin`: {
        const text = script.join({ username: message.author.username });

        await connectToVoiceChannel(voiceChannel);
        voiceConnection = clientState.voiceConnections[voiceChannel.id]; // We have to update the current voiceConnection object

        await sendTextMessage(textChannel, text);
        break;
      }
      case `${PREFIX}leave`: {
        const text = script.leave({ username: message.author.username });

        await disconnectFromVoiceChannel(voiceChannel);

        await sendTextMessage(textChannel, text);
        break;
      }
      case `${PREFIX}random`: {
        const text = script.random({ username: message.author.username });
        await Promise.all([
          sendTextMessage(textChannel, text),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }
      case `${PREFIX}support`: {
        const text = script.support({ username: message.author.username });
        await Promise.all([
          sendTextMessage(textChannel, text),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }
      case `${PREFIX}tip`: {
        const text = script.tip({ username: message.author.username });
        await Promise.all([
          sendTextMessage(textChannel, text),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }
      case `${PREFIX}order`: {
        const order = message.content.split(`${PREFIX}order `)[1];
        const text = script.orderResponses({ username: message.author.username, order });
        await Promise.all([
          sendTextMessage(textChannel, text),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }
      case `${PREFIX}menu`: {
        const text = script.menu({ username: message.author.username });
        await Promise.all([
          sendTextMessage(textChannel, text),
          playVoiceMessage(voiceConnection, text),
        ]);
        break;
      }
      default: {
        const text = script.unknownCommand({ username: message.author.username });
        await Promise.all([
          sendTextMessage(textChannel, text),
          playVoiceMessage(voiceConnection, text),
        ]);
      }
    }
  };

  await handleCommand(command);
};

/* Loader */
export const loader = async (clientObject) => {
  logger.info('Handler for the [message] event loaded');
  clientObject.on('message', async (message) => {
    await messageEventHandler(message);
  });
};

/* Modules and files */
import logger from './helpers/logger';
import { playMessage } from './voice';
// import { playSong } from './music';

/* Messages */
import messages from './messages';

/* Enviorment variables */
const { PREFIX } = process.env;

if (!PREFIX) throw new Error('Missing PREFIX environment variable');

/* Main messages functionality */
export const respondMessage = async (message, response) => {
  const regex = /(<([^>]+)>)/gi;
  const readableResponse = response.replace(regex, '');
  await message.channel.send(readableResponse);
};

export const chatHandler = async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  logger.debug(`New message [${message}]`);

  const voiceChannel = message.member.voice.channel;
  let connection;

  if (voiceChannel) {
    connection = await voiceChannel.join();
  } else {
    logger.debug('There is no channel for The Bartender to connect to');
  }

  if (message.content.startsWith(`${PREFIX}test`)) {
    const response = messages.test();
    await respondMessage(message, response);
    await playMessage(connection, response);
  } else if (message.content.startsWith(`${PREFIX}join`)) {
    if (!voiceChannel) {
      await respondMessage(
        message,
        messages.voiceConnectionRequired({ username: message.author.username })
      );
    }

    await playMessage(connection, messages.join({ username: message.author.username }));
  } else if (message.content.startsWith(`${PREFIX}random`)) {
    const response = messages.random({ username: message.author.username });
    await respondMessage(message, response);
    await playMessage(connection, response);
  } else if (message.content.startsWith(`${PREFIX}support`)) {
    const response = messages.emotionalSupport({ username: message.author.username });
    await respondMessage(message, response);
    await playMessage(connection, response);
  } else if (message.content.startsWith(`${PREFIX}tip`)) {
    const response = messages.tip({ username: message.author.username });
    await respondMessage(message, response);
    await playMessage(connection, response);
  } else if (message.content.startsWith(`${PREFIX}order`)) {
    const order = message.content.split(`${PREFIX}order`)[1];
    const response = messages.orderResponses({ username: message.author.username, order });
    await respondMessage(message, response);
    await playMessage(connection, response);
  } else if (message.content.startsWith(`${PREFIX}menu`)) {
    const response = messages.menu({ username: message.author.username });
    await respondMessage(message, response);
    await playMessage(connection, response);
  } else {
    await respondMessage(message, messages.unknownCommand({ username: message.author.username }));
  }

  /* Music section */
  // if (message.content.startsWith(`${PREFIX}play`)) {
  // if (!voiceChannel) {
  //   await respondMessage(message, returnRandomItem(messages.voiceConnectionRequired));
  // }

  //   playSong(message);
  // }

  // if (message.content.startsWith(`${PREFIX}skip`)) {
  //   // TODO: Add channel check

  //   skip(message, serverQueue);
  // }

  // if (message.content.startsWith(`${PREFIX}stop`)) {
  //   // TODO: Add channel check

  //   stop(message, serverQueue);
  // }
};

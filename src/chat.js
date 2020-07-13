/* Modules and files */
import logger from './helpers/logger';
import { playMessage } from './voice';
// import { playSong } from './music';

/* Messages */
import messages from './messages';

/* Enviorment variables */
const { PREFIX } = process.env;

if (!PREFIX) throw new Error('Missing PREFIX environment variable');

/* Helpers */
const returnRandomItem = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};

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
    const response = returnRandomItem(messages.test);
    await playMessage(connection, response);
    await respondMessage(message, response);
  } else if (message.content.startsWith(`${PREFIX}join`)) {
    if (!voiceChannel) {
      await respondMessage(message, returnRandomItem(messages.voiceConnectionRequired));
    }
    await playMessage(connection, returnRandomItem(messages.join));
  } else if (message.content.startsWith(`${PREFIX}random`)) {
    const response = returnRandomItem(messages.random);
    await playMessage(connection, response);
    await respondMessage(message, response);
  } else if (message.content.startsWith(`${PREFIX}support`)) {
    const response = returnRandomItem(messages.emotionalSupport);
    await playMessage(connection, response);
    await respondMessage(message, response);
  } else if (message.content.startsWith(`${PREFIX}tip`)) {
    const response = returnRandomItem(messages.tip);
    await playMessage(connection, response);
    await respondMessage(message, response);
  } else if (message.content.startsWith(`${PREFIX}order`)) {
    const order = message.content.split(`${PREFIX}order`)[1];
    const response = `${order}, ${returnRandomItem(messages.orderResponses)}`;
    await playMessage(connection, response);
    await respondMessage(message, response);
  } else if (message.content.startsWith(`${PREFIX}menu`)) {
    const response = `For today's menu we have<break time="700ms"/>: ${returnRandomItem(
      messages.menuItems
    )} <break time="700ms"/>, ${returnRandomItem(
      messages.menuItems
    )} <break time="700ms"/> and ${returnRandomItem(messages.menuItems)}`;
    await playMessage(connection, response);
    await respondMessage(message, response);
  } else {
    await respondMessage(message, returnRandomItem(messages.unknownCommand));
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

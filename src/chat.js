/* Modules and files */
import logger from './helpers/logger';
import { playMessage } from './voice';

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
  const connection = await voiceChannel.join();

  if (message.content.startsWith(`${PREFIX}test`)) {
    const response = returnRandomItem(messages.test);
    await playMessage(connection, response);
    await respondMessage(message, response);
  }

  if (message.content.startsWith(`${PREFIX}join`)) {
    await playMessage(connection, returnRandomItem(messages.join));
  }

  if (message.content.startsWith(`${PREFIX}random`)) {
    await playMessage(connection, returnRandomItem(messages.random));
  }

  if (message.content.startsWith(`${PREFIX}support`)) {
    await playMessage(connection, returnRandomItem(messages.emotionalSupport));
  }

  if (message.content.startsWith(`${PREFIX}tip`)) {
    const response = returnRandomItem(messages.tip);
    await playMessage(connection, response);
    await respondMessage(message, response);
  }

  if (message.content.startsWith(`${PREFIX}menu`)) {
    const response = `For today's menu we have <break time="700ms"/>: ${returnRandomItem(
      messages.menuItems
    )} <break time="700ms"/>, ${returnRandomItem(
      messages.menuItems
    )} <break time="700ms"/> and ${returnRandomItem(messages.menuItems)}`;
    await playMessage(connection, response);
    await respondMessage(message, response);
  }
};

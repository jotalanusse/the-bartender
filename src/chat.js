/* Modules and files */
import logger from './helpers/logger';
import { playMessage, connectToVoiceChannel } from './voice';
// import { playSong } from './music';

/* Messages */
import messages from './messages';

/* Enviorment variables */
const { PREFIX } = process.env;

if (!PREFIX) throw new Error('Missing PREFIX environment variable');

/* Main messages functionality */
export const sendMessage = async (channel, text) => {
  const regex = /(<([^>]+)>)/gi;
  const readableText = text.replace(regex, '');
  await channel.send(readableText);
};

export const sendAndPlayMessage = async (textChannel, voiceConnection, text) => {
  await Promise.all([sendMessage(textChannel, text), playMessage(voiceConnection, text)]);
};

export const chatHandler = async (message) => {
  /* Check message */
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;
  logger.debug(`New message [${message}]`);

  /* "Global" variables */
  const voiceChannel = message.member.voice.channel;
  const voiceConnection = await connectToVoiceChannel(voiceChannel);
  const textChannel = message.channel;

  // TODO: Find a way to use other thing rather than if else
  if (message.content.startsWith(`${PREFIX}test`)) {
    await sendAndPlayMessage(textChannel, voiceConnection, messages.test());
  } else if (message.content.startsWith(`${PREFIX}join`)) {
    const response = messages.join({ username: message.author.username });
    await sendAndPlayMessage(textChannel, voiceConnection, response);
  } else if (message.content.startsWith(`${PREFIX}random`)) {
    const response = messages.random({ username: message.author.username });
    await sendAndPlayMessage(textChannel, voiceConnection, response);
  } else if (message.content.startsWith(`${PREFIX}support`)) {
    const response = messages.emotionalSupport({ username: message.author.username });
    await sendAndPlayMessage(textChannel, voiceConnection, response);
  } else if (message.content.startsWith(`${PREFIX}tip`)) {
    const response = messages.tip({ username: message.author.username });
    await sendAndPlayMessage(textChannel, voiceConnection, response);
  } else if (message.content.startsWith(`${PREFIX}order`)) {
    const order = message.content.split(`${PREFIX}order`)[1];
    const response = messages.orderResponses({ username: message.author.username, order });
    await sendAndPlayMessage(textChannel, voiceConnection, response);
  } else if (message.content.startsWith(`${PREFIX}menu`)) {
    const response = messages.menu({ username: message.author.username });
    await sendAndPlayMessage(textChannel, voiceConnection, response);
  } else {
    sendMessage(textChannel, messages.unknownCommand({ username: message.author.username }));
  }

  /* Music section */
  // if (message.content.startsWith(`${PREFIX}play`)) {
  // if (!voiceChannel) {
  //   respondMessage(textChannel, returnRandomItem(messages.voiceConnectionRequired));
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

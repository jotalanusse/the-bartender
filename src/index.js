/* Packages */
import Discord from 'discord.js';

/* Modules and files */
import logger from './helpers/logger';
import { chatHandler } from './chat';

/* Enviorment variables */
const { PREFIX, TOKEN } = process.env;

if (!PREFIX) throw new Error('Missing PREFIX environment variable');
if (!TOKEN) throw new Error('Missing TOKEN environment variable');

// New Discord client
const client = new Discord.Client();

// Set a super awsome state
client.on('ready', () => {
  client.user.setActivity('with my feelings', {
    type: 'PLAYING',
  });
});

// /* TEST */
// const removeFromArray = (array, element) => {
//   const index = array.indexOf(element);
//   array.splice(index, 1);
// };

// client.connectedVoiceChannels = [];
// const updateConnectedVoiceChannels = (
//   clientObject,
//   userId,
//   oldVoiceChannelId,
//   newVoiceChannelId
// ) => {
//   const clientID = clientObject.user.id;
//   if (userId === clientID && newVoiceChannelId) {
//     logger.debug(`Client connected to voice channel [${newVoiceChannelId}]`);
//     client.connectedVoiceChannels.push(newVoiceChannelId);
//   } else if (userId === clientID) {
//     logger.debug(`Client disconnected from voice channel [${oldVoiceChannelId}]`);
//     removeFromArray(client.connectedVoiceChannels, oldVoiceChannelId);
//   }
// };

// const userConnectedToClientChannel = (clientObject, userState) => {
//   if (
//     userState.id !== clientObject.user.id &&
//     clientObject.connectedVoiceChannels.includes(userState.channelID)
//   ) {
//     logger.debug('User joined to the same channel as the client');
//     return true;
//   }
//   return false;
// };

// client.on('voiceStateUpdate', (oldUserState, newUserState) => {
//   updateConnectedVoiceChannels(
//     client,
//     newUserState.id,
//     oldUserState.channelID,
//     newUserState.channelID
//   );

//   if (userConnectedToClientChannel(client, newUserState)) {
//     console.log(`WELCOME ${newUserState.guild.members.cache.get(oldUserState.id).user.username}`);
//   }
// });

/* Main messages functionality */
client.on('message', async (message) => {
  await chatHandler(message);
});

/* Status change messages */
client.once('ready', () => {
  logger.info('The Bartender is now online!');
});

client.once('reconnecting', () => {
  logger.info('The Bartender is reconnecting');
});

client.once('disconnect', () => {
  logger.info('The Bartender has disconnected');
});

// Login the bot to Discord
client.login(TOKEN);

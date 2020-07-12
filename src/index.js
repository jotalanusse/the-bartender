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

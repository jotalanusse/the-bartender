/* Packages */
import Discord from 'discord.js';

/* Modules and files */
import logger from './helpers/logger';

/* Events */
import { loader as messageEventLoader } from './events/message';
import { loader as readyEventLoader } from './events/ready';
import { loader as voiceStateUpdateEventLoader } from './events/voiceStateUpdate';

/* Enviorment variables */
const { TOKEN } = process.env;
if (!TOKEN) throw new Error('Missing TOKEN environment variable');

// New Discord client
const client = new Discord.Client();

// Load modules
const main = async (clientObject) => {
  logger.info('Entry point initialized');

  try {
    await clientObject.login(TOKEN); // Login the bot to Discord

    messageEventLoader(clientObject);
    readyEventLoader(clientObject);
    voiceStateUpdateEventLoader(clientObject);
  } catch (err) {
    logger.error(err);
  }
};

main(client);

/* Modules and files */
import logger from '../helpers/logger';

/* Commands */
import helpCommand from '../commands/help';
import tooLongCommand from '../commands/tooLong';
import unknownCommand from '../commands/unknown';
import talkCommand from '../commands/talk';

import testCommand from '../commands/test';
import joinCommand from '../commands/join';
import repositoryCommand from '../commands/repository';
import ttsCommand from '../commands/tts';
import silentJoinCommand from '../commands/silentJoin';
import leaveCommand from '../commands/leave';
import randomCommand from '../commands/random';
import supportCommand from '../commands/support';
import tipCommand from '../commands/tip';
import menuCommand from '../commands/menu';

/* Enviorment variables */
const { COMMAND_PREFIX, COMMAND_MAX_LENGTH } = process.env;
if (!COMMAND_PREFIX) throw new Error('Missing COMMAND_PREFIX environment variable');
if (!COMMAND_MAX_LENGTH) throw new Error('Missing COMMAND_MAX_LENGTH environment variable');

const commandHandler = async (message) => {
  // Command variables
  const splittedMessage = message.content.split(/(?<=^\S+)\s/);
  const command = splittedMessage[0];
  const argument = splittedMessage[1];
  const argumentLength = argument?.length || 0; // We do this in case the command doesn't have any arguments

  logger.debug(`New command detected [${command}]`);

  // Check if the command is too long (definition of "mucho texto pa")
  if (argumentLength > COMMAND_MAX_LENGTH) {
    logger.warning(
      `User [${message.author.id}] sent a command too long [${argumentLength}] characters, max accepted length is [${COMMAND_MAX_LENGTH}] characters`
    );

    await tooLongCommand(message);
    return;
  }

  switch (command) {
    // Show a help message
    case `${COMMAND_PREFIX}help`:
    case `${COMMAND_PREFIX}commands`: {
      await helpCommand(message);
      break;
    }

    // Talk with the bot
    case `${COMMAND_PREFIX}talk`:
    case `${COMMAND_PREFIX}ai`:
    case `${COMMAND_PREFIX}openai`: {
      await talkCommand(message, argument);
      break;
    }

    // A test command for testing voice and chat functionality
    case `${COMMAND_PREFIX}test`: {
      await testCommand(message);
      break;
    }

    // Join the voice channel the user is currently in
    case `${COMMAND_PREFIX}join`: {
      await joinCommand(message);
      break;
    }

    // Show the source code repository
    case `${COMMAND_PREFIX}github`:
    case `${COMMAND_PREFIX}repository`:
    case `${COMMAND_PREFIX}repo`: {
      await repositoryCommand(message);
      break;
    }

    // Speak a voiceline in the name of a user
    case `${COMMAND_PREFIX}tts`: {
      await ttsCommand(message, argument);
      break;
    }

    // Join the voice channel the user is currently in, but without speaking
    case `${COMMAND_PREFIX}silentjoin`: {
      await silentJoinCommand(message);
      break;
    }

    // Leave the voice channel the user is currently in
    case `${COMMAND_PREFIX}leave`: {
      await leaveCommand(message);
      break;
    }

    // Say something random
    case `${COMMAND_PREFIX}random`: {
      await randomCommand(message);
      break;
    }

    // Show some support to the user
    case `${COMMAND_PREFIX}support`: {
      await supportCommand(message);
      break;
    }

    // Tip The Bartender
    case `${COMMAND_PREFIX}tip`: {
      await tipCommand(message);
      break;
    }

    // Ask The Bartender for the menu
    case `${COMMAND_PREFIX}menu`: {
      await menuCommand(message);
      break;
    }

    // Unknown command situation
    default: {
      await unknownCommand(message);
      break;
    }
  }
};

export default commandHandler;

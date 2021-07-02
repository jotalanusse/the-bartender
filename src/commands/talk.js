/* Packages */
import OpenAI from 'openai-api';

/* Modules and files */
import logger from '../helpers/logger';
import clientState from '../state';
import script from '../modules/script';
import { removeSSMLTags, randomArrayElement, replacePlaceholders } from '../helpers/helpers';
import { sendTextMessage } from '../modules/messages';
import { playVoiceMessage } from '../modules/voice';

/* Enviorment variables */
const {
  OPENAI_API_KEY,
  OPENAI_AI_ENGINE,
  OPENAI_AI_MAX_TOKENS,
  OPENAI_AI_MAX_CONVERSATION_LENGTH,
  OPENAI_AI_TEMPERATURE,
  OPENAI_AI_TOP_P,
  OPENAI_AI_PRESENCE_PENALTY,
  OPENAI_AI_FREQUENCY_PENALTY,
} = process.env;

if (!OPENAI_API_KEY) throw new Error('Missing OPENAI_API_KEY environment variable');
if (!OPENAI_AI_ENGINE) throw new Error('Missing OPENAI_AI_ENGINE environment variable');
if (!OPENAI_AI_MAX_TOKENS) throw new Error('Missing OPENAI_AI_MAX_TOKENS environment variable');
if (!OPENAI_AI_MAX_CONVERSATION_LENGTH)
  throw new Error('Missing OPENAI_AI_MAX_CONVERSATION_LENGTH environment variable');
if (!OPENAI_AI_TEMPERATURE) throw new Error('Missing OPENAI_AI_TEMPERATURE environment variable');
if (!OPENAI_AI_TOP_P) throw new Error('Missing OPENAI_AI_TOP_P environment variable');
if (!OPENAI_AI_PRESENCE_PENALTY)
  throw new Error('Missing OPENAI_AI_PRESENCE_PENALTY environment variable');
if (!OPENAI_AI_FREQUENCY_PENALTY)
  throw new Error('Missing OPENAI_AI_FREQUENCY_PENALTY environment variable');

/* OpenAI instance */
const openai = new OpenAI(OPENAI_API_KEY);

const addPromptInput = (author, text, promptArray) => {
  const newPromptArray = promptArray;

  promptArray.push({
    author,
    text,
  });

  if (promptArray.length >= OPENAI_AI_MAX_CONVERSATION_LENGTH) {
    promptArray.shift(); // Remove the first item once we reach the limit
  }

  return newPromptArray;
};

const parsePromptArray = (promptArray) => {
  let prompt = '';

  promptArray.forEach((promptInput) => {
    if (promptInput.author === 'human') {
      prompt += 'Human: ';
      prompt += promptInput.text;
      prompt += '\n';
      prompt += 'AI: ';
    }

    if (promptInput.author === 'ai') {
      prompt += promptInput.text;
      prompt += '\n';
    }
  });

  return prompt;
};

const processPrompt = async (prompt) => {
  logger.debug(`Processing prompt against OpenAI...`);

  const response = await openai.complete({
    engine: OPENAI_AI_ENGINE,
    prompt,
    maxTokens: parseInt(OPENAI_AI_MAX_TOKENS, 10),
    temperature: parseInt(OPENAI_AI_TEMPERATURE, 10),
    topP: parseInt(OPENAI_AI_TOP_P, 10),
    presencePenalty: parseInt(OPENAI_AI_PRESENCE_PENALTY, 10),
    frequencyPenalty: parseInt(OPENAI_AI_FREQUENCY_PENALTY, 10),
    bestOf: 1,
    n: 1,
    stream: false,
    stop: ['\n', 'Human:', 'AI:'],
  });

  return response;
};

const talk = async (message, argument) => {
  // Useful variables
  const voiceChannel = message.member.voice.channel;
  const voiceConnection = clientState.voiceConnections[voiceChannel?.id]; // Thanks @inakineitor
  const textChannel = message.channel;

  let conversation = clientState.conversations[textChannel.id]; // Get the channel conversation from the state

  if (!conversation) {
    logger.debug(
      `There is no OpenAI conversation for the text channel [${textChannel.id}], creating one...`
    );

    conversation = [];
  }

  conversation = addPromptInput('human', argument, conversation); // Add a human input to the prompt array

  const prompt = parsePromptArray(conversation); // Parse the conversation intop a procesable text
  const promptResponse = await processPrompt(prompt); // Send the text to OpenAI
  let finalText = promptResponse.data.choices[0].text;

  // If OpenAI fails we come up with a random line
  if (finalText === '') {
    logger.warning('OpenAI response was blank');

    const scriptOptions = script.what;
    const scriptText = randomArrayElement(scriptOptions);
    const sanitizedText = removeSSMLTags(scriptText);
    finalText = replacePlaceholders(sanitizedText, script, message);
  }

  conversation = addPromptInput('ai', finalText, conversation); // Add AI response to the prompt array

  clientState.conversations[textChannel.id] = conversation;

  await Promise.all([
    sendTextMessage(textChannel, finalText),
    playVoiceMessage(voiceConnection, finalText),
  ]);
};

export default talk;
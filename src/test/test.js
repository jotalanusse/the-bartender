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

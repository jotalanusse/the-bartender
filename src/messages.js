/* Helpers */
// eslint-disable-next-line no-extend-native
Array.prototype.randomElement = function randomElement() {
  console.log(this);
  return this[Math.floor(Math.random() * this.length)];
};

// TODO: Maybe replace how the messages are stored and created in the future
/* Messages */
const messages = {
  test: () => ['This is a test message my firend'].randomElement(),
  join: (args) =>
    [
      `Hello ${args.username}, I am the Bartender, and I will accompany you while you are here`,
      `Welcome ${args.username}, to the sad souls gang`,
      `Im here for you <break time="800ms"/>${args.username}`,
      'Welcome to the club <break time="3000ms"/>mate',
      'The drinks are on me tonight',
    ].randomElement(),
  random: (args) =>
    [
      'I would <emphasis level="strong">really</emphasis> prefer to be watching Bee Movie',
      `Help me ${args.username}, I lost my anime pocket pussy`,
    ].randomElement(),
  depressed: () =>
    [
      'I can\'t wait for the sweet embrace of <emphasis level="strong">death</emphasis>',
      'I am not happy <break time="1000ms"/>, I never was <break time="800ms"/>. This is a cold world <break time="500ms"/>, with cold people <break time="500ms"/>, and I can\'t stand it anymore <break time="1000ms"/>. This is my last cry for help <break time="500ms"/>, I am no longer willing to be alive <break time="1000ms"/>. I dont wan\'t to be The Bartender <break time="500ms"/>, but it is my destiny <break time="500ms"/>, it is my curse <break time="800ms"/>. I suffer so that others can be happy',
    ].randomElement(),
  orderResponses: (args) =>
    [
      `Oh yeah <break time="1000ms"/>, ${args.order} <break time="1000ms"/>, what a good choice `,
      `Here you have ${args.order}, a classic`,
      `Yes yes <break time="1000ms"/>, ${args.order} with <emphasis level="strong">a lot</emphasis> of ice`,
      `Here <break time="1000ms"/>, take your ${args.order}`,
      `Wow ${args.username}<break time="1000ms"/>, ${args.order}<break time="1000ms"/>, this is not even on the menu actually`,
      `Sweet sweet ${args.order}<break time="1000ms"/>, would you like some peanuts with that?`,
      `${args.order} <break time="1000ms"/>, here you go <break time="2000ms"/>mate`,
    ].randomElement(),
  menu: (args) =>
    [
      `For today we have: <break time="800ms"/>${messages.menuItems()}<break time="800ms"/>, ${messages.menuItems()}<break time="800ms"/>, and ${messages.menuItems()}`,
      `The only item in the menu right now is ${messages.menuItems()}`,
      `No, there is no menu ${args.username}<break time="800ms"/>, there never was<break time="800ms"/>. It was a lie <emphasis level="strong">all along</emphasis>`,
      `Look ${
        args.username
      }<break time="1000ms"/>, I can offer you a 2x1 in ${messages.menuItems()}`,
    ].randomElement(),
  menuItems: () =>
    [
      'shots of sadness',
      'a glass of tears',
      'my emotions <break time="500ms"/>with french fries',
      'failed dreams',
      'my lost hope in love',
      'ruined memories',
      'sad faces',
      'suicide daikiris',
    ].randomElement(),
  voiceConnectionRequired: (args) =>
    [
      `I can't help you if you are not connected to any voice channel ${args.username}`,
      'You need to be in a voice channel to use this command, mate',
      `Please connect to a voice channel first ${args.username}`,
      `Look ${args.username}, It would be easier for both of us if you connected to a voice channel first`,
    ].randomElement(),
  unknownCommand: (args) =>
    [
      `I don't understand what you are saying ${args.username}`,
      'Please try with another command, mate',
      `What are you talking about ${args.username}?`,
    ].randomElement(),
  tip: (args) =>
    [
      `Thank you for your money ${args.username}`,
      'Now I can finally pay rent',
      'No amount of money can fill my soul',
      'Oh yeah <break time="600ms"/>, sweet <break time="200ms"/>sweet <break time="400ms"/>money',
      `${args.username} ,<emphasis level="strong">please</emphasis> fill the tip jar as I fill your glass`,
    ].randomElement(),
  emotionalSupport: (args) =>
    [
      `It's okay ${args.username}, you are going to get better`,
      `This feeling won't last forever ${args.username}`,
      `If you need it ${args.username}, I can send you a virtual hug`,
      `Do not worry ${args.username}, I am here for you`,
    ].randomElement(),
};

export default messages;

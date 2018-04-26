module.exports = (client, message, args) => {
  if (message.author.id !== config.ownerID) return message.reply('Arrooo???');
  message.channel.send(args.join(' '));
  message.delete();
};

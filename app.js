/* eslint consistent-return: 0, no-console: 0 */
const Discord = require('discord.js');

const client = new Discord.Client();
client.config = require('./config.json');

client.log = require('./functions/log.js');

client.commands = new Discord.Collection();

client.commands.set('ping', require('./commands/ping.js'));
client.commands.set('serverinfo', require('./commands/serverinfo.js'));
client.commands.set('speak', require('./commands/speak.js'));
client.commands.set('react', require('./commands/react.js'));

client.on('message', message => require('./events/message.js')(client, message));
client.on('guildCreate', guild => require('./events/guildCreate.js')(client, guild));
client.on('ready', () => require('./events/ready.js')(client));
client.on('guildMemberAdd', member => require('./events/guildMemberAdd.js')(client, member));
client.on('messageReactionAdd', (reaction, user) => require('./events/messageReactionAdd.js')(client, reaction, user));

client.login(client.config.token);

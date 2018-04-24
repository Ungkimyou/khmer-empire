const Discord = require("discord.js");
const bot = new Discord.Client();
const PREFIX = "k!"

bot.on("message", async message => {
    if (!message.content.startsWith(PREFIX)) return;

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity(`with TaMoToJi`);
});


bot.login(process.env.TOKEN);

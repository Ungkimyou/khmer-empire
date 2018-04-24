const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity(`with TaMoToJi`);
});

bot.on("message", function(message){
    if (message.author.equals(bot.user)) return;

bot.login(process.env.TOKEN);

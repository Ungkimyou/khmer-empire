const Discord = require("discord.js");
var bot = Discord.Client();

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity(`Use >>help for help`);
});


bot.login(process.env.TOKEN);

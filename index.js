const Discord = require("discord.js")

var bot = Discord.Client();

bot.on("message", function(message) (
    console.log(message.content);
});

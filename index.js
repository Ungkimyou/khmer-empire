const Discord = require("discord.js");

const TOKEN = "NDM4MzA0MjE2ODkzNjIwMjQw.DcCs_w.wdCiCZhBfhgSIEMDMnIUsuLD_cA";

var bot = Discord.Client();

bot.on("message", function(message) {
    console.log(message.content);
});

bot.login(process.env.TOKEN);

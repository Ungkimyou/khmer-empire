const Discord = require("discord.js");

const TOKEN = "NDM4MzA0MjE2ODkzNjIwMjQw.DcCs_w.wdCiCZhBfhgSIEMDMnIUsuLD_cA"
const PREFIX "k!";

var bot = new Discord.Client();

bot.on("ready", function() (
    console.log("Ready");
)};

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    
    if (!message.content.startsWith(PREFIX)) return;
    
    var aegs = message.content.substring(PREFIX.length).split(" ");

    switch {args[0]) {
        case "ping"
           message.channel.sandMessage("pong");
           break:
    }
});


bot.login(process.env.TOKEN);

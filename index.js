const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity(`with Owner`);
});

bot.on("message", async message => {

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = 'k!';
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  if (cmd === `${prefix}help`){
    message.channel.send("```BOT-Commands: Prefix >>\n\navatar - Gets a user's avatar \nsay - {TEXT} u want type\nping - check your ping\nclear - Clean a message\nkick - kick member from server\nban - ban member from server```");
    message.delete();
    message.channel.send(text);
  }

  if (message.content === `${prefix}avatar`){
    message.author.send(message.author.avatarURL);
    message.delete();
    message.channel.send(text);
  }

  if(cmd === `${prefix}say`){
   if(!message.member.roles.some(r=>["OWNER", "ADMIN"].includes(r.name)) )
      return message.reply("```\nSorry, you don't permissions to use this!\nallow role to use [ OWNER,ADMIN ]```");
  let text = args.slice(1).join(" ");
  message.delete();
  message.channel.send(text);
}

 if(cmd === `${prefix}ping`){
 message.channel.send(new Date().getTime() - message.createdTimestamp + " ms");

}

 if(cmd === `${prefix}kick`){
    if(!message.member.roles.some(r=>["OWNER", "ADMIN"].includes(r.name)) )
      return message.reply("```\nSorry, you don't permissions to use this!\nallow role to use [ OWNER,ADMIN ]```");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please Mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "ðð¨ ð‘ðžðšð¬ð¨ð§";
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`ð‡ðšð¬ ððžðžð§ ðŠð¢ðœð¤ ${member.user.tag} ð…ð«ð¨ð¦ ð’ðžð«ð¯ðžð« ð‘ðžðšð¬ð¨ð§:${reason}`);

  }

 if(cmd === `${prefix}clear`){
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    if(!message.member.roles.some(r=>["OWNER", "ADMIN"].includes(r.name)) )
      return message.reply("```\nSorry, you don't permissions to use this!\nallow role to use [ OWNER,ADMIN ]```");
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

 if(cmd === `${prefix}ban`){
    if(!message.member.roles.some(r=>["ADMIN", "OWNER"].includes(r.name)) )
      return message.reply("```\nSorry, you don't permissions to use this!\nallow role to use [ OWNER,ADMIN ]```");   
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please Mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "ðð¨ ð‘ðžðšð¬ð¨ð§";  
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`ð‡ðšð¬ ððžðžð§ ððšð§ ${member.user.tag} ð…ð«ð¨ð¦ ð’ðžð«ð¯ðžð« ð‘ðžðšð¬ð¨ð§:${reason}`);
  }

 if(cmd === `${prefix}time`){
   message.channel.send({embed: {
     color: 15844367,
     author: {
       name: client.user.username,
       icon_url: client.user.avatarURL
     },
     title: "Heist",
     url: "http://google.com",
     description: "Starting in **15** minutes!",
     fields: [{
         name: "Theme",
         value: "TBD"
       },
       {
         name: "Objective",
         value: "TBD"
       }
     ],
     timestamp: new Date(),
     footer: {
       icon_url: client.user.avatarURL,
       text: "Accepting help"
     }
   }
});


bot.login(process.env.TOKEN);

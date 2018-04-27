
const Discord = require("discord.js");


const client = new Discord.Client();

const config = require("./config.json");



client.commands = new Discord.Collection();

client.commands.set('server', require('./commands/server.js'));
client.commands.set('speak', require('./commands/speak.js'));

client.on('messageDelete', async (message) => {
  const logs = message.guild.channels.find('name', "k-empire-logs");
  if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    message.guild.createChannel('k-empire-logs', 'logs');
  }
  if (!message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) { 
    console.log('The logs channel does not exist and tried to create the channel but I am lacking permissions')
  }  
  let user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor.username
  } else { 
    user = message.author.username
  }
  logs.send(`A message was deleted in ${message.channel.name} by ${user}`);
})


client.on("guildMemberAdd", (member) => {
  let welcomechannel = member.guild.channels.find(`name`, "k-empire-logs");
    welcomechannel.send(`DING! ${member} has join The server!`);
    member.send(`Welcome To Server, **${member.user.username}**!`);  
});

client.on("message", (message) => {
  if(message.content === "k!") {
    message.channel.send(" do k!help for help !");
    message.delete()
  }
});


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`${client.guilds.size} servers | k!help`);
});

client.on("chaanelCreate", async member => {
  console.log(`${channel.name} has been create ! `);
  let sChaanel = channel.guild.find('name', "k-empire-logs");
  sChannel.sand(`${channel.name} has been create !`);

});

client.on("chaanelDelete", async member => {
  console.log(`${channel.name} has been delete ! `);
  let sChaanel = channel.guild.find('name', "k-empire-logs");
  sChannel.sand(`${channel.name} has been delete !`);

});
  
client.on("guildMemberAdd", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(` ${client.guilds.size} servers | k!help`);
});


client.on("presenceUpdate", (oldMember, newMember) => {
  let guild = newMember.guild;
  let playRole = guild.roles.find("name", "Playing PLAYERUNKNOWN'S BATTLEGROUNDS");
  if(!playRole) return;  

  if(newMember.user.presence.game && newMember.user.presence.game.name === "PLAYERUNKNOWN'S BATTLEGROUNDS") {
    newMember.addRole(playRole);
  } else if(!newMember.user.game && newMember.roles.has(playRole.id)) {
    newMember.removeRole(playRole);
  let guild = newMember.guild;
  if(!playRole) return;
    
  }  
});

client.on("message", async message => {

  if(message.author.bot) return;
  

  if(message.content.indexOf(config.prefix) !== 0) return;



  var mutedrole = message.guild.roles.find("name", "Muted");
  

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {

    const m = await message.channel.send(":mag: Starting ...?");
    m.edit(`Your Ping is ${m.createdTimestamp - message.createdTimestamp}ms :satellite: `);
  }
  
  if(command === "clear") {
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
     if(!args[0]) return message.channel.send("no");
     message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Message Has Been Clear ${args[0]} .`).then(msg => msg.delete(2000));
 });
}


  if(command === "say") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }

  if(command == "8ball") {
    if(!args[2]) return message.reply("Please ask full question!");
    let replies = ["Yes", "No", "I Don't Know", "Ask Again Later"];
    
    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(1).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setCOlor('RANDOM')
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.channel.sand(ballembed);
 
 }
   
  if(command == "embed") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
    const embed1 = new Discord.RichEmbed()
    .setAuthor("KhmerEmpire :", "https://cdn.discordapp.com/avatars/438304216893620240/35ccf504013fd1b7870a3d717ede2ec4.jpg?size=2048")
    .setDescription(args.join(" "))
    .setColor('RANDOM')
    message.delete().catch(O_o=>{});
    message.channel.send(embed1);
    
  } 
  
  


  if(command === "kick") {
    if(!message.member.permissions.has('ADMINISTRATOR')) return msg.reply('you aren\'t n admin');
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("```md Please mention one user in order to kick them! - k!kick [@user] [reason]```");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {
    if(!message.member.permissions.has("ADMINISTRATOR")) return msg.reply('you aren\'t n admin');
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("```md Please mention one user in order to ban them! - k!ban [@user] [reason]```");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }


  if(command === "serverinfo") {
     
     let sicon = message.guild.iconURL;
     let serverembed = new Discord.RichEmbed()
    .setAuthor("KhmerEmpire'say !", "https://cdn.discordapp.com/avatars/438304216893620240/35ccf504013fd1b7870a3d717ede2ec4.jpg?size=2048")
    .setColor("#bb90ff")
    .setTitle("𝐒𝐞𝐫𝐯𝐞𝐫𝐈𝐧𝐟𝐨")
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount)
    .setThumbnail(sicon)
    .setFooter("Bot Create By ᴛᴀᴍᴏᴛᴏᴊɪ✓ᵛᵉʳᶦᶠᶦᵉᵈ#5881", "https://cdn.discordapp.com/avatars/438160518293880832/0301fdd6dffcaf6751d33a809a32941d.png?size=2048")

     message.channel.send(serverembed);
 
  }

  if(command === "help") {
     
     let sicon = message.guild.iconURL;
     let testembed = new Discord.RichEmbed()
    .setColor("#67ffbd")
    .setAuthor("KhmerEmpire Help Commands", "https://cdn.discordapp.com/avatars/438304216893620240/35ccf504013fd1b7870a3d717ede2ec4.jpg?size=2048")
    .setDescription("[Click Here](https://tamotoji533.wixsite.com/healong) View To Website :globe_with_meridians:")
    .setImage("https://cdn.discordapp.com/attachments/438367679724781579/438751636811415564/BotCommand.JPG")
    .setFooter("Bot Create By ᴛᴀᴍᴏᴛᴏᴊɪ✓ᵛᵉʳᶦᶠᶦᵉᵈ#5881", "https://cdn.discordapp.com/avatars/438160518293880832/0301fdd6dffcaf6751d33a809a32941d.png?size=2048")

     message.author.send(testembed);
 
  }

  if(command === "report") {

     let sicon = message.guild.iconURL;
     let reportembed = new Discord.RichEmbed()
    .setAuthor("KhmerEmpire Commands !", "https://cdn.discordapp.com/avatars/438304216893620240/35ccf504013fd1b7870a3d717ede2ec4.jpg?size=2048")
    .setColor("#FF0000")
    .setDescription(":x: this commands can't not allow use now ![Click Here](https://tamotoji533.wixsite.com/healong) View More :mag:")
    .setFooter("Bot Create By ᴛᴀᴍᴏᴛᴏᴊɪ✓ᵛᵉʳᶦᶠᶦᵉᵈ#5881", "https://cdn.discordapp.com/avatars/438160518293880832/0301fdd6dffcaf6751d33a809a32941d.png?size=2048")
    
     message.channel.send(reportembed);

  }

  if(command === "rsetup") {
    let sicon = message.guild.iconURL;
    let rsetupembed = new Discord.RichEmbed()
    .setAuthor("Report Setup :", "https://cdn.discordapp.com/avatars/438304216893620240/35ccf504013fd1b7870a3d717ede2ec4.jpg?size=2048")
    .addField("Create Text Channel", "Set Channel Name To [#reports]")
    .setColor("#FF0000")

    message.channel.send(rsetupembed);

    }
     
  if(command === "invite") {

     let sicon = message.guild.iconURL;
     let inviteembed = new Discord.RichEmbed()
    .setAuthor("KhmerEmpire :", "https://cdn.discordapp.com/avatars/438304216893620240/35ccf504013fd1b7870a3d717ede2ec4.jpg?size=2048")
    .addField("BOT-Invite :", "  [Check Here](https://discordapp.com/oauth2/authorize?client_id=438304216893620240&permissions=16796742&scope=bot)")
    .addField("Discord-Invite :", "  [Check Here](https://discord.gg/WMxC5rw)")
    .addField("BOT-Website :", "  [Check Here](https://tamotoji533.wixsite.com/healong)")
    .setColor("#437afb")
    .setThumbnail(message.author.avatarURL)
    .setFooter("Bot Create By : ᴛᴀᴍᴏᴛᴏᴊɪ✓ᵛᵉʳᶦᶠᶦᵉᵈ#5881")

    message.channel.send(inviteembed);
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);

    }

  if(command === "avatar") {

     let sicon = message.mentions.iconURL;
     let avatarembed = new Discord.RichEmbed()
     .setAuthor("KhmerEmpire :", "https://cdn.discordapp.com/avatars/438304216893620240/35ccf504013fd1b7870a3d717ede2ec4.jpg?size=2048")
     .setDescription("Avatar !")
     .setImage(message.author.avatarURL)
     .setColor('RANDOM')
     .setFooter("Bot Create By : ᴛᴀᴍᴏᴛᴏᴊɪ✓ᵛᵉʳᶦᶠᶦᵉᵈ#5881")
            
     message.channel.send(avatarembed);

  }


  if (command == "mute") { // creates the command mute
         if (!message.member.roles.some(r=>["ADMIN"].includes(r.name)) ) return message.reply("Sorry, you do not have the permission to do this!"); // if author has no perms
        var mutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!mutedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
        if (mutedmember.hasPermission("ADMINISTRATOR")) return message.reply("I cannot mute this member!") // if memebr is an admin
        var mutereasondelete = 10 + mutedmember.user.id.length //sets the length of the kickreasondelete
        var mutereason = message.content.substring(mutereasondelete).split(" "); // deletes the first letters until it reaches the reason
        var mutereason = mutereason.join(" "); // joins the list kickreason into one line
        if (!mutereason) return message.reply("Please indicate a reason for the mute!") // if no reason
        mutedmember.addRole(mutedrole) //if reason, kick
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); //if error, display error
        message.reply(`${mutedmember.user} has been muted by ${message.author} because: ${mutereason}`); // sends a message saying he was kicked
  
       let mutedchannel = message.guild.channels.find(`name`, "muted");
       if(!mutedchannel) return message.channel.send("Couldn't find muted channel."); 
       message.delete().catch(O_o=>{}); 
       message.channel.send(sayMessage);

  }

  if (command == "unmute") {
        if(!message.member.hasPermission("administrator")) return message.channel.send("You Need To have Permissions to this !"); // if author has no perms
        var unmutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!unmutedmember) return message.reply("```md Please mention one user in order to unmute them! - k!unmute [@user] [reason]```") // if there is no kickedmmeber var
        unmutedmember.removeRole(mutedrole) //if reason, kick
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); //if error, display error
        message.reply(`${unmutedmember.user} has been unmuted by ${message.author}!`); // sends a message saying he was kicked
    }

  if(command == "addrole") {
       if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry pal, you can't do that.");
       let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
       if(!rMember) return message.reply("Couldn't find that user, yo.");
       let role = args.join(" ").slice(22);
       if(!role) return message.reply("ADMIN");
       let gRole = message.guild.roles.find(`name`, role);
       if(!gRole) return message.reply("Couldn't find that role.");

       if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
       await(rMember.addRole(gRole.id));

       try{
          await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
       }catch(e){
          message.reply(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
  }
}

  if(command == "removerole") {
      if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry pal, you can't do that.");
      let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
      if(!rMember) return message.reply("Couldn't find that user, yo.");
      let role = args.join(" ").slice(22);
      if(!role) return message.reply("ADMIN");
      let gRole = message.guild.roles.find(`name`, role);
      if(!gRole) return message.reply("Couldn't find that role.");

      if(!rMember.roles.has(gRole.id)) return message.reply("They don't have that role.");
      await(rMember.removeRole(gRole.id));

      try{
         await rMember.send(`RIP, you lost the ${gRole.name} role.`)
      }catch(e){
         message.channel.send(`RIP to <@${rMember.id}>, We removed ${gRole.name} from them. We tried to DM them, but their DMs are locked.`)
  }
}

  if(command === "botinfo") {

     let bicon = bot.user.displayAvatarURL;
     let botembed = new Discord.RichEmbed()
     .setTitle("Bot Information")
     .setColor("#ae67fc")
     .setThumbnail(bicon)
     .addField("Bot Name", bot.user.username)
     .addField("Created On", bot.user.createdAt);

     message.channel.send(botembed);
  }



  if (command == "cookie") { // creates the command cookie
        if (args[1]) message.channel.send(message.author.toString() + " has given " + args[1] .toString() + " a cookie! :cookie:") // sends the message saying someone has given someone else a cookie if someone mentions someone else
        message.channel.send("Who do you want to send a cookie to? :cookie: (Correct usage: *cookie @username)") // sends the error message if no-one is mentioned
    }

  if (command == "purg") {
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("you don't have permissions to use this !");
     message.channel.send('Message Clean Sccessful.......:wastebasket:');
     message.channel.bulkDelete(10);
     var cleanarr = [2];
 
  }

  if (command === "asl") {
    let age = args[0]; // Remember arrays are 0-based!.
    let sex = args[1];
    let location = args[2];
    message.reply(` I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
 }  


  if (command === "listemojis") {
  const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
  message.channel.send(emojiList);

 }

  if(command === "ayy") {
   const ayy = client.emojis.find("name", "ayy", "dab",);
   message.reply(`${ayy} LMAO`);
   message.delete().catch(O_o=>{}); 
   message.channel.send(sayMessage);

 }

  
  if(command === "username") {
     let sicon = message.guild.iconURL;
     let usernameembed = new Discord.RichEmbed()
     .setColor("#ae67fc")
     .setThumbnail(sicon)
     .addField("Your Username :", message.author.username);
   
     message.channel.send(usernameembed);
  } 
  
  if(command === "eval") {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      message.delete().catch(O_o=>{}); 
      message.channel.send(sayMessage);
    
  }

});

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.login(config.token);
           

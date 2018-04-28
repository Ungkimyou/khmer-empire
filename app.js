
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const snekfetch = require('snekfetch');

const fs = require("fs")


const responses1 = [
   'Size 8====D', 'Size 8=======D', 'Size 8=========D', 'Size 8=============D', 'Size 8================D'
]

const responses = [
   'Yes , You Gay !', 'No , You Not Gay !', 'Maybe', 'I Don`t Know', 'Nope', '50%'
]


let cooldown = new Set();
let cdseconds = 5;

const talkedRecently = new Set();

client.commands = new Discord.Collection();

client.on("serverNewMember", function (server, user) {
     mybot.addMemberToRole(user, server.roles.get("name", "MEMBER"), function (err) { if (err) console.log(err) })

})


client.on('messageDelete', async (message) => {
  const logs = message.guild.channels.find('name', "k-empire-logs");
  if (message.guild.me.hasPermission('MANAGE_CHANNELS') && !logs) {
    message.guild.createChannel('name', 'k-empire-logs');
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
    welcomechannel.send(`:speaking_head:  ${member} Has Join The Server!`);
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
  client.user.setActivity(`${client.users.size} user ${client.guilds.size} svr | k!help`);
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

client.on("presenceUpdate", (oldMember, newMember) => {
  let guild = newMember.guild;
  let playRole = guild.roles.find("name", "Playing Counter-Strike: Global Offensive");
  if(!playRole) return;  

  if(newMember.user.presence.game && newMember.user.presence.game.name === "Counter-Strike: Global Offensive") {
    newMember.addRole(playRole);
  } else if(!newMember.user.game && newMember.roles.has(playRole.id)) {
    newMember.removeRole(playRole);
  let guild = newMember.guild;
  if(!playRole) return;
    
  }  
});

client.on("presenceUpdate", (oldMember, newMember) => {
  let guild = newMember.guild;
  let playRole = guild.roles.find("name", "Playing Minecraft");
  if(!playRole) return;  

  if(newMember.user.presence.game && newMember.user.presence.game.name === "Minecraft") {
    newMember.addRole(playRole);
  } else if(!newMember.user.game && newMember.roles.has(playRole.id)) {
    newMember.removeRole(playRole);
  let guild = newMember.guild;
  if(!playRole) return;
    
  }  
});

client.on("presenceUpdate", (oldMember, newMember) => {
  let guild = newMember.guild;
  let playRole = guild.roles.find("name", "Playing Grand Theft Auto V");
  if(!playRole) return;  

  if(newMember.user.presence.game && newMember.user.presence.game.name === "Grand Theft Auto V") {
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
  
  if(command === "roleadd") {
 if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry pal, you can't do that.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user, yo.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
  }catch(e){
    console.log(e.stack);
    message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
  }
}


  if(command === "clear") {
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
     if(!args[0]) return message.channel.send("no");
     message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Message Has Been Clear ${args[0]} .`).then(msg => msg.delete(2000));
 });

}

   if (command === 'cat') {
	const cat = await snekfetch.get('https://aws.random.cat/meow');

	message.channel.send(cat);
  }

	if (command === 'sayr') {
              const sayMessage = args.join(" ");
		message.react('👍').then(() => message.react('👎'));

		const filter = (reaction, user) => {
			return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
		};

		message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === '👍') {
					message.reply('you reacted with a thumbs up.');
				}
				else {
					message.reply('you reacted with a thumbs down.');
				}
			})
			.catch(collected => {
				console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
				message.reply('you didn\'t react with neither a thumbs up, nor a thumbs down.');
                                message.delete()
			});
	}

  if(command === "gay") {
   message.reply(`${responses[Math.floor(Math.random() * responses.length)]}`);
   message.delete()
}  

  if(command === "dick") {
   message.reply(`${responses1[Math.floor(Math.random() * responses.length)]}`);
   message.delete()
}  


  if(command === "say") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);

  }


  if(command === "embed") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
    const embed1 = new Discord.RichEmbed()
    .setAuthor("KhmerEmpire :", message.author.avatarURL)
    .setDescription(args.join(" "))
    .setColor('RANDOM')
     message.delete().catch(O_o=>{});
     message.channel.send(embed1);
    
  } 
    
   if(command == "chatembed") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
    if(args[0] == "help"){
    message.reply("```Plesae Create a Channel #chat Frist , For Bot Can Reply Chat To - #chat```")
    return;
 }
    let reportEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setDescription(args.join(" "))
    .setColor('RANDOM')

    let chatchannel = message.guild.channels.find(`name`, "chat");
    if(!chatchannel) return message.channel.send("you need create channel #chat to chat !");

    message.delete().catch(O_o=>{});
    chatchannel.send(reportEmbed);

   }
       


    if(command == "report") {
       if(args[0] == "help"){
      message.reply("Please mention one user in order to report them! - `k!report [@user] [reason]`");
      return;
    }
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setThumbnail(message.author.avatarURL)
    .setColor('RANDOM')
    .addField("Reported User", `${rUser} `)
    .addField("Reported By", `${message.author}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("you need create channel #reprots to report player !");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    let prefix = prefixes[message.guild.id].prefixes;
    if(!message.content.startsWith(prefix)) return;
    if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("You have to wait 5 seconds between commands.")
  }
  if(!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  }

}

  if(command === "username") {
    if(message.mentions.users.first()) {
    let user = message.mentions.users.first();
    let output = user.username + user.discriminator
    "\nAvatar URL: " + user.avatarURL;
    message.channel.sendMessage(output);
  } else {
          message.reply("Invalid user."); 
    }
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
    .setAuthor("KhmerEmpire'say !", "https://cdn.discordapp.com/avatars/438304216893620240/56e6af0be67496ad591a1eba34075fc5.png?size=1024")
    .setColor("#bb90ff")
    .setTitle("Server-Info :")
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount)
    .setThumbnail(sicon)

     message.channel.send(serverembed);
 
  }

  if(command === 'botinfo') {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    return message.channel.send(botembed);
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
    .addField("Discord-Invite :", "  [Check Here](https://discord.gg/7mS9GEY)")
    .addField("BOT-Website :", "  [Check Here](https://tamotoji533.wixsite.com/healong)")
    .setColor("#437afb")
    .setThumbnail(message.author.avatarURL)
    .setFooter("Bot Create By : ᴛᴀᴍᴏᴛᴏᴊɪ✓ᵛᵉʳᶦᶠᶦᵉᵈ#5881")

    message.channel.send(inviteembed);
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);

    }


else if (command === 'avatar') {
    if (!message.mentions.users.size) {
        return message.author.send(`Your Avatar is: ${message.author.displayAvatarURL}`);
    }

    const avatarList = message.mentions.users.map(user => {
        return `${user.username}'s Avatar: ${user.displayAvatarURL}`;
    });


  if (command == "mute") { // creates the command mute
   if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("Sorry : you don't have MUTE_MEMBERS permission to do this ");
        var mutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!mutedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
        if (mutedmember.hasPermission("MUTE_MEMBERS")) return message.reply("I cannot mute this member!") // if memebr is an admin
        var mutereasondelete = 10 + mutedmember.user.id.length //sets the length of the kickreasondelete
        var mutereason = message.content.substring(mutereasondelete).split(" "); // deletes the first letters until it reaches the reason
        var mutereason = mutereason.join(" "); // joins the list kickreason into one line
        if (!mutereason) return message.reply("Please indicate a reason for the mute!") // if no reason
        mutedmember.addRole(mutedrole) //if reason, kick
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); //if error, display error

       let muteembed = new Discord.RichEmbed()
        
       .setTitle("~==Mute==~")
       .setColor('#FF0000')
       .setThumbnail(mutedmember.user)
       .addField('User:', mutedmember.user)  
       .addField('Muted By:', message.author)
       .addField('Reason:', mutereason)
       
       return message.channel.send(muteembed);
       
  }

  if (command == "unmute") {
   if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("Sorry : you don't have MUTE_MEMBERS permission to do this ");
        var unmutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!unmutedmember) return message.reply("```md Please mention one user in order to unmute them! - k!unmute [@user] [reason]```") // if there is no kickedmmeber var
        unmutedmember.removeRole(mutedrole) //if reason, kick
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); //if error, display error
   
       let unmuteembed = new Discord.RichEmbed()
        
       .setTitle("~==UnMute==~")
       .setColor('#FF0000')
       .setThumbnail(unmutedmember.user)
       .addField('User:', unmutedmember.user)  
       .addField('UnMuted By:', message.author)

       return message.channel.send(unmuteembed); 
  }

    if (command == "help") { // creates a command *help
        let embedhelpmember = new Discord.RichEmbed() // sets a embed box to the variable embedhelpmember
            .setTitle("**List of Commands**\n") // sets the title to List of Commands
            .setThumbnail(message.author.avatarURL)
            .addField(" - report", "report player from server k!report [user] [reason]")
            .addField(" - help", "Displays this message (Correct usage: k!help)") // sets the first field to explain the command *help
            .addField(" - info", "Tells info about myself | k!info help :grin:") // sets the field information about the command *info
            .addField(" - ping", "Tests your ping (Correct usage: k!ping)") // sets the second field to explain the command *ping
            .addField(" - cookie", "Sends a cookie to the desired player! :cookie: (Correct usage: k!cookie @username @munber)") // sets the third field to explain the command *cookie
            .addField(" - gay", "bot is tell your gay or not") 
            .addField(" - dick", "bot is tell your dick size")
            .addField(" - Invite", "Invite KhmerEmpire to the server !")
            .addField(" - serverinfo ", "tell info about server ")
            .addField(" - helpadmin ", "list of admin commands - this cmd allow for have perms ADMINISTRATOR")
            .setColor('RANDOM') // sets the color of the embed box to orange
            .setFIeld("Join The Support Server :", "[Click Here](https://discord/7mS9GEY)") // sets the footer to "You need help, do you?"
             message.channel.send(embedhelpmember);

     }

    if (command == "helpadmin") {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry : you don't have ADMINISTRATOR permission to see admin commands ");
        let embedhelpadmin = new Discord.RichEmbed() // sets a embed box to the var embedhelpadmin
            .setTitle("**List of Admin Commands**\n") // sets the title
            .setThumbnail(message.author.avatarURL)
            .addField(" - chatembed", "this is a cool commands for admin say to channel #chat more k!chatembed help")
            .addField(" - say", "Makes the bot say whatever you want (Correct usage: k!say [message])")
            .addField(" - mute", "Mutes a desired member with a reason (Coorect usage: k!mute @username [reason])") // sets a field
            .addField(" - unmute", "Unmutes a muted player (Correct usage: k!unmute @username)")
            .addField(" - kick", "Kicks a desired member with a reason (Correct usage: k!kick @username [reason])") //sets a field
            .addField(" - ban" , "ban a player u want to ban k!ban @username [reason]")
            .setColor('RANDOM') // sets a color
            .addField(" - clear" , "clear message from channel k!clear [am] ") 
            .addField(" - rsetup", "rsetup is report setup channel ")
            .setFooter("Join The Support Server :", "[Click Here](https://discord/7mS9GEY)") // sets the footer
           message.channel.send(embedhelpadmin); // sends the embed box "embedhelpmember" to the chatif
    }



    if (command == "cookie") { // creates the command cookie
        if (args[1]) message.channel.send(message.author.toString() + " has given " + args[1].toString() + " a cookie! to  :cookie:") // sends the message saying someone has given someone else a cookie if someone mentions someone else
        else message.channel.send("Who do you want to send a cookie to? :cookie: (Correct usage: k!cookie @username @munber)")
        message.delete() // sends the error message if no-one is mentioned
    }


  if (command === "info") {
    let name = args[0]; // Remember arrays are 0-based!.
    let yearold = args[1];
    let Gender = args[2];
    let LikeColor = args[3]
    let Location = args[4];
    let Like = args[5];
    let Dislike = args[6];
    let LikeGame = args[7];
    let SleepTime = args[8];

    let infoembed = new Discord.RichEmbed()
    .addField("User Info By :", message.author.tag)
    .setThumbnail(message.author.avatarURL)
    .setColor('RANDOM')
    .addField("Name :", name)
    .addField("Year Old :", yearold)
    .addField("Gender :", Gender)
    .addField("Like Color :", LikeColor)
    .addField("Location :", Location)
    .addField("Like :", Like)
    .addField("DisLike :", Dislike)
    .addField("LikeGame", LikeGame)
    .addField("SleepTime :", SleepTime);

    
    message.channel.send(infoembed);
 }  


  if (command === "listemojis") {
  const emojiList = message.guild.emojis.map(e=>e.toString()).join(" ");
  message.channel.send(emojiList);

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
    if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("you don't have permissions to use this !");
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      message.delete().catch(O_o=>{}); 
      message.channel.send(sayMessage);
      message.delete()
    
  }

  if(command === "addrole") {
   if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Sorry : you don't have MANAGE_ROLES permission to do this ");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("``` Please mention user you want to addrole \n- k!addrole [@user] [Roles]```");
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("Specify a role!");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("Couldn't find that role.");

    if(rMember.roles.has(gRole.id)) return message.reply("User In The Role !");
    await(rMember.addRole(gRole.id));

    try{
      await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
    }catch(e){
      console.log(e.stack);
      message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
    }
  }

  if(command === "removerole") {
   if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply("Sorry : you don't have MANAGE_ROLES permission to do this ");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("``` Please mention user you want to addrole \n- k!addrole [@user] [Roles]```");
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("Specify a role!");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("Couldn't find that role.");

    if(rMember.roles.has(gRole.id)) return message.reply("User In The Role !");
    await(rMember.addRole(gRole.id));

    try{
      await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
    }catch(e){
      console.log(e.stack);
      message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
    }
  }    


    message.channel.send(avatarList);
}


});

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.login(config.token);
           

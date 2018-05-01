
const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();





const responses1 = [
   'Size 8====D', 'Size 8=======D', 'Size 8=========D', 'Size 8=============D', 'Size 8================D'
]

const responses = [
   'Yes , You Gay !', 'No , You Not Gay !', 'Maybe', 'I Don`t Know', 'Nope', 'Gay . 50%'
]

function setActivity() {
    //Variable Array for what the setGame can be set to
    var Gameinfo = [`Prefix: ${config.prefix}`, `Running on ${client.guilds.size} Servers`, `Try ${config.prefix}help`, `${config.prefix}help`,
        `Using ${(((process.memoryUsage().heapUsed)/1024)/1024).toFixed(0)}Mb's of RAM`, `Ping : ${(client.ping).toFixed(0)} Ms`, `KhmerBOT | Cambodia`
    ]

    var info = Gameinfo[Math.floor(Math.random() * Gameinfo.length)]; //Random Math to set the setGame to something in the GameInfo array

    client.user.setActivity(info) // "playing Game" '...' Sets the setGame to what the info Random math picked from the GameInfo Array
    if (config.debugMode === "1") {
        console.log(`[ LOG ] set Activity set to ( ${info} )`) //Logs to console what the setGame was set as.
    }

}

setInterval(setActivity, 1200 * 60 * 2)

const talkedRecently = new Set();

client.commands = new Discord.Collection();


client.on("message", (message) => {
  if(message.content === "k!") {
    message.channel.send(" do k!help for help !");
    message.delete()
  }
});
 

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
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
  let playRole = guild.roles.find("name", "Playing Counter-Strike Global Offensive");
  if(!playRole) return;  

  if(newMember.user.presence.game && newMember.user.presence.game.name === "Counter-Strike Global Offensive") {
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

client.on('guildMemberAdd', member => {
    let role = member.guild.roles.find(`name`, "MEMBER");
    let channel = member.guild.channels.find('name', 'welcome-leave');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | Name » ', `${member}`)
        .addField(':confetti_ball: | Welcome!', `Welcome to the server, ${member}`)
        .addField(':id: | User »', "**[" + `${member.id}` + "]**")
        .addField(':family_mwgb: | You Are The Member »', `${member.guild.memberCount}`)
        .setFooter(`${member.guild.name}`)
        .setTimestamp()

        channel.sendEmbed(embed);
        member.addRole(role);
});
client.on("message", async message => {

  if(message.author.bot) return;
 

  if(message.content.indexOf(config.prefix) !== 0) return;
   let mutedrole = message.guild.roles.find("name", "KE-Muted");

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  

  if(command === "ping") {
    const newemb = new Discord.RichEmbed()
    .setTitle(message.author.tag, true)
    .setColor(0xFFBF00)
    .addField('```Ping : ```', new Date().getTime() - message.createdTimestamp + " ms ", true)
    message.channel.send({embed: newemb})
}
  
  if(command === "addrole") {
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

  if(command === "remvoerole") {
   if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Sorry pal, you can't do that.");
   if(args[0] == "help"){
     message.reply("Usage: !removerole <user> <role>");
     return;
   }
   let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
   if(!rMember) return message.reply("Couldn't find that user, yo.");
   let role = args.join(" ").slice(22);
   if(!role) return message.reply("Specify a role!");
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


  if(command === "clear") {
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
     if(!args[0]) return message.channel.send("no");
     message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Message Has Been Clear ${args[0]} .`).then(msg => msg.delete(2000));
 });

}
 
 if(command === "nick") {
  if(message.author.id !== config.ownerID) return;
  let nickname = args.join(' ')
  message.guild.members.get('438304216893620240')
  	.setNickname(nickname);
  await message.channel.send({
  	embed: new Discord.RichEmbed()
  	.setTitle(`Changed Bot Nickname To : ${nickname}`)
  })
 }
  

  if(command === "pat") {
     var images = ["https://cdn.discordapp.com/attachments/424667806320033814/437807617965031424/unnamed_1.gif", "https://cdn.glitch.com/5df641e3-8d98-4abb-9045-d5482434003a%2FJake_pat.gif?1524497996034", "https://media.tenor.com/images/cdc004bbbaba6f60d8e62a1f127516e0/tenor.gif"];
     var rand = Math.floor(Math.random() * images.length);
     var randomImage = images[rand];

     const patEmb = new Discord.RichEmbed()
    .setColor(0xA901DB)
    .setImage(randomImage);
    const sadEmb = new Discord.RichEmbed()
   .setColor(0xA901DB)
   .setImage('https://media.giphy.com/media/Y4z9olnoVl5QI/giphy.gif');
   if(!args[0]) {
    message.channel.send(`<@${message.author.id}> «PAT» <@${message.author.id}>..Oh Wait You Can\'t Pay Yourself : Please Pat User » k!pat @user`, {embed: sadEmb});
    return;
  }

  if (!message.mentions.users.first()) return message.channel.send(`Please mention someone!`).then(msg => {
      msg.delete(3000)
    });
  message.channel.send(`<@${message.author.id}> «PAT» ${args[0]}`, {embed: patEmb});

}
  if(command === "botspec") {
    const os = require('os');
    const arch = os.arch()
    const used = process.memoryUsage().heapUsed / 1024 / 1024;

    let totalSeconds = process.uptime();
    let realTotalSecs = Math.floor(totalSeconds % 60);
    let days = Math.floor((totalSeconds % 31536000) / 86400);
    let hours = Math.floor((totalSeconds / 3600) % 24);
    let mins = Math.floor((totalSeconds / 60) % 60);

    var ping = client.ping
    message.delete()
    message.channel.send(`\n= Memory usage: ${Math.round(used * 100) / 100}MB\n= Ping: ${ping}\n= Uptime: Days: ${days} | Hours: ${hours} | Minutes: ${mins} | Seconds: ${realTotalSecs}\n= Node: ${process.version}\n= Library: discord.js\n= ARCH: ${arch}\n= Plataform: ${os.platform}\n= Servers: ${client.guilds.size}\n= Users: ${client.users.size}`, {
        code: 'AsciiDoc'
    })

}
 
 if(command === "luckymunber") {
  var LuckNumber = Math.floor((Math.random() * 12000) + 0.120);
  const numEmb = new Discord.RichEmbed()
  .setColor(0xFFFF00)
  .setAuthor('LUCKY NUMBER', 'https://vignette.wikia.nocookie.net/nintendo/images/0/02/Question_Block_NSMB.png/revision/latest?cb=20151206055532&path-prefix=en')
  .addField('And your lucky number is...', `${LuckNumber}!`);
  message.channel.send({embed: numEmb})

}

  if(command === "reverse") {
  if(!args[0]) return message.channel.send('Correct usage: **k!reverse (text to reverse)**');

  function reverseString(str) {
      return str.split("").reverse().join("");
  }

  let sreverse = reverseString(args.join(' '))
   
  if(args[0] === sreverse) {
  
  sreverse = `${args.join(' ')}..Wait... You broke it!`
  
  }
  const reverseEmbed = new Discord.RichEmbed()
  .setAuthor(`${message.author.tag}`, message.author.avatarURL)
  .setColor(0xFFF000)
  .addField('Input: ', '```' + `${args.join(' ')}` + '```')
  .addField('Output: ', '```' + `${sreverse}` + '```')
  message.channel.send({embed: reverseEmbed})
    
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

  if(command === "8ball") {
 
 if(!args[0]) {
  const errEmbed = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setAuthor('ERROR')
  .setTitle(':exclamation: Usage: **k!8ball (question)**');
  message.channel.send({embed: errEmbed})
  return;
}
var sayings = ["It is certain",
										"It is decidedly so",
										"Without a doubt",
										"Yes, definitely",
										"You may rely on it",
										"As I see it, yes",
										"Most likely",
										"Outlook good",
										"Yes",
                                                                                "i don't know",
										"Signs point to yes",
										"Reply hazy try again",
										"Ask again later",
										"Better not tell you now",
										"Cannot predict now",
										"Concentrate and ask again",
										"Don't count on it",
										"My reply is no",
										"My sources say no",
										"Outlook not so good",
										"Very doubtful"];

			var result = Math.floor((Math.random() * sayings.length) + 0);
      const ballEmb = new Discord.RichEmbed()
      .setColor(0x00FFFF)
      .setAuthor('8Ball', 'https://findicons.com/files/icons/1700/2d/512/8_ball.png')
      .addField(args, sayings[result]);
			message.channel.send({embed: ballEmb})
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

if (command === "serverinfo") {
  let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
  let day = message.guild.createdAt.getDate()
  let month = 1 + message.guild.createdAt.getMonth()
  let year = message.guild.createdAt.getFullYear()
   let sicon = message.guild.iconURL;
   let serverembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(`Server Created • Day:${day} | Month:${month} | Year:${year}`)
   .setColor('RANDOM')
   .setThumbnail(sicon)
   .addField("Name", message.guild.name, true)
   .addField("OWNER", message.guild.owner.user.tag, true)
   .addField("Region", message.guild.region, true)
   .addField("Channels", message.guild.channels.size, true)
   .addField("MEMBER", message.guild.memberCount, true)
   .addField("Humans", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
   .addField("BOT", message.guild.members.filter(m => m.user.bot).size, true)
   .addField("Online", online.size, true)
   .addField("Roles", message.guild.roles.size, true)
   .addField("You Join", message.member.joinedAt, true);
   message.channel.send(serverembed);

}


if (command === "userinfo") {
    if(args[0] == "help"){
    message.reply("```k!userinfo [NAME] [YearOld] [Gander] [Home,] [Like,Playgame,more] [Dislike]:```");
    return;
  }
  let [name, yearold, Gander, home, like, dislike] = args;
  let infoembed = new Discord.RichEmbed()

   .addField(":bust_in_silhouette: Name", name)
   .addField(":levitate: Year Old", yearold)
   .addField(":busts_in_silhouette: Gander", Gander)
   .addField(":homes: Home From", home)
   .addField(":thumbsup: Like ", like)
   .addField(":thumbsdown: DisLike", dislike)
   .setColor('RANDOM')
   .setTimestamp()
   .setThumbnail(message.author.avatarURL)

    message.channel.send(infoembed);
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
}


   if(command == "chatembed") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
    if(args[0] == "help"){
    message.reply("```Create #chat first and do k!chatembed on the channel you want message sand to #chat```");
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
       
   if(command == "annembed") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
    if(args[0] == "help"){
    message.reply("```Create #annoucements first and do k!chatembed on the channel you want message sand to #annoucements```");
    return;
  }
    let annEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setDescription(args.join(" "))
    .setColor('RANDOM')
    .setTimestamp()

    let chatchannel = message.guild.channels.find(`name`, "annoucements");
    if(!chatchannel) return message.channel.send("you need create channel #annoucements to chat !");

    message.delete().catch(O_o=>{});
    chatchannel.send(annEmbed);

   }

  if(command === "help") {
     
     let useravatar = message.author.avatarURL;
     let helpembed = new Discord.RichEmbed()
    .setAuthor("KhmerEmpire' !", "https://cdn.discordapp.com/avatars/438304216893620240/56e6af0be67496ad591a1eba34075fc5.png?size=1024")
    .setColor('RANDOM')
    .setTitle("Bot-Commands :")
    .addField('» Ping ', "Check You Ms")
    .addField('» 8ball', "Question 8ball")
    .addField('» Pat ', "Pat a Player ")
    .addField('» Luckymunber', "Tell Your LuckyMunber")
    .addField('» Gay', "Tell You Gay or Not")
    .addField('» Dick', "Show Your Dick Size")
    .addField('» Serverinfo', "Show Info About in Server")
    .addField('» Botinfo', "Show Into About on BOT")
    .addField('» Avatar', "Check User Avatar | k!avatar @user")
    .addField('» Userinfo ', "Show info About Yourself to #userinfo")
    .addField('» Say', "Bot is say")
    .addField('» Embed', "Bot is say Embed TEXT")
    .addField('» ChatEmbed', "Chat To #chat | k!chatembed help")
    .addField('» AnnEmbed', "Chat To #announcements | k!annembed help")
    .addField('» BotSpec', "Check Bot Spec")
    .addField('» Addrole', "Addrole For Player ")
    .addField('» Welcome-leave', "New Member Message » Create Channel » SetName: #welcome-leave")
    .addField('» Removerole', "Remove Role From Player")
    .addField('» AutoRoleJoin', "Create Roles » MEMBER » Bot is AutoRole For New Member")
    .addField('» Mute', "Mute Player | k!mute help")
    .addField('» Unmute', "Unmute For Player | k!unmute help")
    .addField('» Kick', "Kick Player From a Server")
    .addField('» Ban', "Ban Player From a Server")
    .setThumbnail(useravatar)

     message.channel.send(helpembed);
 
  }

    if (command == "mute") { // creates the command mute

    if(!message.member.permissions.has('MUTE_MEMBERS')) return message.reply("Sorry : you don't have MUTE_MEMBERS permission to do this "); 
    if(args[0] == "help"){
    message.reply("```Create Role [KE-Muted] first and add KE-Muted off Perms : ViewChannel-ReadChannel-ChatMessage to Channel```");
    return;
  }
        var mutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!mutedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
        if (mutedmember.hasPermission("ADMINISTRATOR")) return message.reply("I cannot mute this member!") // if memebr is an admin
        var mutereasondelete = 10 + mutedmember.user.id.length //sets the length of the kickreasondelete
        var mutereason = message.content.substring(mutereasondelete).split(" "); // deletes the first letters until it reaches the reason
        var mutereason = mutereason.join(" "); // joins the list kickreason into one line
        if (!mutereason) return message.reply("Please indicate a reason for the mute!") // if no reason
        mutedmember.addRole(mutedrole) //if reason, kick
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); //if error, display error
        message.delete();
        message.reply(`Has Been Muted » ${mutedmember.user} Because: ${mutereason} :white_check_mark:`); // sends a message saying he was kicked
    }

    if (command == "unmute") { // creates the command unmute
     if(!message.member.permissions.has('MUTE_MEMBERS')) return message.reply("Sorry : you don't have MUTE_MEMBERS permission to do this "); 
        var unmutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!unmutedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
        unmutedmember.removeRole(mutedrole) //if reason, kick
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`));
        message.delete();
        message.reply(`Has Been Unmute » ${unmutedmember.user} :white_check_mark:`); // sends a message saying he was kicked
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
    if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply("Sorry : you don't have ADMINISTRATOR permission to do this ");
        var kickedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!kickedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
        if (!kickedmember.kickable) return message.reply("I cannot kick this member!") // if the member is unkickable
        var kickreasondelete = 10 + kickedmember.user.id.length //sets the length of the kickreasondelete
        var kickreason = message.content.substring(kickreasondelete).split(" "); // deletes the first letters until it reaches the reason
        var kickreason = kickreason.join(" "); // joins the list kickreason into one line
        if (!kickreason) return message.reply("Please indicate a reason for the kick!") // if no reason
        kickedmember.kick(kickreason) //if reason, kick
            .catch(error => message.reply(`Sorry @${message.author} I couldn't kick because of : ${error}`)); //if error, display error
        message.reply(`\n${kickedmember.user.username} Has Kick By : ${message.author.username} \nBecause: ${kickreason}`); // sends a message saying he was kicked
    }
  
  if(command === "ban") {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Sorry : you don't have ADMINISTRATOR permission to do this ");
    
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


  if(command === 'botinfo') {
    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor('RANDOM')
    .setThumbnail(bicon)
    .addField("Bot Name", client.user.username, true)
    .addField("TotalUser", client.users.size, true)
    .addField("On Servers", client.guilds.size, true)
    .addField("Bot Create By :", "TaMoToJiᵛᵉʳᶦᶠᶦᵉᵈ#5881", true)
    .addField("Created On", client.user.createdAt, true);

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
    .addField("Oppaai :", ":dog: ")
    .setColor("#437afb")
    .setThumbnail(message.author.avatarURL)
    .setFooter("Bot Create By : TaMoToJiᵛᵉʳᶦᶠᶦᵉᵈ#5881")

    message.channel.send(inviteembed);
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);

    }


else if (command === 'avatar') {
    if (!message.mentions.users.size) {
        let avatarembed = new Discord.RichEmbed()
        .setTitle(" Avatar")
        .setImage(message.author.displayAvatarURL)
        
        message.channel.sand(avatarembed);

    }

    const avatarList = message.mentions.users.map(user => {
        return `${user.username}'s Avatar: ${user.displayAvatarURL}`;
    });

 if (command === "av") {
   let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.author;

   let embed = new Discord.RichEmbed() 
	.setTitle(member.tag + '\' avatar')
	.setImage(member.avatarURL);

    message.channel.send({embed})

}


    if (command == "cookie") { // creates the command cookie
        if (args[1]) message.channel.send(message.author.toString() + " has given " + args[1].toString() + " a cookie! to  :cookie:") // sends the message saying someone has given someone else a cookie if someone mentions someone else
        else message.channel.send("Who do you want to send a cookie to? :cookie: (Correct usage: k!cookie @username @munber)")
        message.delete() // sends the error message if no-one is mentioned
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

    if (command == "mute") { // creates the command mute
    if(!message.member.permissions.has("MUTE_MEMBERS")) return message.channel.send("you don't have MUTE_MEMBERS permissions to use this !"); // if author has no perms
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
    }

    if (command == "unmute") { 
    if(!message.member.permissions.has("MUTE_MEMBERS")) return message.channel.send("you don't have MUTE_MEMBERS permissions to use this !"); // if author has no permsf author has no perms
        var unmutedmember = message.mentions.members.first(); // sets the mentioned user to the var kickedmember
        if (!unmutedmember) return message.reply("Please mention a valid member of this server!") // if there is no kickedmmeber var
        unmutedmember.removeRole(mutedrole) //if reason, kick
            .catch(error => message.reply(`Sorry ${message.author} I couldn't mute because of : ${error}`)); //if error, display error
        message.reply(`${unmutedmember.user} has been unmuted by ${message.author}!`); // sends a message saying he was kicked
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
           

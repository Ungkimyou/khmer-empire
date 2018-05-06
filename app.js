const gifSearch = require("gif-search");
const info = require('systeminformation');
const urban = require("urban");
const sm = require('string-similarity');
const randomPuppy = require('random-puppy');
const request = require("request");
const db = require('quick.db');
const figlet = require('figlet');
const economy = require('discord-eco');
const ms = require("ms");
const weather = require('weather-js');
const snek = require('snekfetch');
const encode = require('strict-uri-encode');
const superagent = require("superagent");
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const config = require("./config.json");
const fs = require('fs');

const {
    parse
} = require('fast-html-parser');
const {
    get
} = require('snekfetch');
const {
    parse: qs
} = require('querystring');
const {
    lazy: uf
} = require('unfluff');
const profanities = require('profanities');
const exec = require('child_process').exec;

let os = require('os')
let cpuStat = require("cpu-stat")

const hook = new Discord.WebhookClient('442255952813490199', 'ezSavA3yHjyby-taCzzGFpKkAFDnIPZ89SKfCz519iljNzPHbrFELxVJf1UthBS6_PK6');
const client = new Discord.Client();
const PREFIX = "k!";
const api = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";
const talkedRecently = new Set();

const randos = ['f84c6a790a4e45e0879bcd49ebd4c4e2', '879d4fb880a84b80bc474d0f85964a47', '61699b2ed3274a019f1e0ea8c3f06bc6', '853c80ef3c3749fdaa49938b674adae6'];

async function getUUID (name) {
	let json = await request( { uri: `https://api.mojang.com/users/profiles/minecraft/${name}?at=${moment().format('x')}`, json: true } );
	if (!json || json.error) return undefined;
	else return json.id;
}

hook.send('📡 KhmerEmpire Restarting Successfully...');

client.commands = new Discord.Collection();

client.on("message", (message) => {
const swearWords = ["fuck", "FUCK", "SHIT", "shit", "PORN", "porn", "xnxx", "XNXX", "sh**"];
if( swearWords.some(word => message.content.includes(word)) ) {
  message.reply("Oh no you said a bad word!!!");
  message.react('❌');
  message.delete(9999);
 }
});

client.on("message", (message) => {
  if(message.content === "k!") {
    message.channel.send("`Do k!help for help !`");
    message.delete(6000)
  }
});
 
client.on("guildCreate", async guild => {
  const invite = await guild.channels.first().createInvite({
    maxAge: 0
  });
  console.log(`Bot Has Invite To New Guild » ${guild.name} with invite: https://discord.gg/${invite.code}`)
});

function setActivity() {
    //Variable Array for what the setGame can be set to
    var Gameinfo = [`Prefix: ${config.prefix}`, `Run on ${client.guilds.size} Servers`, `${config.prefix}help`,
        `Using ${(((process.memoryUsage().heapUsed)/1024)/1024).toFixed(0)}Mb's of RAM`, `Ping to API: ${(client.ping).toFixed(0)} Ms`, `I ❤ CAMBODIA` // Change these to what you want, add as many or as few as you want to
    ]

    var info = Gameinfo[Math.floor(Math.random() * Gameinfo.length)]; //Random Math to set the setGame to something in the GameInfo array

    client.user.setActivity(info) // "playing Game" '...' Sets the setGame to what the info Random math picked from the GameInfo Array
    if (config.debugMode === "1") {
        console.log(`[ LOG ] set Activity set to ( ${info} )`) //Logs to console what the setGame was set as.
    }

}

setInterval(setActivity, 1000 * 60 * 2)


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
        .addField(':bust_in_silhouette: | Name » ', `${member}`, true)
        .addField(':confetti_ball: | Welcome!', `Welcome to the server, ${member}`, true)
        .addField(':id: | User »', "**[" + `${member.id}` + "]**", true)
        .addField(':family_mwgb: | You Are The Member »', `${member.guild.memberCount}`, true)
        .setFooter(`${member.guild.name}`)
        .setTimestamp()

        channel.sendEmbed(embed);
        member.addRole(role);
});

client.on('guildMemberRemove', member => {
    let channel = member.guild.channels.find('name', 'welcome-leave');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField('Name:', `${member}`)
        .addField('Has Let the Server', ';(')
        .addField('The server now as', `${member.guild.memberCount}` + " members")
        .setFooter(`${member.guild.name}`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

client.on("message", async message => {

  if(message.author.bot) return;
 
       if (talkedRecently.has(message.author.id)) {
            message.channel.send("**Wait 20 Second Before Getting Typing This Again.** - " + message.author);
    } else {
   if(message.content.indexOf(config.prefix) !== 0) return;
   let mutedrole = message.guild.roles.find("name", "KE-Muted");

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
 
  
  if(command === "meme") {
  if(message.author.bot) return;
  if(message.channel.type !=="text") return;
  
   randomPuppy('memes')
  .then(url => {
      const embed = new Discord.RichEmbed()
        .setTimestamp()
        .setImage(url)
        .setColor('RANDOM')
        message.channel.send({ embed });
  })
}

  if(command === "get") {
  let [title, contents] = args.join(" ").split("|");
  if(!contents) {
    [title, contents] = ["Achievement Get", title];
  }
  let rnd = Math.floor((Math.random() * 39) + 1);
  if(args.join(" ").toLowerCase().includes("burn")) rnd = 38;
  if(args.join(" ").toLowerCase().includes("cookie")) rnd = 21;
  if(args.join(" ").toLowerCase().includes("cake")) rnd = 10;

  if(title.length > 22 || contents.length > 22) return message.edit("Max Length: 22 Characters. Soz.").then(message.delete.bind(message), 2000);
  const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
  snek.get(url)
   .then(r=>message.channel.send("", {files:[{attachment: r.body}]}));
  message.delete(200);

}
  
  if(command === "hentai") {
  if(!message.channel.nsfw) {return message.channel.send(`:underage: **This channel is not marked as NSFW!** :angry: `)}
  else{
  randomPuppy('hentai')
            .then(url => {
                const embed = new Discord.RichEmbed()             
                .setTitle(`Hentai NSFW`)
                .setFooter(`Requested by ${message.author.tag}`)
                .setImage(url)
                .setColor("#FF67CD")
    return message.channel.send({ embed });
            })
  }
}
  
    if(command === "gif") {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;

    if (!args[0]) return message.channel.send("`"+PREFIX+"gif <gname>`");

    gifSearch.random(args[0]).then(
        gifUrl => {

        let randomcolor = ((1 << 24) * Math.random() | 0).toString(16) //Optional
        var embed = new Discord.RichEmbed()
            .setColor(`#${randomcolor}`)
            .setImage(gifUrl)
        message.channel.send(embed);
    });

  if(command === "hastebin") {
	if (!args.slice(0)
		.join(' ')) return message.channel.send('Please, Provide the text! Usage: ${client.prefix}hastebin <text>')
		.then(message => message.delete({
			timeout: 10000
		}));
	snek.post('https://hastebin.com/documents')
		.send(args.slice(0)
			.join(' '))
		.then(body => {
			message.channel.send('**Posted Text To Hastebin**\n__**URL**__: https://hastebin.com/' + body.body.key);
		});

  }
   

  if(command === "pussy") {
    if (!message.channel.nsfw) return message.channel.send(":underage: NSFW Command. Please switch to NSFW channel in order to use this command.")

    var subreddits = [
        'pussy',
        'rearpussy',
        'simps',
        'vagina',
        'MoundofVenus',
        'PerfectPussies',
        'spreading'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
        .then(url => {
            snek.get(url).then(r => {
                fs.writeFile(`pussy.jpg`, r.body)
                message.channel.sendFile(r.body)
                fs.unlink(`./pussy.jpg`)
            })
        })
}

  if(command === "boobs") {
    var max = 12449;
    var min = 10000;
    var MathRan = Math.floor(Math.random() * (max - min + 0)) + min;
    var MathLoL = Math.round(MathRan);
    if (!message.channel.nsfw) {
        message.channel.send(":underage: NSFW Command. Please switch to NSFW channel in order to use this command.")
    } else {
        snek.get("http://media.oboobs.ru/boobs_preview/" + MathLoL + ".jpg").then(r => {
            fs.writeFile(`boobs.jpg`, r.body)
            message.channel.sendFile(r.body)
            fs.unlink(`./boobs.jpg`)
        })
    }
}


  if(command === "anime") {
    if (!message.channel.nsfw) return message.channel.send(":underage: NSFW Command. Please switch to NSFW channel in order to use this command.")

    var subreddits = [
        'HENTAI_GIF',
        'hentai_irl'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
        .then(url => {
            snek.get(url).then(r => {
                fs.writeFile(`hentai.jpg`, r.body)
                message.channel.sendFile(r.body)
                fs.unlink(`./hentai.jpg`)
            })
        })
}

  if(command === "ping") {
    const newemb = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription(`Ping | ${Date.now() - message.createdTimestamp} ms`)
    message.channel.send({embed: newemb})
    message.react("✅")
}
 
  if(command === "setwatching") {
  if (message.author.id !== ('356510829920780289')) return message.channel.send("**You Can\'t Change Watching BOT | TaMoToJiᵛᵉʳᶦᶠᶦᵉᵈ#5881**");
  const status = args.join(' ');
  if (status.length === 0) {
    const embed = new Discord.RichEmbed()
      .setColor("#7289DA")
      .setDescription(`🚫 ${config.prefix}setwatching [status]!`);
    message.channel.send({ embed });
  }

  else if (status.length !== 0) {
  client.user.setActivity(`${status}`, {  type: "WATCHING"});
  const embed = new Discord.RichEmbed()
    .setColor("#7289DA")
    .setDescription(`✅ ${message.author.tag} You Sucessfully Changed Watching Status !`);
  message.channel.send({ embed });
  message.delete(5000);
  message.react('✅');
}};

  if(command === "search") {
    const time = Date.now();
    const term = args.join(' ');
    const searchurl = 'http://google.com/search?safe=active&gl=uk&hl=en&q=' + encodeURIComponent(term);
    const searchmessage = await message.channel.send('Searching For 🔍 ' + term);
    const body = await get(searchurl);
    const $ = new parse(body.text);
    let badwords = args.join('porn', 'pornhub', 'big tits', 'black dick', 'black cock', 'pussy', 'hentai', 'nsfw', 'ecchi', 'xnxx', 'fuck', 'penis', 'Porn', 'NSFW', 'dick', 'SHIT', 'shit', 'dick');
    if (!badwords) return message.author.send(":underage: This is Not an NSFW Channel :underage:");

    const result = (await Promise.all(
        $.querySelectorAll('.r')
        .filter(e => e.childNodes[0].tagName === 'a' && e.childNodes[0].attributes.href)
        .filter(e => e.childNodes[0].attributes.href.replace('/url?', '').indexOf('/search?') === -1)
        .slice(0, 5)
        .map(async (e) => {
            let url = e.childNodes[0].attributes.href.replace('/url?', '');
            if (url.startsWith('/')) url = 'http://google.com' + url;
            else url = qs(url).q || url;

            const body = await get(url);
            const details = uf(body.text);
            const obj = {
                url,
                snippet: () => {
                    const x = (details.description() || '').substring(0, 240);
                    const y = (details.text() || '').substring(0, 240) + '...';
                    return y.includes(x) ? y : x + '\n' + y;
                },
                image: () => details.image()
            };
            try {
                obj.title = new parse(body.text).querySelector('head').childNodes.find(e => e.tagName === 'title').childNodes[0].text;
            } catch (e) {
                obj.title = details.title() || 'No title found';
            }
            return obj;
        })
    ));
    if (!result.length) return searchmessage.edit(`${lang.noRslt}` + term);
    const first = result.shift();
    const vanityurl_1 = /^https?:\/\/[\w\.\-_]+(?::\d+|\.\w*)(?:\/|$)/g.exec(first.url);
    const vanityurl = vanityurl_1 && vanityurl_1[0] ? vanityurl_1[0] : first.url;
    const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(`Results for "${term}"`, 'https://lh4.googleusercontent.com/-v0soe-ievYE/AAAAAAAAAAI/AAAAAAADwkE/KyrKDjjeV1o/photo.jpg', searchurl)
        .setTitle(`${first.title.substring(0, 200)} - ${vanityurl.substring(0, 50) + (vanityurl.length > 50 ? '...' : '')}`)
        .setURL(first.url);
    try {
        embed.setThumbnail(first.image().replace(/^\.*\/(.*)/, `${first.url}$1`));
    } catch (e) {
        embed.thumbnail = undefined;
        void e;
    }
    embed.setDescription(first.snippet())
        .setTimestamp()
        .setFooter(Date.now() - time + ' ms');
    const embeds = result.reduce((acc, r) => {
        const vu_1 = /^https?:\/\/[\w\.\-_]+(?::\d+|\.\w*)(?:\/|$)/g.exec(r.url);
        const vu = vu_1 && vu_1[0] ? vu_1[0] : r.url;
        const u = r.url.substring(0, 200) + (r.url.length > 200 ? '...' : ''); //203
        const text = `${r.title.substring(0, 200) + (r.title.length > 200 ? '...' : '')}\n[${u}](${u.endsWith('...') ? vu.substring(0, 300) + (vu.length > 300 ? '...' : '') : u})`;
        if (acc[acc.length - 1].length + text.length < 1000) acc[acc.length - 1] += `${text}\n`;
        else acc[acc.length] = text;
        return acc;
    }, ['']);
    for (const [i, e] of embeds.entries()) {
        embed.addField(i === 0 ? 'Top Results' : '\u200b', e);
    }
    searchmessage.edit({
        embed
    });
}

  if(command === "ascii") {
  message.delete(5000);
  message.react("✅");
  if(args.join(' ').length > 14) return message.channel.send('Only 14 characters are admitted!') 
  if (!args.join(' ')) return message.channel.send('Please, provide text to format in ASCII! Usage: ascii <text>').then(msg => msg.delete({timeout: 10000})); 
    figlet(args.join(' '), (err, data) => {
      message.channel.send('```' + data + '```')
    })
};

 if(command === "cat") {
  let {body} = await superagent
  .get(`http://aws.random.cat/meow`);

  let catembed = new Discord.RichEmbed()
  .setColor("#7289DA")
  .setTitle("Cat 🐱")
  .setImage(body.file);

  message.channel.send(catembed);

}
 
 if(command === "botspec") {
  let cpuLol;
  cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
      return console.log(err);
    }
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const embedStats = new Discord.RichEmbed()
    .setTitle("*** Stats ***")
    .setColor("RANDOM")
    .addField("• Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("• Uptime ", `${duration}`, true)
    .addField("• Users", `${client.users.size.toLocaleString()}`, true)
    .addField("• Servers", `${client.guilds.size.toLocaleString()}`, true)
    .addField("• Channels ", `${client.channels.size.toLocaleString()}`, true)
    .addField("• Discord.js", `v${client}`, true)
    .addField("• Node", `${process.version}`, true)
    .addField("• CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
    .addField("• CPU usage", `\`${percent.toFixed(2)}%\``,true)
    .addField("• Arch", `\`${os.arch()}\``,true)
    .addField("• Platform", `\`\`${os.platform()}\`\``,true)
    .addFooter("• Bot Create By : TaMoToJiᵛᵉʳᶦᶠᶦᵉᵈ林坓龙#5881")
    message.channel.send(embedStats)
    message.delete(5000);
    message.react("🚀");
  });
};

 if(command === "yesorno") {
    let color = ''
      const { body } = await superagent
    .get('https://yesno.wtf/api/');
    if(body.answer === 'yes') color = '0x01DF01';
    if(body.answer === 'no') color = '0xFF0000';
    const embed = new Discord.RichEmbed()
    .setColor(color)
    .setImage(`${body.image}`)
    message.channel.send(`The magic API says: **${body.answer}**`, {embed});

}

  if(command === "userinfo") {
	let user;
	// If the user mentions someone, display their stats. If they just run userinfo without mentions, it will show their own stats.
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
	// Define the member of a guild.
    const member = message.guild.member(user);
	
	//Discord rich embed
    const embed = new Discord.RichEmbed()
		.setColor('RANDOM')
		.setThumbnail(user.avatarURL)
		.setTitle(`${user.username}#${user.discriminator}`)
		.addField("ID:", `${user.id}`, true)
		.addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
		.addField("Created At:", `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
		.addField("Joined Server:", `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
		.addField("Bot:", `${user.bot}`, true)
		.addField("Status:", `${user.presence.status}`, true)
		.addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
		.addField("Roles:", member.roles.map(roles => `${roles.name}`).join(', '), true)
		.setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
     message.channel.send({embed});
   }

  if(command === "weather") {
  weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
      if (err) message.channel.send(err);
      if (result === undefined || result.length === 0) {
          message.channel.send('**Please enter a location!**')
          return;
      }
      var current = result[0].current;
      var location = result[0].location;
      const embed = new Discord.RichEmbed()
          .setDescription(`**${current.skytext}**`)
          .setAuthor(`Weather for ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setColor(0x00AE86)
          .addField('Timezone',`UTC${location.timezone}`, true)
          .addField('Degree Type',location.degreetype, true)
          .addField('Temperature',`${current.temperature} Degrees`, true)
          .addField('Feels Like', `${current.feelslike} Degrees`, true)
          .addField('Winds',current.winddisplay, true)
          .addField('Humidity', `${current.humidity}%`, true)
          message.channel.send({embed});
  })
}  


  if(command === "dog") {
    const { body } = await superagent
    .get('https://dog.ceo/api/breeds/image/random');
    const embed = new Discord.RichEmbed()
    .setColor(0x954D23)
    .setTitle("Woof :dog2:")
    .setImage(body.message)
    message.channel.send({embed})
    message.react("📖");
    
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
     message.delete()
     await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
   }catch(e){
     console.log(e.stack);
     message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)

  }
}

 if(command === "randomdefine") {
  urban.random().first(json => {
    let uEmbed = new Discord.RichEmbed()
    .setTitle(json.word)
    .setDescription(json.definition || "None")
    .addField("Upvotes :arrow_up_small: ", json.thumbs_up, true)
    .addField("Downvotes :arrow_down_small: ", json.thumbs_down, true)
    .setAuthor(`Author: ${json.author}`);
    message.channel.send(uEmbed);
  });
}

  if(command === "lmgtfy") {
  let question = encode(args.join(' '));
  let link = `https://www.lmgtfy.com/?q=${question}`; 
  message.channel.send(`**<${link}>**`); 
 
}  

  if(command === "removerole") {
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
     message.delete()
     await rMember.send(`RIP, you lost the ${gRole.name} role.`)
   }catch(e){
     message.channel.send(`RIP to <@${rMember.id}>, We removed ${gRole.name} from them. We tried to DM them, but their DMs are locked.`)
   }
 }
 
 if(command === "read") {
    snek.get(api).then(r => {
        let embed = new Discord.RichEmbed()
        .setTitle('» Trump Quotes Generator')
        .setDescription(r.body.message)
        .setColor('RANDOM')
        message.channel.send(embed)
        message.react("📖")
    })
}


  if(command === "clear") {
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
     if(!args[0]) return message.channel.send("NOPE");
     message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`» Message Has Been Clear ${args[0]} .`).then(msg => msg.delete(2000));
 });

}
 
 if(command === "poll") {
  if (!message.member.hasPermission('MANAGE_MESSAGE')) return message.reply('Sorry, you don\'t have permission to create poll!').then(msg => msg.delete({timeout: 10000}));
  if (!args.join(' ')) return message.channel.send('Usage: poll <title>').then(msg => msg.delete({timeout: 10000}));
  
  const embed = new Discord.RichEmbed()
    .setTitle(args.join(' '))
    .setFooter('React To Vote On Emoji!')
    .setColor('RANDOM')
    const pollTitle = await message.channel.send({ embed });
      message.delete(200);
      await pollTitle.react(`👍`);
      await pollTitle.react(`👎`);
  
    const filter = (reaction) => reaction.emoji.name === '👍';
    const collector = pollTitle.createReactionCollector(filter, { time: 15000 });
      collector.on('thumbsup', r => console.log(`Collected ${r.emoji.name}`));
      collector.on('thumbsdown', collected => console.log(`Collected ${collected.size} items`));
  
    const filter1 = (reaction) => reaction.emoji.name === '👎';
    const collector1 = pollTitle.createReactionCollector(filter1, { time: 15000 });
      collector1.on('thumbsup', r => console.log(`Collected ${r.emoji.name}`));
      collector1.on('thumbsdown', collected => console.log(`Collected ${collected.size} items`));
};

 if(command === "nick") {
  if(message.author.id !== config.ownerID) return;
  let nickname = args.join(' ')
  message.guild.members.get('438304216893620240')
  	.setNickname(nickname);
  await message.channel.send({
  	embed: new Discord.RichEmbed()
  	.setTitle(`» Changed Bot Nickname To : ${nickname}`)
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

 if(command === "luckymunber") {
  var LuckNumber = Math.floor((Math.random() * 12000) + 0.120);
  const numEmb = new Discord.RichEmbed()
  .setColor(0xFFFF00)
  .setAuthor('LUCKY NUMBER', 'https://vignette.wikia.nocookie.net/nintendo/images/0/02/Question_Block_NSMB.png/revision/latest?cb=20151206055532&path-prefix=en')
  .addField('» Your LuckyMunber :', `${LuckNumber}!`);
  message.channel.send({embed: numEmb})
  message.react("✅")

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


if (command === "myinfo") {
    if(args[0] == "help"){
    message.reply("```kb!myinfo [NAME] [YearOld] [Gander] [Home,] [Like,Playgame,more] [Dislike]:```");
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
    .addField('» Pat ', "Pat a Play")
    .addField('» Fortnite', "Shows stats in Fortnite")
    .addField('» Search', "Google Search 🔎")
    .addField('» Dog', "Show Dog Image")
    .addField('» Poll', "Reaction With Emoji")
    .addField('» Cat', "Show Cat Image")
    .addField('» Read', "Read a Book")
    .addField('» Dadjokez', "Radom About Dad")
    .addField('» Weather', "Check Location Weather")
    .addField('» Luckymunber', "Show Your LuckyMunber")
    .addField('» Serverinfo', "Show Info About in Server")
    .addField('» Botinfo', "Show Into About on BOT")
    .addField('» Avatar', "Check User Avatar | k!avatar @user")
    .addField('» Myinfo ', "Show info About Yourself to #userinfo")
    .addField('» Userinfo', "Show Your Info About On Server")
    .addField('» Adminhelp', "Show AdminCommands")
    .addField('» NSFW', "NSFW")
    .setThumbnail(useravatar)

     message.author.send(helpembed);
     message.reply(":calling: This Command Sand To DMs . Please Check your DMs.")
     message.delete(1000);
     message.react("✅");
  }

   if(command === "adminhelp") {
   if(!message.member.permissions.has('ADMINISTRATOR')) return message.reply("Sorry » You Don't Have ADMINISTRATOR Permission To View AdminCommands ");

     let useravatar = message.author.avatarURL;
     let adminhelpembed = new Discord.RichEmbed()
    .setAuthor("KhmerEmpire' !", "https://cdn.discordapp.com/avatars/438304216893620240/56e6af0be67496ad591a1eba34075fc5.png?size=1024")
    .setColor('RANDOM')
    .setTitle("Admin-Commands :")
    .addField('» Say', "Bot is say")
    .addField('» Embed', "Bot is say Embed TEXT")
    .addField('» ChatEmbed', "Chat To #chat | k!chatembed help")
    .addField('» AnnEmbed', "Chat To #announcements | k!annembed help")
    .addField('» BotSpec', "Check Bot Spec")
    .addField('» Tempmute', "Mute Plyaer With Second")
    .addField('» Addrole', "Addrole For Player ")
    .addField('» Removerole', "Remove Role From Player")
    .addField('» Mute', "Mute Player | k!mute help")
    .addField('» Unmute', "Unmute For Player | k!unmute help")
    .addField('» Kick', "Kick Player From a Server")
    .addField('» Ban', "Ban Player From a Server")
    .addField('» AutoRoleJoin » NewUpdate', "Create Roles » MEMBER » Bot is AutoRole For New Member")
    .addField('» Welcome-leave » NewUpdate', "New Member Message » Create Channel » SetName: #welcome-leave » DONE")

     message.author.send(adminhelpembed);
     message.reply(":calling: This Command Sand To DMs . Please Check your DMs.")
     message.delete(1000);
     message.react("✅"); 
  }

   if(command === "nsfw") {
     let useravatar = message.author.avatarURL;
     let nsfwembed = new Discord.RichEmbed()
    .setAuthor("KhmerEmpire' !", "https://cdn.discordapp.com/avatars/438304216893620240/56e6af0be67496ad591a1eba34075fc5.png?size=1024")
    .setColor('#FF0000')
    .setTitle("Random NSFW Image :")
    .addField("» Boobs", "Random Boobs Image")
    .addField("» Pussy", "Random Pussy Image")
    .addField("» Anime", "Random Anime Image")
    .addField("» Hentai", "Random Hentai Image")

     message.author.send(nsfwembed);
     message.reply(":calling: This Command Sand To DMs . Please Check your DMs.")
     message.delete(1000);
     message.react("🔞"); 
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
  
  if(command === "ps") {
       if(args[0] == "help"){
      message.reply("PostStatus is Commands For » Player PostStatus » And Use Emoji Reaction !");
      return;
    }
   message.react('👍');
}

  if(command === "username") {
    if(message.mentions.users.first()) {
    let user = message.mentions.users.first();
    let output = user.username + user.discriminator
    "\nAvatar URL: " + user.avatarURL;
    message.channel.sendMessage(output);
  } else {
          message.reply("Invalid user."); 
          message.react('🚫');
    }
}

  if(command === "kick") {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("you not have permission to use this !");
    if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("That person can't be kicked!");
	  
	  let kickEmbed = new Discord.RichEmbed()
	  .setColor("#e56b00")
	  .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
	  .addField("Kicked By", `<@${message.author.id}>`)
	  .addField("Time", message.createdAt)
	  .addField("Reason", kReason);
	 
	   let kickChannel = message.guild.channels.find(`name`, "ke-logs");
	   if(!kickChannel) return message.channel.send("Can't find #ke-logs channel.");
	
	  message.guild.member(kUser).kick(kReason);
	  kickChannel.send(kickEmbed);
	  
	  return;
  }

       if(command === "ban") {
	  
	 let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	 if(!bUser) return message.channel.send("Can't find user!");
	 let bReason = args.join(" ").slice(22);
	 if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("No can do pal!");
	 if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("That person can't be kicked!");
	  
	 let banEmbed = new Discord.RichEmbed()
         .setColor('#FF0000')
	 .addField("Banned User", `${bUser} with ID ${bUser.id}`)
	 .addField("Banned By", `<@${message.author.id}>`)
	 .addField("Time", message.createdAt)
	 .addField("Reason", bReason);
	     
	 let incidentchannel = message.guild.channels.find(`name`, "ke-logs");
	 if(!incidentchannel) return message.channel.send("Can't find #ke-logs channel.");	      
	 message.guild.member(bUser).ban(bReason);
	 incidentchannel.send(banEmbed);
	     	      
	  return;
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
     
  if(command === "link") {

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

  if(command === "tempmute") {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(" you don\'t have permission to use this");
  if(args[0] == "help"){
    message.reply("Usage: !tempmute <user> <1s/m/h/d>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("Please supply a reason.");

  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "TempMute",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`Hi! You've been muted for ${mutetime}. Sorry!`)
  }catch(e){
    message.channel.send(`A user has been muted... but their DMs are locked. They will be muted for ${mutetime}`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`Mute executed by ${message.author}`)
  .setColor('#FF0000')
  .addField("Muted User", tomute)
  .addField("Muted in", message.channel)
  .addField("Time", message.createdAt)
  .addField("Length", mutetime)
  .addField("Reason", reason);

  let incidentschannel = message.guild.channels.find(`name`, "muted");
  if(!incidentschannel) return message.reply("Please Create a #muted Channel first!");
  incidentschannel.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));

  }

       talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 8000);
    }

});

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.login(config.token);
           

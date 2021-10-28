//Importing all needed Commands
const Discord = require("discord.js"); 
const colors = require("colors"); 
const fs = require("fs");

const client = new Discord.Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

//Client variables to use everywhere
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user

//Loading files, with the client variable like Command Handler, Event Handler, ...
["command", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const sendchannel = require("./botconfig/config.json")
const embedinfo = require("./botconfig/embed.json");

client.on("ready", () => {
	console.log("vibe mode on!");
});

client.on('guildMemberAdd', async member => {
  console.log(member);
const embed1 = new Discord.MessageEmbed()
  .setColor(embedinfo.color)
  .setTitle('Yes! :)')
  .setDescription(`<@${member.id}> has joined the server!`)
  .setTimestamp()
  .setFooter(embedinfo.footertext, embedinfo.footericon)
  const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'general')
  welcomeChannel.send(embed1)
});

client.on('guildMemberRemove', async member => {
    console.log(member);
const embed2 = new Discord.MessageEmbed()
    .setColor(embedinfo.color)
    .setTitle('Uh oh! :(')
    .setDescription(`<@${member.id}> has left the server!`)
    .setTimestamp()
    .setFooter(embedinfo.footertext, embedinfo.footericon)
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'general')
    welcomeChannel.send(embed2)
  });






//login into the bot
client.login(require("./botconfig/config.json").token);


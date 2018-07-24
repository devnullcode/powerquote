// Load up the discord.js library
const Discord = require("discord.js");

var fs = require('fs');

const client = new Discord.Client();

const config = require("./config.json");


client.on("ready", () => {

  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {



  if(message.author.bot) return;


  if(message.content.indexOf(config.prefix) !== 0) return;


  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();



  if(command === "quotetts") {
        fs.readFile('quote.txt', function(err, data) {
        if(err) throw err;
        var array = data.toString().split("\n");
        var item = array[Math.floor(Math.random()*array.length)];
        /*
        for(i in array) {
            message.channel.send(array[i], { tts: true });
        }
        */
        message.channel.send(item, { tts: true });
    });
  }

  if(command === "quote") {
        fs.readFile('quote.txt', function(err, data) {
        if(err) throw err;
        var array = data.toString().split("\n");
        var item = array[Math.floor(Math.random()*array.length)];
        /*
        for(i in array) {
            message.channel.send(array[i], { tts: true });
        }
        */
        message.channel.send(item);
    });
  }

});

client.login(config.token);

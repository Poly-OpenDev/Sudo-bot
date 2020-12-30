const Discord = require('discord.js');
const client = new Discord.Client();


var normalizedPath = require("path").join(__dirname, "commands");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
	console.log(`Loading ${file}...`)
	eval(`${file.replace('.js', '')} = require('./commands/${file}');`);
});


prefix="="

// set status
client.on("ready", () =>{
	// set activity
	// ${client.guilds.cache.size}
	function status(){
		setTimeout(function() {
			client.user.setActivity(` ${client.guilds.cache.size} Servers | use =help for list of commands`, {
				type: "LISTENING",
			});
			status()
		}, 2000);
	}
	status()
});

function err(e){
	toSend = new Discord.MessageEmbed()
		.setColor("#ff2222")
		.setDescription(`Mwhahaha, a bug has finished it's evil plan. Please contact the developer with the following issue:\n\`\`\`${e}\`\`\``)
		message.channel.send({
			embed: toSend,
		})
}

async function login(){
	await client.login(process.env.TOKEN)
}

async function run(message){
	if (!message.guild){

	};
	
	if(exists.exists(message, prefix)){
		toSend = new Discord.MessageEmbed()
		.setColor("#ff2222")
		.setDescription(`You must be in a server to use a command.`)
		.setFooter(`Requested by ${message.author}`)
		message.author.send({
			embed: toSend,
		})
		return false
	}
	ban.ban(message, prefix)
	clear.clear(message, prefix)
	help.help(message, prefix)
	kick.kick(message, prefix)
	meme.meme(message, prefix)
	ping.ping(message, prefix)
	fact.fact(message, prefix)
	invite.invite(message, prefix)
	warn.warn(message, prefix)
	softban.softban(message, prefix)
	sudo.sudo(message, prefix)
	create.create(message, prefix)
	stats.stats(message, prefix)
	// if (message.content.startsWith(prefix)){
	// 	toSend = new Discord.MessageEmbed()
	// 		.setColor("#ff2222")
	// 		.setDescription(`Sorry, no command exists with \`${message.content}\`.`)
	// 		message.channel.send({
	// 			embed: toSend,
	// 		})
	// 	return false
	// }
	// message.channel.overwritePermissions(role,{ 'SEND_MESSAGES': false })
}

client.on('message', message => {
  	run(message)
});

login()
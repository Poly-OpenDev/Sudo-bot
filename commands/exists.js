const Discord = require('discord.js');

function exists(message, prefix){
	commands = [
		(prefix+"ban"), 
		(prefix+"clear"), 
		(prefix+"help"), 
		(prefix+"kick"), 
		(prefix+"meme"), 
		(prefix+"ping"), 
		(prefix+"softban"), 
		(prefix+"sudo"),
		(prefix+"fact"),
		(prefix+"invite"),
		(prefix+"warn"),
		(prefix+"create"),
		(prefix+"stats")
	]
	const args = message.content.split(' ').slice(0);
	if(!commands.includes(args[0])){
		if(message.content.startsWith(prefix)){
			toSend = new Discord.MessageEmbed()
			.setColor("#ff2222")
			.setDescription(`No command exists called \`${args[0]}\``)
			.setFooter(`Requested by ${message.author}`)
			message.channel.send({
				embed: toSend,
			})
			return true
		}
	}

}

module.exports = { exists };
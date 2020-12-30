const Discord = require('discord.js');

async function ping(message, prefix){
	if (message.content.startsWith(prefix+"ping")){
		toSend = new Discord.MessageEmbed()
		.setColor("#6121ff")
		.setDescription(`Latency: ${Date.now() - message.createdTimestamp}ms\nContent: Ping!\n\nNow please stop poking me.`)
		.setFooter(`Requested by ${message.author.tag}`)
		message.channel.send({
			embed: toSend,
		})
		return false
	}
}

module.exports = { ping };
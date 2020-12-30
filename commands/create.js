const Discord = require('discord.js');

async function create(message, prefix){
	if (message.content.startsWith(prefix+"create")){
		if (!message.member.hasPermission('MANAGE_CHANNELS')) {
			toSend = new Discord.MessageEmbed()
			.setColor("#ff2222")
			.setDescription(`${message.author}, you need the \`MANAGE_CHANNELS\` permission.`)
			.setFooter(`Requested by ${message.author.tag}`)
			message.channel.send({
				embed: toSend,
			})
			return false
		}

		const args = message.content.split(' ').slice(1); // All arguments behind the command name with the prefix
		amount = args.join('-'); // Amount of messages which should be deleted

		if (!amount){
			toSend = new Discord.MessageEmbed()
			.setColor("#ff2222")
			.setDescription(`A channel name was not specified.`)
			.setFooter(`Requested by ${message.author.tag}`)
			message.channel.send({
				embed: toSend,
			})
			return false
		}
		message.guild.channels.create(amount, {
			type: 'text', 
			permissionOverwrites: [{
				id: message.guild.id
			}]
			
		});
		
		toSend = new Discord.MessageEmbed()
		.setColor(`#6121ff`)
		.setDescription(`channel "${amount}" created.`)
		.setFooter(`Requested by ${message.author.tag}`)
		await message.channel.send({
			embed: toSend,
		})

		return false
	}
}
module.exports = { create };
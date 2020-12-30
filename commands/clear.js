const Discord = require('discord.js');

async function clear(message, prefix){
	if (message.content.startsWith(prefix+"clear")){
		if (!message.member.hasPermission('MANAGE_MESSAGES')) {
			toSend = new Discord.MessageEmbed()
			.setColor("#ff2222")
			.setDescription(`${message.author}, you need the \`MANAGE_MESSAGES\` permission.`)
			.setFooter(`Requested by ${message.author.tag}`)
			message.channel.send({
				embed: toSend,
			})

		} else {

			const args = message.content.split(' ').slice(1); // All arguments behind the command name with the prefix
			amount = args.join(' '); // Amount of messages which should be deleted

			if (!amount || isNaN(amount)){
				toSend = new Discord.MessageEmbed()
				.setColor("#ff2222")
				.setDescription(`No amount of messages were specified to delete.`)
				.setFooter(`Requested by ${message.author.tag}`)
				message.channel.send({
					embed: toSend,
				})
				return false
			}
			if (amount < 1) {
				toSend = new Discord.MessageEmbed()
				.setColor("#ff2222")
				.setDescription(`Must delete at least 1 message.`)
				.setFooter(`Requested by ${message.author.tag}`)
				message.channel.send({
					embed: toSend,
				})
			}
			to_delete = amount + 1
				while (to_delete > 0) {
					if(to_delete > 99){
						await message.channel.bulkDelete(100)
						to_delete -= 99
					}else{
						await message.channel.bulkDelete(to_delete)
						to_delete -= to_delete
						toSend = new Discord.MessageEmbed()
					}
				}
			toSend = new Discord.MessageEmbed()
			.setColor("#ff2222")
			.setDescription(`\`${amount}\` messages deleted.`)
			.setFooter(`Requested by ${message.author.tag}`)
			await message.channel.send({
				embed: toSend,
			})
		}


		return false
	}
}
module.exports = { clear };
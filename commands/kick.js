const Discord = require('discord.js');
const client = new Discord.Client();

async function kick(message, prefix){
	if (message.content.startsWith(prefix+"kick")){
		if (!message.member.hasPermission('KICK_MEMBERS')) {
			toSend = new Discord.MessageEmbed()
			.setColor("#ff2222")
			.setDescription(`${message.author}, you need the \`KICK_MEMBERS\` permission.`)
			.setFooter(`Requested by ${message.author.tag}`)
			message.channel.send({
				embed: toSend,
			})
		}else{
			const args = message.content.split(' ').slice(1);
			const user = message.mentions.users.first();
			var banReason = args.slice(1).join(' ');
			if (!user) {
				try {
					if (!message.guild.members.get(args.slice(0, 1).join(' '))) {
						toSend = new Discord.MessageEmbed()
						.setColor("#ff2222")
						.setDescription(`No user with that user id.`)
						.setFooter(`Requested by ${message.author.tag}`)
						message.channel.send({
							embed: toSend,
						})
					}
					user = message.guild.members.get(args.slice(0, 1).join(' '));
					user = user.user;
				} catch (error) {
					toSend = new Discord.MessageEmbed()
					.setColor("#ff2222")
					.setDescription(`Sorry, that user does not exist in this server.`)
					.setFooter(`Requested by ${message.author.tag}`)
					message.channel.send({
						embed: toSend,
					})
				}
				return false
			}
			if (user === message.author){
				toSend = new Discord.MessageEmbed()
				.setColor("#ff2222")
				.setDescription(`You can just leave the server - you know that right?`)
				.setFooter(`Requested by ${message.author.tag}`)
				message.channel.send({
					embed: toSend,
				})
				return false
			}
			if (!banReason) {
				banReason = "no reason"
			}
			if (!message.guild.member(user).bannable){ 
				toSend = new Discord.MessageEmbed()
				.setColor("#ff2222")
				.setDescription(`Sorry, the user that you specified cannot be kicked.`)
				.setFooter(`Requested by ${message.author.tag}`)
				message.channel.send({
					embed: toSend,
				})
				return false
			}
			membertokick = message.guild.member(user)
			
			toSend = new Discord.MessageEmbed()
			.setTitle(`Softbanned from ${message.guild.name}`)
			.setColor("#6121ff")
			.setDescription(`**Reason**: ${banReason}`)
			.setFooter(`Requested by ${message.author.tag}`)
			await membertokick.send({
				embed: toSend,
			})
			await membertokick.kick()
			
			await message.guild.members.unban(user.id)
			toSend = new Discord.MessageEmbed()
			.setTitle(`Softbanned ${user.tag}`)
			.setColor("#6121ff")
			.setDescription(`**Reason**: ${banReason}`)
			.setFooter(`Requested by ${message.author.tag}`)
			message.channel.send({
				embed: toSend,
			})
		}
	}
}
module.exports = { kick };
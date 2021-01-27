const backup = require("discord-backup");
const Discord = require('discord.js');

async function execute(message, data, client) {
	if(!message.member.hasPermission("ADMINISTRATOR")){
		toSend = new Discord.MessageEmbed()
				.setTitle(`Missing Perms...`)
				.setColor("#F84545")
				.setDescription(`<:crossflat:803672140704120852> You need Admin permission to use any backup command.`)
				.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
			
		return message.channel.send(toSend);
	}
	const args = data.split(' ').slice(1);
	if(args[0] == "create"){
		toSend = new Discord.MessageEmbed()
			.setTitle(`Creating backup...`)
			.setColor("#2DCB70")
			.setDescription(`<a:loader:803692329303146506> Your server backup is being created...`)
			.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
		sent = await message.channel.send({
			embed: toSend,
		})
		backup.create(message.guild, {
			jsonBeautify: true
		}).then((backupData) => {
			toSend = new Discord.MessageEmbed()
				.setTitle(`Backed up...`)
				.setColor("#2DCB70")
				.setDescription(`<:checkmarkflat:803664970536452116> The server has been backed up with the id \`${backupData.id}\`.`)
				.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
			sent.edit(toSend)
		});
	}

	if(args[0] == "load"){
		toSend = new Discord.MessageEmbed()
			.setTitle(`Loading backup...`)
			.setColor("#2DCB70")
			.setDescription(`<a:loader:803692329303146506> Your server backup is being loaded...`)
			.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
		sent = await message.channel.send({
			embed: toSend,
		})
		try{
			backup.load(args[1], message.guild)
		} catch (e){
			console.log(e.stack)
		}
	}

	if(args[0] == "remove"){
		toSend = new Discord.MessageEmbed()
			.setTitle(`Removing backup...`)
			.setColor("#2DCB70")
			.setDescription(`<a:loader:803692329303146506> Your server backup is being removed...`)
			.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
		sent = await message.channel.send({
			embed: toSend,
		})
		backup.remove(args[1]).then(() => {
			toSend = new Discord.MessageEmbed()
				.setTitle(`Removed...`)
				.setColor("#2DCB70")
				.setDescription(`<:checkmarkflat:803664970536452116> \`${args[1]}\` was removed.`)
				.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
			sent.edit(toSend)
		})
	}

	if(args[0] == "list"){
		toSend = new Discord.MessageEmbed()
			.setTitle(`Checking your backups...`)
			.setColor("#2DCB70")
			.setDescription(`<a:loader:803692329303146506> Your server backups are being read...`)
			.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
		sent = await message.channel.send({
			embed: toSend,
		})
		
		res = ""
		backupListing = await backup.list()
		for(i=0; i< backupListing.length; i++){
			await backup.fetch(backupListing[i]).then((backupInfos) => {
				if(backupInfos.data.guildID == message.guild.id){
					res = res + `${backupInfos.id} **${backupInfos.size}kb**\n`
				}
			})
		}
		if(res == ""){
			toSend = new Discord.MessageEmbed()
				.setTitle(`Why did you even try...`)
				.setColor("#F84545")
				.setDescription(`<:crossflat:803672140704120852> You have not created any backups...`)
				.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
			sent.edit(toSend)
			return
		}

		toSend = new Discord.MessageEmbed()
			.setTitle(`Your Backups...`)
			.setColor("#2DCB70")
			.setDescription(`<:checkmarkflat:803664970536452116> We have found the following backups.\n\n${res}`)
			.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
		sent.edit(toSend)

	}
}

module.exports = {
  name: 'backup',
  description: "Backup your server (`sudo backup <create/remove/load/list> [id needed for remove/load]`)",

  execute
};
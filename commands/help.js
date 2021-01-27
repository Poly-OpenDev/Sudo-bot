const Discord = require('discord.js');
const fs = require('fs')
var path = require('path');


walkDir("commands/", 0);

console.log(`${index}\n\n${commands}\n\n${description}`)

async function execute(message, data, client) {
	const args = data.split(' ').slice(1);
	if(args){
		toSend = new Discord.MessageEmbed()
    .setColor("#2DCB70")
    .setTitle(args[0])
    .setDescription(`We have the following commands in this catagory\n${commandslister(index, commands, description, args[0])}`) //${commandslist.replace('commands/', "")}
    .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
		message.channel.send({
			embed: toSend,
		})
	} else {
		toSend = new Discord.MessageEmbed()
			.setColor("#2DCB70")
			.setTitle("Help")
			.setDescription(`Please use the following commands to browse commands:\n${getitems(index)}`) //${commandslist.replace('commands/', "")}
			.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
		message.channel.send({
			embed: toSend,
		})
	}
  return false
}

module.exports = {
  name: 'ping',
  description: "Poke me... I poke you back",

  execute
};
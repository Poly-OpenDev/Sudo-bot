const Discord = require('discord.js');

async function invite(message, prefix){
	if (message.content.startsWith(prefix+"invite")){
			toSend = new Discord.MessageEmbed()
			.setColor("#6121ff")
			.setTitle("Invite sudo here")
			.setDescription("Hello there im **Sudo**, The bot made by **lethdev2019** and **lime**! I really appreciate you for adding me to your Awesome Guild! \n\n **Tip**: You can also donate here [https://www.buymeacoffee.com/Oxygen2Team] to get some sweet roles in our server\n\nThanks for showing interest")
			.setURL("https://dsc.gg/sudo")
						
			.setFooter(`Requested by ${message.author.tag}`)

			
			await message.channel.send({
				embed: toSend,
			})


		return false
	}
}
module.exports = { invite };
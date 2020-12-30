const Discord = require('discord.js');

async function help(message, prefix){
	if (message.content.startsWith(prefix+"help")){
		toSend = new Discord.MessageEmbed()
		.setColor("#6121ff")
		.setDescription(`\`=help\` - Summons the guide from his slumber.

**Utilities**
\`=ping\` - Check the bot is responding and get the latency.
\`=stats\` - Get memory usage and uptime.
\`=invite\` - Add the bot to your discord server.
\`=create <channel name>\` - Create channel in your server

**Moderation**
\`=ban <username> [reason]\` - ban a user from your server
\`=softban <username> [reason]\` - ban and unban (deletes all messages) a user from your server
\`=kick <username> [reason]\` - remove a user from your server
\`=clear <amount>\` - Clear a certain amount of messages.

**Fun**
\`=meme\` - Get a random meme.
\`=fact\` - Get a random fact.`)
		.setFooter(`Requested by ${message.author.tag}`)
		message.channel.send({
			embed: toSend,
		})
		return false
	}
}
module.exports = { help };
const Discord = require('discord.js');
const mongoose = require('mongoose');
const Warning = require('./warnsch');

mongoose.connect(`${process.env.DB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

let connection = mongoose.connection;

connection.on("error", () => {
  console.log("DATABASE ERROR");
});

connection.on("open", () => {
  console.log("DATABASE CONNECTED");
});

async function warn(message, prefix){
	
	if (message.content.startsWith(prefix+"warn")){
		const args = message.content.split(' ').slice();
		const user = message.mentions.users.first();
		const banReason = args.slice(2).join(' ');
    if (!message.member.hasPermission("BAN_MEMBERS")) { //if one of the roles they have has the administrator toggled on.
			toSend = new Discord.MessageEmbed()
			.setColor("#ff2222")
			.setDescription(`${message.author}, you need the \`BAN_MEMBERS\` permission.`)
			.setFooter(`Requested by ${message.author}`)
			message.channel.send({
				embed: toSend,
			})
    }
		if (args[1] == "add"){
			// add a warning
			// userid | reason | id
		}
		if (args[1] == "remove"){
			// remove a warning
			// userid | reason | id (important)
		}
		if (args[1] == "view"){
			// view all warnings
			// userid (important) | reason (important) (to display) | id (to display)
		}

		return false
  }
}

module.exports = { warn };
const Discord = require('discord.js');

async function sudo(message, prefix){
	if (message.content.startsWith(prefix+"sudo")){
    if (!message.member.hasPermission("ADMINISTRATOR")) { //if one of the roles they have has the administrator toggled on.

    }
		return false
  }
}

module.exports = { sudo };
const Discord = require('discord.js');
const fs = require('fs')
var path = require('path');
index = []
function walkDir(currentPath) {
	var files = fs.readdirSync(currentPath);
	for (var i in files) {
		var curFile = path.join(currentPath, files[i]);
		if (fs.statSync(curFile).isFile()) {
			varname = files[i].replace('.js', "")
			if (varname != "help") {
				toreq = curFile.replace("commands/", '')
				eval(`${varname} = require('./${toreq.replace("commands/", '')}')`)
				eval(`${currentPath.replace("commands/", '')}_description.push(${varname}.description)`)
				eval(`${currentPath.replace("commands/", '')}_commands.push("${varname}")`)
			}
		} else if (fs.statSync(curFile).isDirectory()) {
			eval(`${curFile.replace("commands/", '')}_description = []`)
			eval(`${curFile.replace("commands/", '')}_commands = []`)
			index.push(`${curFile.replace("commands/", '')}`)
			walkDir(curFile);
		}
	}
};

function getitems(catagories){
	text = ""
	for (x in catagories) {
		text += "\`sudo help " + catagories[x] + "\`\n";
	}
	return text
}

function commandslister(commandslist, catagoryslect){
	text = ""
	try{
		list = eval(`${catagoryslect}_commands`)
		listd = eval(`${catagoryslect}_description`)
	} catch {
		throw Error("none existant")
	}
	for (x in list) {
		text += `\`sudo ${list[x]}\` - ${listd[x]}\n`
	}

	return text
}
walkDir("commands/", 0);


async function execute(message, data, client) {
	const args = data.split(' ').slice(1);
	if(args.length > 0){
		try{
			toSend = new Discord.MessageEmbed()
			.setColor("#2DCB70")
			.setTitle(args[0])
			.setDescription(`We have the following commands in this catagory\n${commandslister(commands, args[0])}`) //${commandslist.replace('commands/', "")}
			.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
			message.channel.send({
				embed: toSend,
			})
		} catch {
			toSend = new Discord.MessageEmbed()
				.setColor("#F84545")
				.setTitle("Help")
				.setDescription(`<:crossflat:803672140704120852> No catagory was found with the name of "${args[0]}"`)
				.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
			message.channel.send({
				embed: toSend,
			})
		}
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
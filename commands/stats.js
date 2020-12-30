const process = require('process');
var os = require('os'); 

const Discord = require('discord.js');

function format(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}


async function stats(message, prefix){
	if (message.content.startsWith(prefix+"stats")){
				
		memetots = os.totalmem(); 
		memfree = os.freemem()
		
		var uptime = process.uptime();
		// calc mem used
		
		memper = (memfree / memetots) * 100
		
		toSend = new Discord.MessageEmbed()
		.setColor("#6121ff")
		.setDescription(`RAM usage: ${Math.round(memper * 10) / 10}%\nUptime: ${format(uptime)}\n\nThese stats are for devs but ok.`)
		.setFooter(`Requested by ${message.author.tag}`)
		message.channel.send({
			embed: toSend,
		})
		return false
	}
}

module.exports = { stats };
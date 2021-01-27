const process = require('process');
var os = require('os');
var usage = require('usage');

var pid = process.pid // you can use any valid PID instead

const Discord = require('discord.js');

function format(seconds) {
  function pad(s) {
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60 * 60));
  var minutes = Math.floor(seconds % (60 * 60) / 60);
  var seconds = Math.floor(seconds % 60);

  return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}


async function execute(message, data, client) {
  memetots = os.totalmem();
  memfree = os.freemem()
  var uptime = process.uptime();
  // calc mem used
  memper = (memfree / memetots) * 100

  usage.lookup(pid, function(err, result) {
    cpuPercent = result.cpu

    toSend = new Discord.MessageEmbed()
      .setColor("#2DCB70")
      .setDescription(`CPU usage: ${Math.round(cpuPercent * 10) / 10}%\nRAM usage: ${Math.round(memper * 10) / 10}%\nUptime: ${format(uptime)}\n\nThese stats are for devs but ok.`)
      .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
    message.channel.send({
      embed: toSend,
    })
  });
  return false
}

module.exports = {
  name: 'stats',
  description: "Stare at the numbers of the bot",

  execute
};
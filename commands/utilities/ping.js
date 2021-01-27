const Discord = require('discord.js');

async function execute(message, data, client) {
  toSend = new Discord.MessageEmbed()
    .setColor("#2DCB70")
    .setDescription(`Bot Latency: ${Date.now() - message.createdTimestamp}ms\nAPI Latency: ${Math.round(client.ws.ping)}ms\nContent: Ping!\n\nNow please stop poking me.`)
    .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
  message.channel.send({
    embed: toSend,
  })
  return false
}

module.exports = {
  name: 'ping',
  description: "Poke me... I poke you back",

  execute
};
const Discord = require('discord.js');

async function execute(message, data, client) {
  if (!message.member.hasPermission('MANAGE_CHANNELS')) {
    toSend = new Discord.MessageEmbed()
      .setColor("#F84545")
      .setDescription(`<:crossflat:803672140704120852> ${message.author}, you need the \`MANAGE_CHANNELS\` permission.`)
      .setFooter(`Requested by ${message.author.tag}`)
    message.channel.send({
      embed: toSend,
    })
    return false
  }

  const args = data.split(' ').slice(1); // All arguments behind the command name with the prefix
  amount = args.join('-'); // Amount of messages which should be deleted

  if (!amount) {
    toSend = new Discord.MessageEmbed()
      .setColor("#F84545")
      .setDescription(`<:crossflat:803672140704120852> A channel name was not specified.`)
      .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
    message.channel.send({
      embed: toSend,
    })
    return false
  }
  message.guild.channels.create(amount, {
    type: 'text',
    permissionOverwrites: [{
      id: message.guild.id
    }]

  });

  toSend = new Discord.MessageEmbed()
    .setColor(`#2DCB70`)
    .setDescription(`<:checkmarkflat:803664970536452116> channel "${amount}" created.`)
    .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
  await message.channel.send({
    embed: toSend,
  })

  return false
}
module.exports = {
  name: 'create',
  description: "Create a text channel",

  execute
};
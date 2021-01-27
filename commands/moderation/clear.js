const Discord = require('discord.js');

async function execute(message, data, client) {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) {
    toSend = new Discord.MessageEmbed()
      .setColor("#F84545")
      .setDescription(`${message.author}, you need the \`MANAGE_MESSAGES\` permission.`)
      .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
    message.channel.send({
      embed: toSend,
    })

  } else {

    const args = data.split(' ').slice(1); // All arguments behind the command name with the prefix
    amount = args.join(' '); // Amount of messages which should be deleted

    if (!amount || isNaN(amount)) {
      toSend = new Discord.MessageEmbed()
        .setColor("#F84545")
        .setDescription(`<:crossflat:803672140704120852> No amount of messages were specified to delete.`)
        .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
      message.channel.send({
        embed: toSend,
      })
      return false
    }
    if (amount < 1) {
      toSend = new Discord.MessageEmbed()
        .setColor("#F84545")
        .setDescription(`<:crossflat:803672140704120852> Must delete at least 1 message.`)
        .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
      message.channel.send({
        embed: toSend,
      })
    }
    to_delete = amount
    while (to_delete > 0) {
      if (to_delete > 99) {
        await message.channel.bulkDelete(100)
        to_delete -= 100
      } else {
        await message.channel.bulkDelete(to_delete)
        to_delete -= to_delete
        toSend = new Discord.MessageEmbed()
      }
    }
    toSend = new Discord.MessageEmbed()
      .setColor("#2DCB70")
      .setDescription(`<:checkmarkflat:803664970536452116> **${amount}** messages deleted.`)
      .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
    await message.channel.send({
      embed: toSend,
    })
  }


  return false
}
module.exports = {
  name: 'clear',
  description: "Remove messages from your server",

  execute
};
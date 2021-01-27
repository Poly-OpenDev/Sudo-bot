const Discord = require('discord.js');
var safeEval = require('safe-eval')

async function execute(message, data, client) {
  args = data.split(' ').slice(1);
  args = args.join(" ")
  toSend = new Discord.MessageEmbed()
    .setTitle(`Running code...`)
    .setColor("#2DCB70")
    .setDescription(`<a:loader:803692329303146506> please wait...`)
    .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
  sent = await message.channel.send({
    embed: toSend,
  })
  try {
    toSend = new Discord.MessageEmbed()
      .setColor("#2DCB70")
      .setDescription(`<:checkmarkflat:803664970536452116> Program exited\n\`\`\`${safeEval(args)}\`\`\``)
      .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
    sent.edit(toSend)
  } catch (e) {
    toSend = new Discord.MessageEmbed()
      .setColor("#F84545")
      .setDescription(`<:crossflat:803672140704120852> Program exited\n\`\`\`${e}\`\`\``)
      .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
    sent.edit(toSend)
  }
}

module.exports = {
  name: 'run',
  description: "Remove a user, delete messages and they can still come back",

  execute
};
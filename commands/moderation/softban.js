const Discord = require('discord.js');

async function execute(message, data, client) {
  if (!message.member.hasPermission('BAN_MEMBERS')) {
    toSend = new Discord.MessageEmbed()
      .setColor("#F84545")
      .setDescription(`<:crossflat:803672140704120852> ${message.author}, you need the \`BAN_MEMBERS\` permission.`)
      .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
    message.channel.send({
      embed: toSend,
    })
  } else {
    const args = data.split(' ').slice(1);
    const user = message.mentions.users.first();
    var banReason = args.slice(1).join(' ');
    if (!user) {
      try {
        if (!message.guild.members.get(args.slice(0, 1).join(' '))) {
          toSend = new Discord.MessageEmbed()
            .setColor("#F84545")
            .setDescription(`<:crossflat:803672140704120852> No user with that user id.`)
            .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
          message.channel.send({
            embed: toSend,
          })
        }
        user = message.guild.members.get(args.slice(0, 1).join(' '));
        user = user.user;
      } catch (error) {
        toSend = new Discord.MessageEmbed()
          .setColor("#F84545")
          .setDescription(`<:crossflat:803672140704120852> Sorry, that user does not exist in this server.`)
          .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
        message.channel.send({
          embed: toSend,
        })
      }
      return false
    }
    if (user === message.author) {
      toSend = new Discord.MessageEmbed()
        .setColor("#F84545")
        .setDescription(`You can just leave the server - you know that right?`)
        .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
      message.channel.send({
        embed: toSend,
      })
      return false
    }
    if (!banReason) {
      banReason = "no reason"
    }
    if (!message.guild.member(user).bannable) {
      toSend = new Discord.MessageEmbed()
        .setColor("#F84545")
        .setDescription(`<:crossflat:803672140704120852> Sorry, the user that you specified cannot be softbanned.`)
        .setFooter(`Requested by ${message.author.tag}`)
      message.channel.send({
        embed: toSend,
      })
      return false
    }
    membertokick = message.guild.member(user)

    toSend = new Discord.MessageEmbed()
      .setTitle(`Softbanned from ${message.guild.name}`)
      .setColor("#2DCB70")
      .setDescription(`**Reason**: ${banReason}`)
      .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
    try {
      await membertokick.send({
        embed: toSend,
      })
    } catch {
      toSend = new Discord.MessageEmbed()
        .setTitle(`OOF`)
        .setColor("#F84545")
        .setDescription(`<:errorflat:803706164410843136> Could not send message to ${user.tag}`)
        .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
      message.channel.send({
        embed: toSend,
      })
    }
    await membertokick.ban({
      days: 7,
      reason: banReason,
    })
    await message.guild.members.unban(user.id)
     toSend = new Discord.MessageEmbed()
      .setTitle(`Softban successful`)
      .setColor("#2DCB70")
      .setDescription(`<:checkmarkflat:803664970536452116> Successfully softbanned ${user.tag}\n**Reason**: ${banReason}`)
      .setFooter(`Requested by ${message.author.tag}`)
    message.channel.send({
      embed: toSend,
    })
  }
  return false
}

module.exports = {
  name: 'softban',
  description: "Remove a user, delete messages and they can still come back",

  execute
};
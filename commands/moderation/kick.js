const Discord = require('discord.js');
const client = new Discord.Client();

async function execute(message, data, client) {
  if (!message.member.hasPermission('KICK_MEMBERS')) {
    toSend = new Discord.MessageEmbed()
      .setColor("#F84545")
      .setDescription(`<:crossflat:803672140704120852> ${message.author}, you need the \`KICK_MEMBERS\` permission.`)
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
        .setColor("#2DCB70")
        .setDescription(`<:crossflat:803672140704120852> Sorry, the user that you specified cannot be kicked.`)
        .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
      message.channel.send({
        embed: toSend,
      })
      return false
    }
    membertokick = message.guild.member(user)

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
    await membertokick.kick()

     toSend = new Discord.MessageEmbed()
      .setTitle(`Kick successful`)
      .setColor("#2DCB70")
      .setDescription(`<:checkmarkflat:803664970536452116> Successfully kicked ${user.tag}\n**Reason**: ${banReason}`)
      .setFooter(`Requested by ${message.author.tag}`)
	    message.channel.send({
      embed: toSend,
    })
  }
}

module.exports = {
  name: 'kick',
  description: "Remove a user from you server. No messages are removed and they can still get in.",

  execute
};
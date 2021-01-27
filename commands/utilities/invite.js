const Discord = require('discord.js');

async function execute(message, data, client) {
  toSend = new Discord.MessageEmbed()
    .setColor("#2DCB70")
    .setTitle("Click here to invite")
    .setDescription("Hey there!\n\nThis is Sudo, Just a clean bot on the internet with messages full of attitude. Generally taken with some salt, this bot contains the features that we, the devs, wanted as well as what our community wants.\n\n**Want special perks?** Join our [server](https://discord.gg/xxnGus7qWr) and then [donate](https://www.buymeacoffee.com/Oxygen2Team)")
    .setURL("https://discordapp.com/api/oauth2/authorize?client_id=793114634005381132&scope=bot&permissions=8")

    .setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)


  await message.channel.send({
    embed: toSend,
  })


  return false
}

module.exports = {
  name: 'invite',
  description: "Get the bot invite code",

  execute
};
const lookup = require('safe-browse-url-lookup')({ apiKey: 'AIzaSyBb7IKImk1jbKmIQUXzUxGi9ZDZHU9Pcgc' });

const { underline } = require('chalk');
const Discord = require('discord.js');

async function execute(message, data, client) {
  content = message.content
  if (content.includes('http://') || content.includes('https://')) {
    message_array = message.content.split(" ")
    toSend = new Discord.MessageEmbed()
      .setTitle(`Scanning URLs...`)
      .setColor("#2DCB70")
      .setDescription(`<a:loader:803692329303146506> please wait...`)
      .setFooter(`This is an automated response`)
    sent = await message.channel.send({
      embed: toSend,
    })
    var arrayLength = message_array.length;
    results_collection = ""
    for (var i = 0; i < arrayLength; i++) {
      if (message_array[i].includes('http://') || message_array[i].includes('https://')) {
        let url = message_array[i]
        await lookup.checkSingle(url)
          .then(isMalicious => {
            results_collection += (isMalicious ? `<:crossflat:803672140704120852> ${url}\n` : `<:checkmarkflat:803664970536452116> ${url}\n`)
          })
          .catch(err => {
            toSend = new Discord.MessageEmbed()
              .setTitle("Error...")
              .setColor("#F84545")
              .setDescription(`\`\`\`${err}\`\`\``)
              .setFooter(`This is an automated response`)
            sent.edit(toSend)
          });
      }
    }
    toSend = new Discord.MessageEmbed()
      .setTitle("Results...")
      .setColor("#2DCB70")
      .setDescription(results_collection)
      .setFooter(`This is an automated response`)
    sent.edit(toSend)
  }
}


module.exports = {
  name: 'scan',
  description: "Scan a URL",

  execute
};
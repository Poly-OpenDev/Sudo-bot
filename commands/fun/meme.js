const Discord = require('discord.js');
const got = require('got');

async function execute(message, data, client) {
  const embed = new Discord.MessageEmbed()
  got('https://www.reddit.com/r/memes/random/.json').then(response => {
    let content = JSON.parse(response.body);
    let permalink = content[0].data.children[0].data.permalink;
    let memeUrl = `https://reddit.com${permalink}`;
    let memeImage = content[0].data.children[0].data.url;
    let memeTitle = content[0].data.children[0].data.title;
    let desc = content[0].data.children[0].data.selftext
    let memeUpvotes = content[0].data.children[0].data.ups;
    let memeDownvotes = content[0].data.children[0].data.downs;
    let memeNumComments = content[0].data.children[0].data.num_comments;
    embed.setTitle(`${memeTitle}`)
    embed.setDescription(`${desc}`)
    embed.setURL(`${memeUrl}`)
    embed.setImage(memeImage)
    embed.setColor('#2DCB70')
    embed.setFooter(`Requested by ${message.author.tag} | 👍 ${memeUpvotes} | 👎 ${memeDownvotes}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
    message.channel.send(embed);
  })
}

module.exports = {
  name: 'meme',
  description: "Get a random meme",

  execute
};
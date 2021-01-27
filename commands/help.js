const Discord = require('discord.js');
const fs = require('fs')
var path = require('path');

function getFilesFromDir(dir, fileTypes) {
  var filesToReturn = "Here is a list of commands that have currently been added to the bot\n";
  function walkDir(currentPath) {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      var curFile = path.join(currentPath, files[i]);
      if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
        varname = files[i].replace('.js', "")
        if (varname != "help") {
          toreq = curFile.replace(dir, '')
          eval(`${varname} = require('./${toreq.replace("commands/", '')}')`)
          filesToReturn = `${filesToReturn}\`${varname}\` - ${eval(`${varname}.description`)}\n`
        }
      } else if (fs.statSync(curFile).isDirectory()) {
        filesToReturn = `${filesToReturn.replace('commands/', "")}\n**${curFile}**\n `
        walkDir(curFile);
      }
    }
  };
  walkDir(dir);
  return filesToReturn;
}

commandslist = getFilesFromDir("./commands/", [".js"]);

async function execute(message, data, client) {
  toSend = new Discord.MessageEmbed()
    .setColor("#2DCB70")
    .setTitle("Help")
    .setDescription(`${commandslist.replace('commands/', "")}`)
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
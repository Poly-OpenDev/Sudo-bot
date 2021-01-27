const Discord = require('discord.js');
const client = new Discord.Client();
const cliProgress = require('cli-progress')
const winston = require('winston');
var fs = require('fs');
var path = require('path');
var domain = require('domain');
var util = require('util');

async function write(file, data){
	const buffer = JSON.stringify(data, null, 4);
	await fs.writeFile(file, buffer, 'utf8', (err) => {

    if (err) {
        console.log(`Error writing file: ${err}`);
    } else {
        console.log(`File is written successfully!`);
    }

});
}
login()


const logger = winston.createLogger({
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: 'log' }),
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

client.on('ready', () => logger.log('info', 'The bot is online!'));
client.on('debug', m => logger.log('debug', m));
client.on('warn', m => logger.log('warn', m));
client.on('error', m => logger.log('error', m));

//var normalizedPath = require("path").join(__dirname, "commands");
commands = ['help'];

// require("fs").readdirSync(normalizedPath).forEach(function(file) {
// 	commands.push(`${file.replace('.js', '')}`)
// 	varname = file.replace('.js', "")
// 	eval(`${varname} = require("./commands/${file}")`)
// });

// function getFilesFromDir(dir, fileTypes) {
//   var filesToReturn = [];
//   function walkDir(currentPath) {
//     var files = fs.readdirSync(currentPath);
//     for (var i in files) {
//       var curFile = path.join(currentPath, files[i]);      
//       if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
//         filesToReturn.push(curFile.replace(dir, ''));
// 				varname = files[i].replace('.js', "")
// 				eval(`${varname} = require('./${curFile.replace(dir, '')}')`)
//       } else if (fs.statSync(curFile).isDirectory()) {
//        walkDir(curFile);
//       }
//     }
//   };
//   walkDir(dir);
//   return filesToReturn; 
// }

function getFilesFromDir(dir, fileTypes) {
	var filesToReturn = [];
	function walkDir(currentPath) {
		var files = fs.readdirSync(currentPath);
		for (var i in files) {
			var curFile = path.join(currentPath, files[i]);
			if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
				filesToReturn.push(files[i].replace('.js', ""));
				varname = files[i].replace('.js', "")
				eval(`${varname} = require('./${curFile.replace(dir, '')}')`)
			} else if (fs.statSync(curFile).isDirectory()) {
				walkDir(curFile);
			}
		}
	};
	walkDir(dir);
	return filesToReturn;
}

commands = getFilesFromDir("./commands/", [".js"]);

console.log(commands)

prefix = "sudo"

// set status
client.on("ready", async function() {

	console.log(client.shard.id)
	function status() {
		setTimeout(function() {
			client.user.setActivity(` ${client.guilds.cache.size} Servers | use "sudo help" for list of commands`, {
				type: "LISTENING",
			});
			status()
		}, 2000);
	}
	status()
});


async function login() {
	await client.login(process.env.TOKEN)
}

function dumpError(err) {
	if (typeof err === 'object') {
		if (err.message) {
			return err.message
		}
		if (err.stack) {
			return err.stack
		}
	} else {
		return 'dumpError :: argument is not an object'
	}
}

async function err(message, e) {
	client.user.setActivity(` Reporting bug...`, {
		type: "LISTENING",
	});
	errorc = dumpError(e)
	toSend = new Discord.MessageEmbed()
		.setTitle(`Reporting error...`)
		.setColor("#6121ff")
		.setDescription(`<a:loader:803692329303146506> Sending bug report...`)
		.setFooter(`This is an automated response`)
	sent = await message.channel.send({
		embed: toSend,
	})
	await message.channel.createInvite({ unique: false, temporary: true }).then(async (invite) => {
		errDump = new Discord.MessageEmbed()
			.setTitle(`Reporting error...`)
			.setColor("#6121ff")
			.setDescription(`An error has occurred in **${message.guild.name}** by ${message.author.id}, which you can [enter here](https://discord.gg/${invite.code})\n\`\`\`${e}\`\`\``)
			.setFooter(`This is an automated response`)

		await client.channels.cache.get('803666819561816074').send(errDump)
	})
	toSend = new Discord.MessageEmbed()
		.setTitle(`Reported error...`)
		.setColor("#6121ff")
		.setDescription(`<:checkmarkflat:803664970536452116> The bug was reported, [learn more](https://sites.google.com/view/oxygen-docs/Docs?authuser=0#h.i7up4qglyf64).`)
		.setFooter(`This is an automated response`)
	await sent.edit(toSend)
	process.exit(1)
}

async function help(message, err) {
	helpvar = ""
	var arrayLength = commands.length;
	results_collection = ""
	for (var i = 0; i < arrayLength; i++) {
		helpvar = helpvar + `\`${prefix} ${commands[i]}\` - ${eval(`${commands[i]}.description`)}\n`
	}
	toSend = new Discord.MessageEmbed()
		.setColor("#6121ff")
		.setDescription(`\`=help\` - Summons the guide from his slumber.\n\n${helpvar}`)
		.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
	message.channel.send({
		embed: toSend,
	})
	return false
}

async function command(message) {
	errorhandler = true
	if (message.bot) {
		return
	}
	if (!message.guild) {
		if (message.content.startsWith(`${prefix} `)) {
			toSend = new Discord.MessageEmbed()
				.setColor("#ff2222")
				.setDescription(`You must be in a server to use a command.`)
				.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
			message.author.send({
				embed: toSend,
			})
			return false
		}
		errorhandler = false
	};


	const args = message.content.split(' ').slice(1);
	const precheck = message.content.split(' ');
	data = args.join(' ');
	if (!commands.includes(args[0])) {
		if (precheck[0] == `${prefix}`) {
			// exception for guilds.
			if (message.guild.id != 721282458708082713) {
				toSend = new Discord.MessageEmbed()
					.setColor("#ff2222")
					.setDescription(`No command exists called \`${args[0]}\``)
					.setFooter(`Requested by ${message.author.tag}`, `${message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 })}`)
				message.channel.send({
					embed: toSend,
				})
				return true
			}
		}
	} else {
		if (precheck[0] == `${prefix}`) {
			var d = domain.create();
			process.on('unhandledRejection', (reason, p) => {
				errorcd = `Unhandled Rejection at: ${util.inspect(p)} reason: ${reason}`
				err(message, errorcd)
			});
			// Domain emits 'error' when it's given an unhandled error
			d.on('error', function(errorcd) {
				err(message, errorcd)
				// Our handler should deal with the error in an appropriate way
			});
			d.run(function() {
				eval(`${args[0]}.execute(message, data, client)`)
			})
		}
	}

}

client.on('message', message => {
	scan.execute(message)
	command(message)
});

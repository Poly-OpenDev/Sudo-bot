const express = require('express')
var WebSocket = require('ws');
var http = require('http');
var fs = require('fs');

var app = express(),
  server = http.createServer(app),
  wss = new WebSocket.Server({ server });
console.log(`PASS: ${process.env.WSPASSWORD}`)
let connections = []
wss.on('connection', function(socket) {
  auth = false
  connections.push(socket)
  socket.send("Successful connection")
  console.log(`New Connection | Connection via socket.io`)

  socket.on('message', async function(msg) {
    if (auth) {
      if (msg == "reset") {
        await socket.send('All shards are being reset')
        await manager.respawnAll()
        await socket.send('All shards have been reset')
      } else {
        await socket.send(`No command found for "${msg}"`)
      }
    } else {
      if (msg == `PASS: ${process.env.WSPASSWORD}`) {
        await socket.send(`VERIFIED`)
        auth = true
      } else {
        if (msg.startsWith(`PASS:`)) {
          await socket.send(`INCORRECT`)
        }
      }
    }
  })
})


const { ShardingManager } = require('discord.js');
const manager = new ShardingManager(__dirname + '/bot.js', {
  token: process.env.TOKEN,
  totalShards: 'auto'
});

console.log("\nlaunching cluster...\n")

manager.on('shardCreate', shard => function() {
});
manager.spawn();


function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
variable = 3000

const port = process.env.PORT || variable

server.listen(port);




const router = express.Router();
const path = require('path')//Include the Path module


router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});
app.use('/', router);
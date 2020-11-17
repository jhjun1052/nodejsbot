const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'Nzc3ODc2OTM3MjI0NzQ5MDg3.X7J0Wg.N120qpaH5hQQgMxITgYmH0iOuv8';

client.on('ready', () => {
  console.log('켰다.');
});

client.on('message', (message) => {
  if(message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(token);
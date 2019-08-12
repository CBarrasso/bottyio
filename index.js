const Discord = require('discord.js')
const client = new Discord.Client()
var settings = require('./auth.json')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
})



client.on('message', msg => {
  if (msg.content === `what is ${user} dkp`) {
    var text = fetch('https://www.mercenary-classic.com/dkp/api.php?function=points&filter=character&filterid='+user)
    msg.reply(text)
  }
})

client.login(settings.token)
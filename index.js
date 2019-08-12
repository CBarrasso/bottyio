const Discord = require('discord.js')
const client = new Discord.Client()
var settings = require('./auth.json')
var request = require("request");
var parseString = require('xml2js').parseString;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
})



client.on('message', msg => {
  if (msg.content.startsWith('dkp for')) {
    var user = msg.content.split(" ").slice(-1)[0]
    console.log(user)
    var options = {
      method: 'GET',
      url: 'https://www.mercenary-classic.com/dkp/api.php?function=points',
      headers:
      {
        Accept: '*/*'
      }
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      
      parseString(body, function (err, result) {

        
        
        var users = result['response']['players'][0]['player']
        found = false

        console.log('USERS: '+JSON.stringify(users));
        found = false
        users.forEach(function(value){
          // msg.reply(JSON.stringify(value));
          if(value['name'][0]===user){
            dkp = value['points'][0]['multidkp_points'][0]['points_current'][0]
            msg.reply(value['name'][0]+ ' has ' + dkp + ' dkp.')
            found = true
          }



        });
        if(!found){
          msg.reply(user + ' was not found.')
        }
      });

    });
  }
})

client.login(settings.token)
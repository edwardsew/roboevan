const fs = require('fs');

module.exports = {
    name: 'ping',
    description: 'ping pong',
    execute(message, args){
        return message.reply("Pong!");
    }
}
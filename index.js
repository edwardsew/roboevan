const fs = require('fs');
const Discord = require('discord.js');
const config = JSON.parse(fs.readFileSync('./config.json'));
const prefix = config.prefix;
const token = config.token;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready');
});

client.on('message', message => {
    if(message.content){

        const args = message.content.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();

        if (!message.content.startsWith(prefix)) return;
        if (message.author.bot) return;

        if(!client.commands.has(command)) return;

        try{
            client.commands.get(command).execute(message, args);
        }
        catch (error){
            console.error(error);
            message.reply("There was an error trying to execute the command " + command);
        }
    }

    
});

client.login(token);
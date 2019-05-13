module.exports = {
    name: 'roll',
    description: 'Rolls a dice of specified value',
    execute(message, args){
        if(!args.length){
            return message.channel.send('Please enter a valid integer # of dice to roll greater than one.');
        }
    }
};
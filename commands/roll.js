module.exports = {
    name: 'roll',
    description: 'Rolls a dice of specified value',
    execute(message, args){
        if(!args.length){
            return message.reply('Please enter a valid integer # of dice to roll greater than one.');
        }
        else{
            try{
                console.log(args[0]);
                dice = args[0].split("d");
            }
            catch(err){
                console.error(err);
                return message.reply("There was an issue getting the dice details.");
            }

            dice[0] = parseInt(dice[0]);
            dice[1] = parseInt(dice[1]);

            if(dice[0] && dice[1] && dice[0] > 0 && dice[1] > 0){
                var rolls = [];
                var total = 0;
                for(i = 0; i < dice[0]; i++){
                    var value = Math.floor(Math.random() * dice[1]) + 1;
                    rolls.push(value);
                    total += value;
                }
                
                if(args[1] && parseInt(args[1])){
                    total += parseInt(args[1]);
                    var rollsAsString = rolls.join(', ');
                    message.reply("You rolled " + rollsAsString + " Plus a modifier of " + args[1] + " for a total of " + total);
                    return;
                }
                else{
                    var rollsAsString = rolls.join(', ');
                    message.reply("You rolled " + rollsAsString + " for a total of " + total);
                    return;
                }

                
            }
            else{
                message.reply("Please enter a non zero integer for the dice amounts.");
                return;
            }
        }
    }
};
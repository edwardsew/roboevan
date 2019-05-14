const fs = require('fs');
var macros = fs.readFileSync("./macros.json");

module.exports = {
    name: 'macro',
    description: 'Executes a named macro',
    execute(message, args){
        if(!args.length){
            return message.reply('Please enter a valid macro');
        }
        else{
            var array = JSON.parse(macros);

            for(i = 0; i < array.length; i++){
                if(array[i].UID === message.author.id && array[i].macro_name === args[0]){
                    var rolls = [];
                    var total = 0;
                    
                    for(j = 0; j <= array[i].dice; j++){
                        var value = Math.floor(Math.random() * array[i].sides) + 1;

                        if(array[i].modifier_type === "individual"){
                            value += array[i].modifier;
                        }

                        rolls.push(value);
                        total += value;
                    }

                    if(array[i].modifier_type === "total"){
                        total += array[i].modifier;
                    }

                    var rollsAsString = rolls.join(', ');

                    if(array[i].modifier){
                        if(array[i].modifier_type === "individual"){
                            message.reply("You rolled " + rollsAsString + " with an individual modifier of " + array[i].modifier + " for a total of " + total);
                            return;
                        }
                        else{
                            message.reply("You rolled " + rollsAsString + " with a total modifier of " + array[i].modifier + " for a total of " + total);
                            return;
                        }
                    }
                    else{
                        message.reply("You rolled " + rollsAsString + " for a total of " + total);
                        return;
                    }
                }
            }

            message.reply("there is no macro with the name " + args[0]);
            return;
        }
    }
};
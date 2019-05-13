const fs = require('fs');
const macros = require('./macros.json');

module.exports = {
    name: 'addmacro',
    description: 'Adds a macro to roll multiple dice with ease.',
    execute(message, args){
        if(!args.length){
            return message.channel.send('No macro specified. Please specify a new macro.');
        }
        else{
            try{
                dice = args[2].split("d");
            }
            catch(err){
                console.log(err);
                message.channel.send("There was an issue getting the dice details.");
                return macros;
            }

            if(!Number.isInteger(dice[1]) && dice[1] > 0){
                message.channel.send('The amount of dice must be a non negative integer');
                return macros;
            }
            
            if(!Number.isInteger(dice[2]) && args[2] > 0){
                message.channel.send('The number of sides on the dice must be a non negative integer');
                return macros;
            }
            
            if(!Number.isInteger(args[3])){
                message.channel.send('The modifier must be an integer.');
                return macros;
            }
            
            if(args[4] !== "i" || args[4] !== "individual" || args[4] !== "t" || args[4] !== "total" || args[4] !== "n" || args[4] !== "none"){
                message.channel.send('Please specify if there is a modifier, and if it is for the total or individual rolls');
                return macros;
            }

            var array = JSON.parse(macros);
            array.push({"UID": message.client.id, "macro_name" : args[1], "dice" : dice[1], "sides" : dice[2], "modifier" : args[3], "modifier_type" : args[4]});
            message.channel.send("Macro " + args[1] + " Created!");
            macros = JSON.stringify(array);
            
            fs.writeFile("./macros.json", macros, function(err){
                if(err){
                    console.log(err);
                }
            });
            
            return;
        }
    }
};
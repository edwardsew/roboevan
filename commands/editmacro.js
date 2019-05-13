const fs = require('fs');
const macros = require('./macros.json');

module.exports = {
    name: 'editmacro',
    description: 'Edits a specified macro',
    execute(message, args){
        if(!args.length){
            return message.reply('No macro specified. Please specify an existing macro.');
        }

        var array = JSON.parse(macros);
        
        array.forEach(element => {
            if(element.macro_name === args[1] && element.UID === message.client.id){
                element.macro_name = args[2];

                try{
                    dice = args[3].split("d");
                }
                catch(err){
                    console.log(err);
                    message.reply("There was an issue getting the dice details.");
                    return macros;
                }
                
                if(!Number.isInteger(dice[1]) && args[1] > 0){
                    message.reply('The amount of dice must be a non negative integer');
                    return macros;
                }
                else{
                    element.dice = dice[1];
                }
                
                if(!Number.isInteger(dice[2]) && args[2] > 0){
                    message.reply('The number of sides on the dice must be a non negative integer');
                    return macros;
                }
                else{
                    element.sides = dice[2];
                }
                
                if(!Number.isInteger(args[4])){
                    message.reply('The modifier must be an integer.');
                    return macros;
                }
                else{
                    element.modifier = args[4];
                }
                
                if(args[5] !== "i" || args[5] !== "individual" || args[5] !== "t" || args[5] !== "total" || args[5] !== "n" || args[5] !== "none"){
                    message.reply('Please specify if there is a modifier, and if it is for the total or individual rolls');
                    return macros;
                }
                else{
                    element.modifier_type = args[5];
                }
            }
        });
        
        message.reply("Macro " + args[1] + " Edited! The new macro name is " + args[2]);
        macros = JSON.stringify(array);
            
        fs.writeFile("./macros.json", macros, function(err){
            if(err){
                console.log(err);
            }
        });
            
        return;
    }
};
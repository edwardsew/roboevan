const fs = require('fs');
var macros = fs.readFileSync("./macros.json");

module.exports = {
    name: 'listmacros',
    description: 'Lists all macros associated with a user',
    execute(message, args){
        var array = JSON.parse(macros);
        var personalMacros = [];

        for(i = 0; i < array.length; i++){
            if(array[i].UID === message.author.id){
                personalMacros.push(array[i]);
            }
        }

        if(!personalMacros || !personalMacros.length){
            return message.reply('You have no macros');
        }
        else{
            var macroList = "";
            
            for(i = 0; i < personalMacros.length; i++){
                macroList += personalMacros[i].macro_name;

                if(!personalMacros[i]){
                    macroList += ", ";
                }
            }
            
            return message.reply("Your macros are: " + macroList);
        }
    }
};
const fs = require('fs');
var macros = fs.readFileSync("./macros.json");

module.exports = {
    name: 'editmacro',
    description: 'Edits a specified macro',
    execute(message, args){
        if(!args.length){
            return message.reply('No macro specified. Please specify an existing macro.');
        }

        var array = JSON.parse(macros);
        
        array.forEach(element => {
            if(element.macro_name === args[0] && element.UID === message.client.id){
                element.macro_name = args[1];

                try{
                    dice = args[2].split("d");
                }
                catch(err){
                    console.log(err);
                    message.reply("There was an issue getting the dice details.");
                    return macros;
                }

                dice[0] = parseInt(dice[0]);
                dice[1] = parseInt(dice[1]);
                
                if(!dice[0] && dice[1] > 0){
                    message.reply('The amount of dice must be a non negative integer');
                    return macros;
                }
                else{
                    element.dice = dice[1];
                }
                
                if(!dice[1] && dice[1] > 0){
                    message.reply('The number of sides on the dice must be a non negative integer');
                    return macros;
                }
                else{
                    element.sides = dice[2];
                }
                
                var modifier_type_options = ["i","individual","t","total","n","none"];
                var modifier = 0;
                var modifier_type = "none";
                
                if(!parseInt(args[3]) && modifier_type_options.indexOf(args[3]) === -1){
                    return message.reply('The modifier must be an integer.');
                }
                else if(parseInt(args[3])){
                    element.modifier = parseInt(args[2]);
                }
                
                if(args[4] && modifier_type_options.indexOf(args[4]) === -1){
                    return message.reply('Please specify if there is a modifier, and if it is for the total or individual rolls');
                }
                else if(args[4] === "i" || args[4] === "individual"){
                    element.modifier_type = "individual";
                }
                else if (args[4] === "t" || args[4] === "total"){
                    element.modifier_type = "total";
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
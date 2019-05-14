const fs = require('fs');
var macros = fs.readFileSync("./macros.json");

module.exports = {
    name: 'addmacro',
    description: 'Adds a macro to roll multiple dice with ease.',
    execute(message, args){
        if(!args.length){
            return message.reply('No macro specified. Please specify a new macro.');
        }
        else{
            try{
                dice = args[1].split("d");
            }
            catch(err){
                console.log(err);
                return message.reply("There was an issue getting the dice details.");
            }

            dice[0] = parseInt(dice[0]);
            dice[1] = parseInt(dice[1]);

            if(!dice[0] && dice[0] > 0){
                return message.reply('The amount of dice must be a non negative integer');
            }
            
            if(!dice[1] && dice[1] > 0){
                return message.reply('The number of sides on the dice must be a non negative integer');
            }

            var modifier_type_options = ["i","individual","t","total","n","none"];
            var modifier = 0;
            var modifier_type = "none";
            
            if(!parseInt(args[2]) && modifier_type_options.indexOf(args[2]) === -1){
                return message.reply('The modifier must be an integer.');
            }
            else if(parseInt(args[2])){
                modifier = parseInt(args[2]);
            }
            
            if(args[3] && modifier_type_options.indexOf(args[3]) === -1){
                return message.reply('Please specify if there is a modifier, and if it is for the total or individual rolls');
            }
            else if(args[3] === "i" || args[3] === "individual"){
                modifier_type = "individual";
            }
            else if (args[3] === "t" || args[3] === "total"){
                modifier_type = "total";
            }
            
            var array = JSON.parse(macros);
            array.push({"UID": message.author.id, "macro_name" : args[0], "dice" : dice[0], "sides" : dice[1], "modifier" : modifier, "modifier_type" : modifier_type});
            message.reply("Macro " + args[0] + " Created!");
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
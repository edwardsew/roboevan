module.exports = {
    name: 'listmacros',
    description: 'Lists all macros associated with a user',
    execute(message, macros){
        var array = JSON.parse(macros);
        var personalMacros;
            
        array.forEach(element => {
            if(element.UID === message.client.id){
                personalMacros.push(array[element]);
            }
        });

        if(!Array.isArray(array) || !array.length){
            return message.reply('You have no macros');
        }
        else{
            var macroList;
            personalMacros.forEach(element =>{
                macroList += element.macro_name + ", ";
            });
            return message.reply("Your macros are: " + macroList);
        }
    }
};
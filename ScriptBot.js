var discord = require("discord.js");
var client = new discord.Client();
var fs = require("fs");

let scripts = JSON.parse(fs.readFileSync(`${__dirname}/Scripts.json`, `utf8`));

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;

    let prefix = ".";
    let messageArray = msg.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let scripts = JSON.parse(fs.readFileSync(`${__dirname}/Scripts.json`, `utf8`));

    if(cmd === `${prefix}addscript`){
        var script_name = args[0]
        var script_paste = args[1]
        scripts[script_name] = {}
        scripts[script_name].paste = script_paste
        fs.writeFile(`${__dirname}/Scripts.json`, JSON.stringify(scripts), (err) => {
            if (err) console.log(err);
        }); // save\
        var embed = new discord.RichEmbed()
            .setTitle(`Script Added!`)
            .addField(`Added Script Successfully.`,`Added the script ${script_name} successfully.`, true)
            .setColor(`#42ebf4`)
        msg.channel.sendEmbed(embed)
    } else if(cmd === `${prefix}searchscript`){
        var script_name = args[0]
        if (scripts[script_name]){
            var yay_embed = new discord.RichEmbed()
                .setTitle("Found Script!")
                .addField(`That script was found successfully!`, `Please look at your dm's for the script.`, true)
                .setColor(`#42ebf4`)
            var info_embed = new discord.RichEmbed()
                .setTitle("Script")
                .addField(`Name`, `${script_name}`, true)
                .addField(`Pastebin`, `${scripts[script_name].paste}`)
                .setColor(`#42ebf4`)
            msg.channel.sendEmbed(yay_embed)
            msg.author.sendEmbed(info_embed)
        } else if(!scripts[script_name]){
            var nope_embed = new discord.RichEmbed()
                .setTitle("Not Found")
                .addField(`That script was not found.`, `We couldnt find the script ${script_name}`, true)
                .setColor(`#42ebf4`)
            msg.channel.sendEmbed(nope_embed)
        }
    }
});

client.login("Your bot token goes here");

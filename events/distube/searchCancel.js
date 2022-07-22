const { MessageEmbed } = require("discord.js");

module.exports = async (client, message, query) => {
    if (message) {
        message.channel.send({
            embeds: [new MessageEmbed()
                .setTitle(`Time is out`)
                .setDescription(`Cancelled searching for ${query}`)
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        });
    }
}
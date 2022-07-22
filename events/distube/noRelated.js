const { MessageEmbed } = require("discord.js");

module.exports = (client, queue) => {
    if (queue.textChannel) {
        queue.textChannel.send({
            embeds: [new MessageEmbed()
                .setDescription(`Found nothing related to the last song`)
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })
    }
}
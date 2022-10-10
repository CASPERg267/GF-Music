const { EmbedBuilder } = require("discord.js");

module.exports = (client, queue) => {
    if (queue.textChannel) {
        queue.textChannel.send({
            embeds: [new EmbedBuilder()
                .setDescription(`Found nothing related to the last song`)
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })
    }
}
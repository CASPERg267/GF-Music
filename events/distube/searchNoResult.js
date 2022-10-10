const { EmbedBuilder } = require("discord.js");

module.exports = async (client, query, queue) => {
    if (queue.textChannel) {
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
            .setDescription(`No result found for ${query}!`)

        queue.textChannel.send({ embeds: [embed] })
    }
}
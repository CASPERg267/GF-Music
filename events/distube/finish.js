const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue) => {
    if (queue.textChannel) {
        const embed = new EmbedBuilder()
            .setDescription(`queue is now empty, its time to add more songs.`)
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon });

        queue.textChannel.send({ embeds: [embed] })
    }
}
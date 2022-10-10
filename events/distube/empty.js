const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue) => {

    if (queue.textChannel) {
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
            .setDescription(`**Left <#${queue.voice.voiceState.channelId}> because its empty**`);

        queue.textChannel.send({ embeds: [embed] })
    }
}
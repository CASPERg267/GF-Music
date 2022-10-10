const { EmbedBuilder } = require("discord.js");

module.exports = (client, queue) => {

    if (queue.textChannel) {
        queue.textChannel.send({
            embeds: [new EmbedBuilder()
                .setTitle(`Its not the end i am sure`)
                .setDescription(`I got disconnected from <#${queue.voice.voiceState.channelId}> and deleted the queue :()`)
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })
    }
}
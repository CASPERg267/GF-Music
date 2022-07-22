const { MessageEmbed } = require("discord.js");

module.exports = async (client, channel, error) => {
    client.logger.error(`Something went wrong with the player **[${error}]**`, { label: `playerError` })
    if (channel) {
        channel.send({
            embeds: [new MessageEmbed()
                .setDescription(`Something went wrong, problem has been reported to developers, **Thanks for understanding**`)
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })
    }
}
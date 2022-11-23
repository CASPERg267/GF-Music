const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "leave",
    description: "Stops playing and leaves the Channel!",
    category: "music",
    cooldown: 5,

    run: async (client, interaction, queue) => {

        await queue.stop()
        interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setTimestamp()
                .setTitle(`⏹ **Stopped playing and left the Channel!**`)]
        })
    }
}
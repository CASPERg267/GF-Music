const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "replay",
    aliases: [],
    description: "Replays the current song.",
    category: "music",
    checkers: {
        vc: true,
        queue: true,
        sVc: true,
        dj: true,
    },

    run: async (client, interaction, queue) => {

        await queue.seek(0)
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
            .setDescription("**Song has been replayed**")

        interaction.reply({ embeds: [embed] });
    }
}
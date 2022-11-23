const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "autoplay",
    description: "Toggles Autoplay",
    cooldown: 5,
    category: "music",
    checkers: {
        vc: true,
        queue: true,
        sVc: true,
        dj: true,
    },

    run: async (client, interaction, queue) => {
        await queue.toggleAutoplay();
        interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`**${queue.autoplay ? `Enabled` : `Disabled`} Autoplay!**`)]
        })
    }
}
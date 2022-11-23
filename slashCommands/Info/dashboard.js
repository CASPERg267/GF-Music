const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "dashboard",
    cooldown: 5,
    description: "Sends a Link of the Dashboard",
    category: "info",
    checkers: {
        vc: false,
        queue: false,
        sVc: false,
        dj: false,
    },
    run: async (client, interaction) => {
        try {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setDescription(`> **Website:** ${client.config.dashboard.domain}/\n\n> **Dashboard:** ${client.config.dashboard.domain}/guild/${interaction.guildId}\n\n>`)
                ]
            });
        } catch (e) {
            client.logger.error(`Something went wrong ${e}`, { label: `dashboard command` });
        }
    }
}
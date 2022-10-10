const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "dashboard",
    cooldown: 5,
    category: "info",
    description: "Sends a Link of the Dashboard",
    run: async (client, message) => {
        try {
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.config.embed.color)
                        .setDescription(`> **Website:** ${client.config.dashboard.domain}/\n\n> **Dashboard:** ${client.config.dashboard.domain}/guild/${message.guildId}\n\n>`)
                ]
            });
        } catch (e) {
            client.logger.error(`Something went wrong ${e}`, { label: `dashboard command` });
        }
    }
}
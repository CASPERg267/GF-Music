const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "dashboard",
    cooldown: 5,
    description: "Sends a Link of the Dashboard",
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    run: async (client, message) => {
        try {
            message.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.config.embed.color)
                        .setDescription(`> **Website:** ${client.config.dashboard.domain}/\n\n> **Dashboard:** ${client.config.dashboard.domain}/guild/${message.guildId}\n\n>`)
                ]
            });
        } catch (e) {
            client.logger.error(`Something went wrong ${e}`, { label: `dashboard command` });
        }
    }
}
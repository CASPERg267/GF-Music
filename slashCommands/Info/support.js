module.exports = {
    name: "support",
    cooldown: 5,
    description: "Sends a Link of the Support Server",
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
                ephemeral: true,
                content: `${client.config.support_server}`
            });
        } catch (e) {
            client.logger.error(`Something went wrong ${e}`, { label: `support command`})
        }
    }
}
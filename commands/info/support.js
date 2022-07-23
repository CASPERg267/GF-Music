module.exports = {
    name: "support",
    cooldown: 5,
    category: "info",
    description: "Sends a Link of the Support Server",
    
    run: async (client, message) => {
        try {
            message.reply({
                content: `${client.config.support_server}`
            });
        } catch (e) {
            client.logger.error(`Something went wrong ${e}`, { label: `support command`})
        }
    }
}
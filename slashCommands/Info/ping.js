module.exports = {
    name: "ping",
    description: "Gives you information about GF Music ping",
    cooldown: 5,
    category: "info",
    options: [{
            "StringChoices": {
                name: "what_ping",
                description: "What Ping do you want to get?",
                required: false,
                choices: [
                    ["Bot", "botping"],
                    ["Discord Api", "api"]
                ]
            }
        },
    ],
    run: async (client, interaction) => {
        try {
            const StringOption = interaction.options.getString("what_ping");
            if (StringOption) {
                if (StringOption == "botping") {
                    await interaction.reply({
                        ephemeral: true,
                        content: `Getting the Bot Ping...`,
                    });
                    interaction.editReply({
                        ephemeral: true,
                        content: `Bot Ping: \`${Math.floor((Date.now() - interaction.createdTimestamp) - 2 * Math.floor(client.ws.ping))} ms\``,
                    })
                }
                else {
                    interaction.reply({
                        ephemeral: true,
                        content: `Api Ping: \`${Math.floor(client.ws.ping)} ms\``,
                    })
                }
            } else {
                await interaction.reply({
                    ephemeral: true,
                    content: `Getting the Bot Ping...`,
                });
                interaction.editReply({
                    ephemeral: true,
                    content: `Bot Ping: \`${Math.floor((Date.now() - interaction.createdTimestamp) - 2 * Math.floor(client.ws.ping))} ms\`\n\n Api Ping: \`${Math.floor(client.ws.ping)} ms\``,
                })
            }
        } catch (e) {
            client.logger.error(`Something went wrong ${e}`, { label: `ping command`})
        }
    }
}
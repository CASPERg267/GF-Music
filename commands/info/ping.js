module.exports = {
    name: "ping",
    description: "Gives you information about GF Music ping",
    category: "info",
    cooldown: 5,
    checkers: {
        vc: false,
        queue: false,
        sVc: false,
        dj: false,
    },
    
    run: async (client, message, args) => {
        try {
            const StringOption = args[0];
            if (StringOption) {
                if (StringOption === "botping") {
                    message.reply({
                        content: `Bot Ping: \`${Math.floor((Date.now() - message.createdTimestamp) - 2 * Math.floor(client.ws.ping))} ms\``,
                    })
                } else {
                    message.reply({
                        content: `Api Ping: \`${Math.floor(client.ws.ping)} ms\``,
                    })
                }
            } else {
                await message.reply({
                    content: `Getting the Bot Ping...`,
                });
                message.reply({
                    content: `Bot Ping: \`${Math.floor((Date.now() - message.createdTimestamp) - 2 * Math.floor(client.ws.ping))} ms\`\n\n Api Ping: \`${Math.floor(client.ws.ping)} ms\``,
                })
            }
        } catch (e) {
            client.logger.error(`Something went wrong ${e}`, { label: `ping command`})
        }
    }
}
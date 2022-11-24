const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "leaveserver",
    aliases: ["leaves", "lserver", "ls"],
    category: "owner",
    description: "Only for developers",
    checkers: {
        vc: false,
        queue: false,
        sVc: false,
        dj: false,
    },

    run: async (client, message, args) => {
        if (!args[0]) {
            return message.reply({
                embeds: [new EmbedBuilder()
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    .setDescription(`What do I evaluate?`)]
            })
        }
        let guild = client.guilds.cache.get(args[0]);
        if (!guild) return message.reply({
            content: `make sure you got right guild id`
        })
        guild.leave().then(g => {
            message.reply({
                content: `Left ${g.name}`
            })
        })
    }
}
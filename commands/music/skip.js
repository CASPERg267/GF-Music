const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "skip",
    aliases: ["s"],
    description: "Skips the current song.",
    category: "music",
    queue: true,

    run: async (client, message, args, prefix, queue) => {

        queue.skip().then(song => {
            const embed = new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription("**Song has been skipped**")

            message.reply({ embeds: [embed] });
        });
    }
}
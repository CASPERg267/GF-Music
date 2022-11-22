const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "pause",
    aliases: ["pa"],
    description: "Pauses the current song.",
    category: "music",
    queue: true,

    run: async (client, message, args, prefix, queue) => {

        if (queue.paused) {
            const embed = new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`\`⏯\` | **Song has been:** \`Paused\``);

            message.reply({ embeds: [embed] });
        } else {
            queue.pause();
            const embed = new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`\`⏯\` | **Song has been:** \`Paused\``);

            message.reply({ embeds: [embed] });
        }
    }
}
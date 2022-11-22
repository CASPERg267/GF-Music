const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "autoplay",
    aliases: ["ap"],
    description: "Toggles autoplay for the current guild.",
    category: "music",
    queue: true,

    run: async (client, message, args, prefix, queue) => {
        if (!queue.autoplay) {
            queue.toggleAutoplay();

            const embed = new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`Activate **Autoplay** mode.`)

            message.reply({ embeds: [embed] });
        } else {
            queue.toggleAutoplay();

            const embed = new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`Disable **Autoplay** mode.`)

            message.reply({ embeds: [embed] });
        }
    }
}
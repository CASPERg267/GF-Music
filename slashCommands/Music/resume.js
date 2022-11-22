const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "resume",
    aliases: ["re"],
    description: "Resumes the music",
    category: "music",
    queue: true,

    run: async (client, interaction, queue) => {

        if (queue.paused) {
            await queue.resume();
            const embed = new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`Song has been resumed`);

            interaction.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`Queue has been resumed`);

            interaction.reply({ embeds: [embed] });
        }
    }
}
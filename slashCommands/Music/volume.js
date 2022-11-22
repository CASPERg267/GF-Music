const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "volume",
    description: "Adjusts the Volume of the Music",
    cooldown: 10,
    queue: true,
    options: [
        {
            "Integer": {
                name: "volume",
                description: "What should be the Volume? It must be between 0 & 100",
                required: true
            }
        },
    ],
    run: async (client, interaction, queue) => {

        let volume = interaction.options.getInteger("volume")
        if (volume > 100 || volume < 0) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    .setDescription(`**The Volume must be between \`0\` and \`100\`!**`)
            ],
            ephemeral: true
        })
        await queue.setVolume(volume);
        interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`Changed the Volume to \`${volume}\`!`)]
        })
    }
}
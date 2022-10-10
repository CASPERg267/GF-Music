const { EmbedBuilder } = require("discord.js");

module.exports = {
        name: "skip",
        aliases: ["s"],
        description: "Skips the current song.",
        category: "music",
        
    run: async (client, interaction) => {
        
        const queue = client.distube.getQueue(interaction);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return
        interaction.reply({
            embeds: [new EmbedBuilder()
                .setDescription("You need to be in a same/voice channel.")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })

        queue.skip()
            .then(song => {
                const embed = new EmbedBuilder()
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    .setDescription("**Song has been skipped**")

                interaction.reply({ embeds: [embed] });
            });
    }
}
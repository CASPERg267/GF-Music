const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "autoplay",
    description: "Toggles Autoplay",
    cooldown: 5,
    queue: true,

    run: async (client, interaction) => {
        try {
            const channel = interaction.member.voice;
            if (!channel) return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.config.embed.color)
                        .setTitle(`Please join a voice channel first!`)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                ],
                ephemeral: true
            })
            if (channel.guild.members.me.voice.channel && channel.guild.members.me.voice.channel.id != channel.id) {
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setTitle(`Join my Voice Channel!`)
                        .setDescription(`<#${interaction.guild.members.me.voice.channel.id}>`)
                    ],
                    ephemeral: true
                });
            }
            try {
                let queue = client.distube.getQueue(interaction);
                await queue.toggleAutoplay();
                interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setDescription(`**${queue.autoplay ? `Enabled` : `Disabled`} Autoplay!**`)]
                })
            } catch (e) {
                console.log(e)
            }
        } catch (e) {
            client.logger.error(`Something went wrong ${e}`, { label: `autoplay command` })
        }
    }
}
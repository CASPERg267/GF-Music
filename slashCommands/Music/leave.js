const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "leave",
    description: "Stops playing and leaves the Channel!",
    cooldown: 5,
    
    run: async (client, interaction) => {
        try {
            const channel = interaction.member.voice;
            if (!channel) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setTitle(`**Please join ${interaction.guild.me.voice.channel ? "my" : "a"} VoiceChannel First!**`)
                ],
                ephemeral: true
            })
            if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
                return interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setTitle(`Join my Voice Channel!`)
                        .setDescription(`<#${interaction.guild.me.voice.channel.id}>`)
                    ],
                    ephemeral: true
                });
            }
            try {
                let queue = client.distube.getQueue(interaction.guildId);
                await queue.stop()
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setTimestamp()
                        .setTitle(`⏹ **Stopped playing and left the Channel!**`)]
                })
                return
            } catch (e) {
                console.log(e.stack ? e.stack : e)
            }
        } catch (e) {
            client.logger.error(`Something went wrong ${e}`, { label: `leave command`})
        }
    }
}
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    description: "Adjusts the Volume of the Music",
    cooldown: 10,
    options: [
        {
            "Integer": {
                name: "volume",
                description: "What should be the Volume? It must be between 0 & 100",
                required: true
            }
        },
    ],
    run: async (client, interaction) => {
        try {
            const { channel } = interaction.member.voice;
            if (!channel) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setDescription(`**Please join Voice Channel First!**`)
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
                let queue = client.distube.getQueue(interaction);

                let volume = interaction.options.getInteger("volume")
                if (volume > 100 || volume < 0) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.config.embed.color)
                            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                            .setDescription(`**The Volume must be between \`0\` and \`100\`!**`)
                    ],
                    ephemeral: true
                })
                await queue.setVolume(volume);
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setDescription(`Changed the Volume to \`${volume}\`!`)]
                })
            } catch (e) {
                console.log(e)
            }
        } catch (e) {
            console.log(e)
        }
    }
}
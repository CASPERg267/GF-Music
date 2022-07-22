const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "jump",
    description: "Jumps to a specific Song in the Queue",
    cooldown: 10,
    options: [
        {
            "Integer": {
                name: "position",
                description: "To which Song do you want to jump in the Queue?",
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
                        .setDescription(`Please join ${interaction.guild.me.voice.channel ? "__my__" : "a"} VoiceChannel First!`)
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

                let Position = interaction.options.getInteger("position")
                if (Position > queue.songs.length - 1 || Position < 0) return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.config.embed.color)
                            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                            .setDescription(`The Position must be between \`0\` and \`${queue.songs.length - 1}\`!`)
                    ],
                    ephemeral: true
                })
                await queue.jump(Position);
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setDescription(`Jumped to the \`${Position}th\` Song in the Queue!`)]
                })
            } catch (e) {
                console.log(e)
            }
        } catch (e) {
            console.log(e)
        }
    }
}
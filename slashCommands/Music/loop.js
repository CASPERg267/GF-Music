const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "loop",
    description: "Enable/Disable the Song- / Queue-Loop",
    cooldown: 5,
    options: [
        {
            "StringChoices": {
                name: "what_loop",
                description: "What Loop do you want to set?",
                required: true,
                choices: [
                    ["Disable", "0"],
                    ["Song Loop", "1"],
                    ["Queue Loop", "2"]
                ]
            }
        },
    ],
    run: async (client, interaction) => {
        try {
            const channel = interaction.member.voice;
            if (!channel) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setTitle(`Please join ${interaction.guild.me.voice.channel ? "__my__" : "a"} VoiceChannel First!`)
                ],
                ephemeral: true
            })
            if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
                return interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setTitle(`join my Voice Channel!`)
                        .setDescription(`<#${interaction.guild.me.voice.channel.id}>`)
                    ],
                    ephemeral: true
                });
            }
            try {
                let queue = client.distube.getQueue(interaction);
                let loop = Number(interaction.options.getString("what_loop"))
                await queue.setRepeatMode(loop);
                if (queue.repeatMode == 0) {
                    interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(client.config.embed.color)
                            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                            .setTitle(`Disabled the Loop Mode!**`)]
                    })
                } else if (queue.repeatMode == 1) {
                    interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(client.config.embed.color)
                            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                            .setTitle(`🔁 **Enabled the __Song__-Loop** ||(Disabled the **Queue-Loop**)||`)]
                    })
                } else {
                    interaction.reply({
                        embeds: [new MessageEmbed()
                            .setColor(client.config.embed.color)
                            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                            .setTitle(`🔂 **Enabled the __Queue__-Loop!** ||(Disabled the **Song-Loop**)||`)]
                    })
                }
            } catch (e) {
                console.log(e.stack ? e.stack : e)
            }
        } catch (e) {
            client.logger.error(`Something went wrong ${e}`, { label: `loop command` })
        }
    }
}
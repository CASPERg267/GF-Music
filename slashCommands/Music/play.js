const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    description: "Plays a Song/Playlist in your VoiceChannel",
    cooldown: 5,
    options: [
        {
            "String": {
                name: "song",
                description: "Which Song do you want to play",
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
                        .setDescription(`Please join a Voice Channel First!`)
                ],
            })
            if (channel.userLimit != 0 && channel.full)
                return interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setDescription(`Your Voice Channel is full, I can't join!`)
                    ],

                });
            if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
                return interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setDescription(`I am already connected somewhere else`)
                    ],

                });
            }
            const Text = interaction.options.getString("song");
            await interaction.reply({
                content: `🔍 Searching... \`\`\`${Text}\`\`\``,
            });
            try {
                let queue = client.distube.getQueue(interaction)
                let options = {
                    member: interaction.member
                }
                if (!queue) options.textChannel = interaction.guild.channels.cache.get(interaction.channelId)
                await client.distube.play(channel, Text, options)
                //Edit the reply
                interaction.editReply({
                    content: `${queue?.songs?.length > 0 ? "👍 Added" : "🎶 Now Playing"}: \`\`\`css\n${Text}\n\`\`\``,
                });
            } catch (e) {
                console.log(e)
            }
        } catch (e) {
            console.log(e)
        }
    }
}
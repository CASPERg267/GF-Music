const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "playskip",
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
    run: async (client, interaction, queue) => {
        const Text = interaction.options.getString("song");
        await interaction.reply({
            content: `🔍 Searching... \`\`\`${Text}\`\`\``,
        });

        let options = {
            member: interaction.member,
            textChannel: interaction.channel,
            skip: true
        }
        if (!queue) options.textChannel = interaction.guild.channels.cache.get(interaction.channelId)
        await client.distube.play(channel, Text, options).catch(err => {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(err.message)
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            });
        });
        //Edit the reply
        interaction.editReply({
            content: `${queue?.songs?.length > 0 ? "👍 Added" : "🎶 Now Playing"}: \`\`\`css\n${Text}\n\`\`\``,
        });
    }
}
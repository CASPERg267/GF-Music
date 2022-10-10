const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "lyrics",
    aliases: [],
    description: "Display lyrics of a song",
    category: "music",
    queue: true,

    run: async (client, interaction) => {

        const queue = client.distube.getQueue(interaction);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.reply({
            embeds: [new EmbedBuilder()
                .setDescription("You need to be in a same/voice channel.")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })

        let song = queue.songs[0].name;
        let lyrics = null;
        try {
            lyrics = await client.lyrics.songs.search(song);
            if (!lyrics) interaction.reply({
                ephemeral: true,
                embeds: [new EmbedBuilder()
                    .setDescription(`Couldn't find any lyrics for that song!`)
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            });
        } catch (err) {
            console.log(err);
            interaction.reply({
                ephemeral: true,
                embeds: [new EmbedBuilder()
                    .setDescription(`Couldn't find any lyrics for that song!`)
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            });
        }
        let lyricsEmbed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
            .setTitle(`Lyrics`)
            .setDescription(`**${song}**\n${lyrics}`);

        if (lyrics.length > 2048) {
            lyricsEmbed.setDescription(lyrics.substr(0, 2045));
        }

        interaction.reply({ embeds: [lyricsEmbed], ephemeral: true });
    }
};
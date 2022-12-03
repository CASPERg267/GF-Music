const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "lyrics",
    aliases: [],
    description: "Display lyrics of a song",
    category: "music",
    checkers: {
        vc: true,
        queue: true,
        sVc: true,
        dj: false,
    },

    run: async (client, interaction, queue) => {

        let song = queue.songs[0].name;
        let lyrics = null;
        //replying to the fuckin interaction in case it takes longer than 3 seconds to find the lyrics
        await interaction.reply({
            embeds: [new EmbedBuilder()
                .setDescription(`Searching the lyrics for ${song}`)
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
            ]
        });
        try {
            let searches = await client.lyrics.songs.search(song)
            let firstSong = searches[0];
            let lyrics = await firstSong.lyrics();

            let lyricsEmbed = new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setTitle(`Lyrics for ${song}`)
                .setDescription(`${lyrics || `Couldn't find any lyrics`}`);

            if (lyrics.length > 2048) {
                lyricsEmbed.setDescription(lyrics.substring(0, 2045));
            }

            interaction.editReply({ embeds: [lyricsEmbed], ephemeral: true });
        } catch (err) {
            interaction.editReply({
                ephemeral: true,
                embeds: [new EmbedBuilder()
                    .setDescription(`Couldn't find any lyrics for that song!`)
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            });
        }
    }
};
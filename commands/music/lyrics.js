const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "lyrics",
    aliases: [`ly`, `lyric`],
    description: "Display lyrics of a song",
    category: "music",
    checkers: {
        vc: true,
        queue: true,
        sVc: true,
        dj: false,
    },

    run: async (client, message, args, prefix, queue) => {

        let song = queue.songs[0].name;
        let lyrics = null;

        try {
            lyrics = await client.lyrics.songs.search(song)?.searches[0]?.lyrics();
            if (!lyrics) message.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`Couldn't find any lyrics for that song!`)
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            });
        } catch (err) {
            message.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`Couldn't find any lyrics for that song!`)
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            });
        }
        let lyricsEmbed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
            .setTitle(`Lyrics for ${song}`)
            .setDescription(`**${song}**\n${lyrics}`)
            .setTimestamp();

        if (lyrics.length > 2048) {
            lyricsEmbed.setDescription(lyrics.substring(0, 2045));
        }

        message.reply({ embeds: [lyricsEmbed] })
            .then(msg => {
                var total = queue.songs[0].duration * 1000;
                var current = queue.currentTime * 1000;
                let time = total - current;
                setTimeout(() => { msg.delete(); }, time);
            });
    }
}
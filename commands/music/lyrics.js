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

        let song = args.join(" ");
        let CurrentSong = queue.songs[0];
        if (!song && CurrentSong) song = CurrentSong.name;

        let lyrics = null;

        try {
            lyrics = await client.lyrics.songs.search(song);
            if (!lyrics) message.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`Couldn't find any lyrics for that song!`)
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            });
        } catch (err) {
            console.log(err);
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
            .setTitle(`Lyrics`)
            .setDescription(`**${song}**\n${lyrics}`)
            .setTimestamp();

        if (lyrics.length > 2048) {
            lyricsEmbed.setDescription(lyrics.substring(0, 2045));
        }

        message.reply({ embeds: [lyricsEmbed] })
            .then(n => {
                var total = queue.songs[0].duration * 1000;
                var current = queue.currentTime * 1000;
                let time = total - current;
                setTimeout(() => { msg.delete(); }, time);
            });
    }
}
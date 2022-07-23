const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "lyrics",
    aliases: [`ly`, `lyric`],
    description: "Display lyrics of a song",
    category: "music",
    queue: true,

    run: async (client, message, args) => {

        const msg = await message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription("Searching for lyrics...")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        });

        const queue = client.distube.getQueue(message);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit({
            embeds: [new MessageEmbed()
                .setDescription("You need to be in a same/voice channel.")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })

        let song = args.join(" ");
        let CurrentSong = queue.songs[0];
        if (!song && CurrentSong) song = CurrentSong.name;

        let lyrics = null;

        try {
            lyrics = await client.lyrics.songs.search(song);
            if (!lyrics) msg.edit({
                embeds: [new MessageEmbed()
                    .setDescription(`Couldn't find any lyrics for that song!`)
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            });
        } catch (err) {
            console.log(err);
            msg.edit({
                embeds: [new MessageEmbed()
                    .setDescription(`Couldn't find any lyrics for that song!`)
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            });
        }
        let lyricsEmbed = new MessageEmbed()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
            .setTitle(`Lyrics`)
            .setDescription(`**${song}**\n${lyrics}`)
            .setTimestamp();

        if (lyrics.length > 2048) {
            lyricsEmbed.setDescription(lyrics.substr(0, 2045));
        }

        msg.edit({ embeds: [lyricsEmbed] })
            .then(n => {
                var total = queue.songs[0].duration * 1000;
                var current = queue.currentTime * 1000;
                let time = total - current;
                setTimeout(() => { msg.delete(); }, time);
            });
    }
}
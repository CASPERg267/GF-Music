const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {
    if (queue.textChannel) {
        const tracks = song.related;
        let songs = tracks.slice(0, 10);

        let embed = new EmbedBuilder()
            .setDescription(`**Queued • [${song.name}](${song.url})** \`${song.formattedDuration}\` track from ${song.source} • Requested By: ${song.user}`)
            .setThumbnail(song.thumbnail)
            .addFields([{
                name: `More Info`, value: `
        Duration: ${song.formattedDuration}
        Track Views: ${song.views}
        By: ${song.uploader.name}
        Tracks related to this track: **${songs.map(song => song.name).join("\n")}**`
            }])
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })

        queue.textChannel.send({ embeds: [embed] })
    }
}
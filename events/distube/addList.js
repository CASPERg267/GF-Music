const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, playlist) => {
  if (queue.textChannel) {
    const embed = new EmbedBuilder()
      .setDescription(`**Queued • [${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` (${playlist.songs.length} tracks from ${playlist.source}) • Requested By: ${playlist.user}`)
      .setThumbnail(playlist.thumbnail)
      .addFields([{ name: `More Info`, value: `**songs list:** ${playlist.songs}` }])
      .setColor(client.config.embed.color)
      .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon });

    queue.textChannel.send({ embeds: [embed] })
  }
}
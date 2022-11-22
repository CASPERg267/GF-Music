const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "nowplaying",
    aliases: ["np", "now"],
    description: "Displays the current song playing.",
    category: "music",
    queue: true,

    run: async (client, interaction, queue) => {

        const uni = `${queue.songs[0].playing ? '⏸️ |' : '🔴 |'}`;
        const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);

        const embed = new EmbedBuilder()
            .setAuthor({ name: queue.songs[0].playing ? 'Song Pause...' : 'Now Playing...', iconURL: "https://cdn.discordapp.com/emojis/741605543046807626.gif" })
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
            .addFields([{ name: `Uploader:`, value: `[${queue.songs[0].uploader.name}](${queue.songs[0].uploader.url})`, inline: true },
            { name: `Requester:`, value: `${queue.songs[0].user}`, inline: true },
            { name: `Volume:`, value: `${queue.volume}%`, inline: true },
            { name: `Views:`, value: `${queue.songs[0].views}`, inline: true },
            { name: `Likes:`, value: `${queue.songs[0].likes}`, inline: true },
            { name: `DisLikes:`, value: `${queue.songs[0].dislikes}`, inline: true },
            { name: `Current Duration: \`[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\``, value: `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(30 - part)}\`\`\`` }])
            .setDescription(`**[${queue.songs[0].name}](${queue.songs[0].url})**`)
            .setThumbnail(`${queue.songs[0].thumbnail}`)
            .setTimestamp()

        interaction.reply({ embeds: [embed] });
    }
}
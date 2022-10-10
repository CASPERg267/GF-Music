const { EmbedBuilder } = require("discord.js");

module.exports = async (client, message, result, query) => {
    if (message) {
        let i = 0
        let embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
            .setTitle(`Song Selection...`)
            .setDescription(`${result.map(song => `**(${++i}.) [${song.name}](${song.url})** - \`${song.formattedDuration}\``).join("\n")}`)
            .setFooter({ text: `Please select a song in 30 seconds.` });

        message.channel.send({ embeds: [embed] });
    }
}
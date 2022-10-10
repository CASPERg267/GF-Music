const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "previous",
    aliases: ["prev"],
    description: "Plays the previous song in the queue.",
    category: "music",
    queue: true,

    run: async (client, message) => {

        const queue = client.distube.getQueue(message);
        const msg = await message.channel.send({
            embeds: [new EmbedBuilder()
                .setDescription("Processing.....")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        });

        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit({
            embeds: [new EmbedBuilder()
                .setDescription("You need to be in a same/voice channel.")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })

        if (queue.previousSongs.length == 0) {
            const embed = new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription("**There are no previous songs**")
            msg.edit({ embeds: [embed] });
        } else {
            await queue.previous()
                .then(song => {
                    const embed = new EmbedBuilder()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setDescription(`**Song has been previoused**`)

                    msg.edit({ embeds: [embed] });
                });
        }
    }
}
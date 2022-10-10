const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "shuffle",
    aliases: ["mix"],
    description: "Shuffles the current queue.",
    category: "music",
    queue: true,

    run: async (client, message) => {
        const msg = await message.channel.send({
            embeds: [new EmbedBuilder()
                .setDescription("Processing.....")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        });

        const queue = client.distube.getQueue(message);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return
        msg.edit({
            embeds: [new EmbedBuilder()
                .setDescription("You need to be in a same/voice channel.")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })

        await queue.shuffle();

        let embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
            .setDescription(`**Song has been shuffled**`);

        msg.edit({ embeds: [embed] });
    }
}
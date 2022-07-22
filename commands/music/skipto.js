const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skipto",
    aliases: ["st"],
    description: "Skip to a song in the queue.",
    category: "music",
    queue: true,

    run: async (client, message, args) => {
        const msg = await message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription("Processing.....")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        });

        const queue = client.distube.getQueue(message);
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return
        msg.edit({
            embeds: [new MessageEmbed()
                .setDescription("You need to be in a same/voice channel.")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })

        if (isNaN(args[0])) {
            const embed = new MessageEmbed()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`Please enter a valid number!`);

            return msg.edit({ embeds: [embed] });
        }

        await queue.jump(parseInt(args[0]))
            .then(queue => {
                const embed = new MessageEmbed()
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    .setDescription(`**Skipped to ${args[0]}**`)

                msg.edit({ embeds: [embed] });
            });
    }
}
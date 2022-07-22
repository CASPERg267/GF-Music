const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "loop",
    aliases: ["repeat"],
    description: "loop the song currently playing.",
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
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit({
            embeds: [new MessageEmbed()
                .setDescription("You need to be in a same/voice channel.")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })

        if (!args || args === `disable` || `0`) {
            queue.setRepeatMode(0)
            const disable = new MessageEmbed()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`**loop has been disabled**`)

            msg.edit({ embeds: [disable] });

        } else if (args[0] === `song` || `1`) {
            queue.setRepeatMode(1);
            const song = new MessageEmbed()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`**loop song is now enabled**`)

            msg.edit({ embeds: [song] });

        } else if (args[0] === `queue` || `2`) {
            queue.setRepeatMode(2)
            const embed = new MessageEmbed()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`**loop queue is now enabled**`)

            msg.edit({ embeds: [embed] });

        } else msg.edit({
            embeds: [new MessageEmbed()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`**Choose between (loop song - loop queue - loop disable)**`)]
        })
    }
}
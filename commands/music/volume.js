const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    aliases: ["vol", "v"],
    description: "Changes the volume of the music playing.",
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

        const volume = parseInt(args[0]);

        if (!volume) {
            const embed = new MessageEmbed()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`Current **volume:** \`${queue.volume}\`%`)

            return msg.edit({ embeds: [embed] });
        }

        if (isNaN(volume)) {
            const embed = new MessageEmbed()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`Please enter a valid number`);

            return msg.edit({ embeds: [embed] });
        }

        if (Number(volume) < 1 || Number(volume) > 100) return msg.edit({
            embeds: [new MessageEmbed()
                .setDescription("Please provide a number between 1 and 100")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })

        queue.setVolume(volume);

        const embed = new MessageEmbed()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
            .setDescription(`**Change volume to: \`${args[0]}\`%**`)

        msg.edit({ embeds: [embed] });

    }
}
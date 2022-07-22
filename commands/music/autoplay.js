const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "autoplay",
    aliases: ["ap"],
    description: "Toggles autoplay for the current guild.",
    category: "music",
    queue: true,

    run: async (client, message) => {
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

        if (!queue.autoplay) {
            queue.toggleAutoplay();

            const embed = new MessageEmbed()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`Activate **Autoplay** mode.`)

            msg.edit({ embeds: [embed] });
        } else {
            queue.toggleAutoplay();

            const embed = new MessageEmbed()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`Disable **Autoplay** mode.`)

            msg.edit({ embeds: [embed] });
        }
    }
}
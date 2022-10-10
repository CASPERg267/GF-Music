const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "leave",
    aliases: ["lev", "stop", "dc"],
    description: "Makes the bot leave the voice channel.",
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
        const clientVoice = message.guild.members.me.voice.channel;
        const memberVoice = message.member.voice.channel;

        if (clientVoice === memberVoice) {
            if (queue) {
                queue.stop();
                client.distube.voices.leave(message.guild);
            } else {
                client.distube.voices.leave(message.guild);
            }

            const embed = new EmbedBuilder()
                .setDescription(`**Left \`${memberVoice.name}\`**`)
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })

            msg.edit({ embeds: [embed] });

        }
    }
}
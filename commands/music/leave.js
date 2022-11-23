const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "leave",
    aliases: ["lev", "stop", "dc"],
    description: "Makes the bot leave the voice channel.",
    category: "music",
    checkers: {
        vc: true,
        queue: true,
        sVc: true,
        dj: true,
    },

    run: async (client, message, args, prefix, queue) => {
        const clientVoice = message.guild.members.me.voice.channel;
        const memberVoice = message.member.voice.channel;

        if (clientVoice === memberVoice) {
            queue.stop();
            client.distube.voices.leave(message.guild);

            const embed = new EmbedBuilder()
                .setDescription(`**Left \`${memberVoice.name}\`**`)
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })

            message.reply({ embeds: [embed] });
        }
    }
}
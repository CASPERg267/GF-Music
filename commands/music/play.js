const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "play",
    aliases: ["pplay", "p"],
    description: "Plays a song from the source.",
    category: "music",

    run: async (client, message, args, prefix, queue) => {

        const string = args.join(" ");
        if (!string) {
            return message.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`Please provide a song name or link.`)
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            });
        }

        const options = {
            member: message.member,
            textChannel: message.channel,
            message
        }

        await client.distube.play(message.member.voice.channel, string, options).catch(err => {
            message.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(err.message)
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            });
        });
    }
}
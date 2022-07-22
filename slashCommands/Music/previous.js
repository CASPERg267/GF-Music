const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "previous",
    aliases: ["prev"],
    description: "Plays the previous song in the queue.",
    category: "music",
    queue: true,

    run: async (client, interaction) => {

        const queue = client.distube.getQueue(interaction);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return interaction.reply({
            embeds: [new MessageEmbed()
                .setDescription("You need to be in a same/voice channel.")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })

        if (queue.previousSongs.length == 0) {
            const embed = new MessageEmbed()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription("**There are no previous songs**")
            interaction.reply({ embeds: [embed] });
        } else {
            await queue.previous()
                .then(song => {
                    const embed = new MessageEmbed()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setDescription(`**Song has been previoused**`)

                    interaction.reply({ embeds: [embed] });
                });
        }
    }
}
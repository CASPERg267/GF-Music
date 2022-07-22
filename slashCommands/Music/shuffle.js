const { MessageEmbed } = require('discord.js');

module.exports = {
        name: "shuffle",
        aliases: ["mix"],
        description: "Shuffles the current queue.",
        category: "music",
        queue: true,
        
    run: async (client, interaction) => {

        const queue = client.distube.getQueue(interaction);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.me.voice.channel) return
        interaction.reply({
            embeds: [new MessageEmbed()
                .setDescription("You need to be in a same/voice channel.")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })

        await queue.shuffle();

        let embed = new MessageEmbed()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
            .setDescription(`**Song has been shuffled**`);

        interaction.reply({ embeds: [embed] });
    }
}
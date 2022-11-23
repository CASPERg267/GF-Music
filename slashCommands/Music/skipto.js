const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "jump",
    description: "Jumps to a specific Song in the Queue",
    cooldown: 10,
    category: "music",
    checkers: {
        vc: true,
        queue: true,
        sVc: true,
        dj: true,
    },
    options: [
        {
            "Integer": {
                name: "position",
                description: "To which Song do you want to jump in the Queue?",
                required: true
            }
        },
    ],

    run: async (client, interaction, queue) => {

        let Position = interaction.options.getInteger("position")
        if (Position > queue.songs.length - 1 || Position < 0) return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    .setDescription(`The Position must be between \`0\` and \`${queue.songs.length - 1}\`!`)
            ],
            ephemeral: true
        })
        await queue.jump(Position);
        interaction.reply({
            embeds: [new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`Jumped to the \`${Position}th\` Song in the Queue!`)]
        })
    }
}
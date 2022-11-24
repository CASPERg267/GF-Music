const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "evaluation",
    aliases: ["eval"],
    category: "owner",
    description: "Only for developers",
    checkers: {
        vc: false,
        queue: false,
        sVc: false,
        dj: false,
    },

    run: async (client, message, args) => {

        const input = args.join(' ');
        if (!input) return message.reply({
            embeds: [new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`What do I evaluate?`)
        ]})
        if (!input.toLowerCase().includes('token')) {

            let embed = ``;

            try {
                let output = eval(input);
                if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });

                embed = `\`\`\`js\n${output.length > 2048 ? 'Too large to display.' : output}\`\`\``

            } catch (err) {
                embed = `\`\`\`js\n${err.length > 2048 ? 'Too large to display.' : err}\`\`\``
            }

            message.reply({
                embeds: [new EmbedBuilder()
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    .setDescription(embed)
            ]});
        }
    }
}
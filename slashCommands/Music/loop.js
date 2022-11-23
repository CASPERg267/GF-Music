const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "loop",
    description: "Enable/Disable the Song- / Queue-Loop",
    category: "music",
    cooldown: 5,
    checkers: {
        vc: true,
        queue: true,
        sVc: true,
        dj: true,
    },
    options: [
        {
            "StringChoices": {
                name: "what_loop",
                description: "What Loop do you want to set?",
                required: true,
                choices: [
                    ["Disable", "0"],
                    ["Song Loop", "1"],
                    ["Queue Loop", "2"]
                ]
            }
        },
    ],
    run: async (client, interaction, queue) => {

        let loop = Number(interaction.options.getString("what_loop"))
        await queue.setRepeatMode(loop);
        if (queue.repeatMode == 0) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    .setTitle(`Disabled the Loop Mode!**`)]
            })
        } else if (queue.repeatMode == 1) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    .setTitle(`🔁 **Enabled the __Song__-Loop** ||(Disabled the **Queue-Loop**)||`)]
            })
        } else {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    .setTitle(`🔂 **Enabled the __Queue__-Loop!** ||(Disabled the **Song-Loop**)||`)]
            })
        }
    }
}
const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
        name: "help",
        aliases: ["h", "halp", "commands"],
        category: "utilities",
        description: "Displays all commands that the bot has.",
    run: async (client, interaction) => {
        client.logger.info(`[COMMAND] Help used by ${interaction.author.tag} from ${interaction.guild.name}`, { label: `Help Command` });
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
            .setAuthor({ name: `${interaction.guild.members.me.displayName} Help Command!`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }));
        const categories = readdirSync("./commands/")

        categories.forEach(category => {
            const dir = client.commands.filter(c => c.config.category === category)
            const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
            try {
                embed.addFields([{ name: `❯ ${capitalise} [${dir.size}]:`, value: dir.map(c => `\`${c.config.name}\``).join(" ")}])
            } catch (e) {
                console.log(e)
            }
        })

        return interaction.reply({ embeds: [embed] });
    }
}
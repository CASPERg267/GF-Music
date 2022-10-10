const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    aliases: ["h", "halp", "commands"],
    category: "info",
    description: "Displays all commands that the bot has.",

    run: async (client, message, args) => {
        let prefix = client.settings.get(message.guild.id, `prefix`);
        client.logger.info(`[COMMAND] Help used by ${message.author.tag} from ${message.guild.name}`, { label: `Help Command` });
        const embed = new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
            .setAuthor({ name: `${message.guild.members.me.displayName} Help Command!`, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }));

        if (!args[0]) {
            const categories = readdirSync("./commands/")

            embed.setDescription(`The bot prefix is: **${prefix}**`)
            embed.setFooter({ text: `© ${message.guild.members.me.displayName} | Total Commands: ${client.commands.size}`, iconURL: client.config.embed.footer_icon });

            categories.forEach(category => {
                const dir = client.commands.filter(c => c.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addFields([{ name: `❯ ${capitalise} [${dir.size}]:`, value: dir.map(c => `\`${c.name}\``).join(" ") }])
                } catch (e) {
                    console.log(e)
                }
            })

            return message.channel.send({ embeds: [embed] })
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if (!command) return message.channel.send({
                embeds: [embed.setTitle("Invalid Command.")
                    .setDescription(`Do \`${prefix}help\` for the list of the commands.`)
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            })


            embed.setDescription(stripIndents`${client.user.username}'s prefix is: \`${prefix}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No Description provided."}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

            return message.channel.send({ embeds: [embed] })
        }
    }
}
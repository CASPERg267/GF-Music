const { onCoolDown } = require("../../structures/functions");
const { EmbedBuilder, Permissions } = require("discord.js");

module.exports = async (client, interaction) => {
    const CategoryName = interaction.commandName;
    client.settings.ensure(interaction.guildId, {
        prefix: client.config.prefix,
        defaultvolume: 100,
        defaultautoplay: true,
        nsfw: false,
        djroles: [],
        botchannel: [],
    });

    let command = false;
    try {
        if (client.slashCommands.has(CategoryName + interaction.options.getSubcommand())) {
            command = client.slashCommands.get(CategoryName + interaction.options.getSubcommand());
        }
    } catch {
        if (client.slashCommands.has("normal" + CategoryName)) {
            command = client.slashCommands.get("normal" + CategoryName);
        }
    }
    if (command) {
        let botchannels = client.settings.get(interaction.guildId, `botchannel`);
        if (!botchannels || !Array.isArray(botchannels)) botchannels = [];
        if (botchannels.length > 0) {
            if (!botchannels.includes(interaction.channelId) && !interaction.member.permissions.has(Permissions.Flags.ADMINISTRATOR)) {
                return interaction.reply({
                    ephemeral: true,
                    embeds: [new EmbedBuilder()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setTitle(`You are not allowed to use this Command in here!`)
                        .setDescription(`Please do it in one of those:\n> ${botchannels.map(c => `<#${c}>`).join(", ")}`)
                    ]
                })
            }
        }

        if (onCoolDown(interaction, command)) {
            return interaction.reply({
                ephemeral: true,
                embeds: [new EmbedBuilder()
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    .setDescription(`You have to wait for ${onCoolDown(interaction, command)} in order to use command:**${command}** again.`)
                    .addFields([{ name: `Why is there is a cooldown?`, value: `We apologize for that, but in order to make bot work for everyone else we you should wait, so other users could use the bot without any issues, Thanks for understanding.`}])
                ]
            });
        }

        if (command.queue) {
            const queue = client.distube.getQueue(interaction);
            if (!queue) interaction.reply({
                ephemeral: true,
                embeds: [new EmbedBuilder()
                    .setDescription("There is nothing in the queue right now!")
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })],
            })
        }
        try {
            client.stats.inc(interaction.guildId, "commands");
            client.stats.inc("global", "commands");
            await command.run(client, interaction)
        } catch (e) {
            client.logger.error(`Something went wrong while running a command **[${e}]**`, { label: `interactionCreate` })
            const embed = new EmbedBuilder()
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                .setDescription(`There was an error executing that command, please report that in our [support server](${client.config.support_server})`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}
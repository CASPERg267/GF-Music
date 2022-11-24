const { onCoolDown, databasing, check_if_dj } = require("../../structures/functions");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = async (client, interaction) => {
    const CategoryName = interaction.commandName;
    databasing(client, interaction.guild.id);
    const queue = client.distube.getQueue(interaction);

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

    let memberChannel = interaction.member.voice;
    let botChannel = interaction.guild.members.me.voice;

    if (command) {
        let botchannels = client.settings.get(interaction.guildId, `botchannel`);
        if (!botchannels || !Array.isArray(botchannels)) botchannels = [];
        if (botchannels.length > 0) {
            if (!botchannels.includes(interaction.channelId) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
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

        if (command.checkers.vc && !memberChannel) {
            return interaction.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.config.embed.color)
                        .setTitle(`Please join a voice channel first!`)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                ],
            })
        }

        if (command.checkers.queue && !queue) {
            return interaction.reply({
                ephemeral: true,
                embeds: [new EmbedBuilder()
                    .setDescription("There is nothing in the queue right now!")
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            })
        }

        if (queue) {

            if (command.checkers.sVc && memberChannel.channelId !== botChannel.channelId) {
                return interaction.reply({
                    ephemeral: true,
                    embeds: [new EmbedBuilder()
                        .setDescription("You need to be in a same/voice channel.")
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
                })
            }

            if (command.checkers.dj && queue && check_if_dj(client, interaction.member, queue.songs[0])) {
                return interaction.reply({
                    ephemeral: true,
                    embeds: [new EmbedBuilder()
                        .setDescription(`You need to have dj role in order to use this command, (${check_if_dj(client, interaction.member, queue.songs[0])})`)
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
                })
            }
        }

        if (!interaction.guild.members.me.permissions.has(client.requiredVoicePermissions)) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription("I don't have perm `CONNECT` or `SPEAK` to execute command!")
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            });
        }

        if (!interaction.guild.members.me.permissionsIn(memberChannel.channel).has(client.requiredVoicePermissions)) {
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setDescription(`I don't have perm **[\`CONNECT\` or \`SPEAK\`]** in <#${memberChannel.id}> to join voice!`)
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
            });
        }

        if (onCoolDown(interaction, command)) {
            return interaction.reply({
                ephemeral: true,
                embeds: [new EmbedBuilder()
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    .setDescription(`You have to wait for ${onCoolDown(interaction, command)} in order to use command:**${command}** again.`)
                    .addFields([{ name: `Why is there is a cooldown?`, value: `We apologize for that, but in order to make bot work for everyone else we you should wait, so other users could use the bot without any issues, Thanks for understanding.` }])
                ]
            });
        }

        try {
            client.stats.inc(interaction.guildId, "commands");
            client.stats.inc("global", "commands");
            await command.run(client, interaction, queue)
        } catch (e) {
            client.logger.error(`Something went wrong while running a command **[${e}]**`, { label: `interactionCreate` })
            return interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor(client.config.embed.color)
                    .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    .setDescription(`There was an error executing that command, please report that in our [support server](${client.config.support_server})`)], ephemeral: true
            });
        }
    }
}
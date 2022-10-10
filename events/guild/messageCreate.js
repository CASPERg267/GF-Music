const { EmbedBuilder, PermissionsBitField, ChannelType } = require("discord.js");
const { onCoolDown, escapeRegex } = require(`../../structures/functions`);
const Statcord = require("statcord.js");

module.exports = async (client, message) => {
  try {
    if (message.author.bot || message.channel.type === ChannelType.DM || !message.guild || !message.channel) return;
    client.settings.ensure(message.guild.id, {
      prefix: client.config.prefix,
      defaultvolume: 100,
      defaultautoplay: true,
      nsfw: false,
      djroles: [],
      botchannel: [],
    })
    let prefix = client.settings.get(message.guild.id, `prefix`);
    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {
      const embed = new EmbedBuilder()
        .setColor(client.config.embed.color)
        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
        .setDescription(`**use ${prefix}help to see all of my commands**`);
      message.reply({ embeds: [embed] })
    }

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) return;

    if (!message.guild.members.me.PermissionsBitField.has(client.requiredTextPermissions)) return message.author.dmChannel.send({
      embeds: [new EmbedBuilder()
        .setDescription(`I don't have all of the PermissionsBitField needed **[\`ViewChannel\` \`SEND_MESSAGES\` \`READ_MESSAGE_HISTORY\` \`ADD_REACTIONS\` \`EMBED_LINKS\`]** in <#${message.channelId}> to execute a command!`)
        .setColor(client.config.embed.color)
        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
    }).catch(() => { });

    //Check if user is on cooldown with the cmd, with Tomato#6966's Function
    if (onCoolDown(message, command)) {
      return message.reply({
        embeds: [new EmbedBuilder()
          .setColor(client.config.embed.color)
          .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
          .setDescription(`You have to wait for ${onCoolDown(message, command)} in order to use command:**${command}** again.`)
          .addFields([{ name: `Why is there is a cooldown?`, value: `We apologize for that, but in order to make bot work for everyone else we you should wait, so other users could use the bot without any issues, Thanks for understanding.`}])
        ]
      });
    }

    if (command.queue) {
      const queue = client.distube.getQueue(message);
      if (!queue) message.reply({
        embeds: [new EmbedBuilder()
          .setDescription("There is nothing in the queue right now!")
          .setColor(client.config.embed.color)
          .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
      })
    }

    if (command) {
      let botchannels = client.settings.get(message.guild.id, `botchannel`);
      if (!botchannels || !Array.isArray(botchannels)) botchannels = [];
      if (botchannels.length > 0) {
        if (!botchannels.includes(message.channel.id) && !message.member.PermissionsBitField.has(PermissionsBitField.Flags.Administrator)) {
          return message.reply({
            embeds: [new EmbedBuilder()
              .setColor(client.config.embed.color)
              .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
              .setTitle(`You are not allowed to use this Command in here!`)
              .setDescription(`Please do it in one of those:\n> ${botchannels.map(c => `<#${c}>`).join(", ")}`)
            ]
          })
        }
      }

      try {
        client.stats.inc(message.guild.id, "commands");
        client.stats.inc("global", "commands");
        if (client.config.statcord_token) {
          if (client.shard) {
            Statcord.ShardingClient.postCommand(command, message.author.id, client);
          } else {
            statcord.postCommand(command, message.author.id);
          }
        }
        command.run(client, message, args);
      } catch (e) {
        client.logger.error(`Something went wrong while running a command **[${e}]**`, { label: `messageCreate` })
        const embed = new EmbedBuilder()
          .setColor(client.config.embed.color)
          .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
          .setDescription(`There was an error executing that command, please report that in our [support server](${client.config.support_server})`);

        return message.reply({ embeds: [embed] });
      }
    }
  } catch (e) {
    client.logger.error(`Something went wrong while running a command **[${e}]**`, { label: `messageCreate` })
  }
}
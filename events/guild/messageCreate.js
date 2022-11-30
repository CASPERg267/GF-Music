const { EmbedBuilder, PermissionsBitField, ChannelType } = require("discord.js");
const { onCoolDown, escapeRegex, databasing, check_if_dj } = require(`../../structures/functions`);
const Statcord = require("statcord.js");

module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type === ChannelType.DM || !message.guild || !message.channel) return;
  databasing(client, message.guild.id);
  const queue = client.distube.getQueue(message);
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

  let memberChannel = message.member.voice.channel;
  let botChannel = message.guild.members.me.voice.channel;

  //permission
  if (!message.guild.members.me.permissions.has(client.requiredTextPermissions)) return message.author.dmChannel.send({
    embeds: [new EmbedBuilder()
      .setDescription(`I don't have all of the permissions needed **[\`ViewChannel\` \`SEND_MESSAGES\` \`READ_MESSAGE_HISTORY\` \`ADD_REACTIONS\` \`EMBED_LINKS\`]** in <#${message.channelId}> to execute a command!`)
      .setColor(client.config.embed.color)
      .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
  }).catch(() => { });

  if (command) {
    let botchannels = client.settings.get(message.guild.id, `botchannel`);
    if (!botchannels || !Array.isArray(botchannels)) botchannels = [];
    if (botchannels.length > 0) {
      if (!botchannels.includes(message.channel.id) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
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

    if (command.category === "owner" && !client.config.ownerId.includes(message.author.id)) return;

    //Check if user is on cooldown with the cmd, with Tomato#6966's Function
    if (onCoolDown(message, command)) {
      return message.reply({
        embeds: [new EmbedBuilder()
          .setColor(client.config.embed.color)
          .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
          .setDescription(`You have to wait for ${onCoolDown(message, command)} in order to use command:**${command.name}** again.`)
          .addFields([{ name: `Why is there is a cooldown?`, value: `We apologize for that, but in order to make bot work for everyone else we you should wait, so other users could use the bot without any issues, Thanks for understanding.` }])
        ]
      });
    }

    if (command.checkers.vc && !memberChannel) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor(client.config.embed.color)
            .setTitle(`Please join a voice channel first!`)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
        ],
      })
    }

    if (command.checkers.queue && !queue) {
      return message.reply({
        embeds: [new EmbedBuilder()
          .setDescription("There is nothing in the queue right now!")
          .setColor(client.config.embed.color)
          .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
      })
    }

    if (queue) {

      if (command.checkers.sVc && memberChannel.id !== botChannel.id) {
        return message.reply({
          embeds: [new EmbedBuilder()
            .setDescription("You need to be in a same/voice channel.")
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })
      }

      if (command.checkers.dj && queue && check_if_dj(client, message.member, queue.songs[0])) {
        return message.reply({
          embeds: [new EmbedBuilder()
            .setDescription(`You need to have dj role in order to use this command, (${check_if_dj(client, message.member, queue.songs[0])})`)
            .setColor(client.config.embed.color)
            .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })
      }
    }

    try {
      client.stats.inc(message.guild.id, "commands");
      client.stats.inc("global", "commands");
      if (client.config.statcord_token && client.shard) {
        Statcord.ShardingClient.postCommand(command.name, message.author.id, client);
      } else if (client.config.statcord_token) {
        Statcord.postCommand(command.name, message.author.id);
      }
      command.run(client, message, args, prefix, queue);
    } catch (e) {
      client.logger.error(`Something went wrong while running a command **[${e}]**`, { label: `messageCreate` })
      const embed = new EmbedBuilder()
        .setColor(client.config.embed.color)
        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
        .setDescription(`There was an error executing that command, please report that in our [support server](${client.config.support_server})`);

      return message.reply({ embeds: [embed] });
    }
  }
}
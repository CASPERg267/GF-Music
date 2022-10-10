const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const config = require("../../configs/config");
const { createBar } = require("../../structures/functions");

module.exports = async (client, queue, song) => {
  client.stats.inc(`global`, `songs`)
  const Nqueue = client.distube.getQueue(queue.id);
  const data = Queue(Nqueue, song)

  if (queue.textChannel) {
    const nowplay = await queue.textChannel.send(data)

    const filter = (message) => {
      if (message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId === message.member.voice.channelId) return true;
      else {
        message.reply({
          embeds: [new EmbedBuilder()
            .setDescription(`You need to be in my voice channel <#${message.guild.members.me.voice.channelId}>.`)
            .setColor(config.embed.color)
            .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })], ephemeral: true
        });
      }
    };
    const collector = nowplay.createMessageComponentCollector({ filter, time: song.duration > 0 ? song.duration * 1000 : 600000 });

    collector.on('collect', async (message) => {
      const id = message.customId;
      if (id === "pause") {
        if (!Nqueue) {
          collector.stop();
        }
        if (Nqueue.paused) {
          await Nqueue.resume();
          const embed = new EmbedBuilder()
            .setColor(config.embed.color)
            .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
            .setDescription(`**Song has been resumed**`);

          message.reply({ embeds: [embed], ephemeral: true });
        } else {
          await Nqueue.pause();
          const embed = new EmbedBuilder()
            .setColor(config.embed.color)
            .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
            .setDescription(`**Song has been paused**`);

          message.reply({ embeds: [embed], ephemeral: true });
        }
      } else if (id === "skip") {
        if (!Nqueue) {
          collector.stop();
        }
        if (Nqueue.songs.length === 1) {
          const embed = new EmbedBuilder()
            .setColor(config.embed.color)
            .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
            .setDescription("**There are no songs in queue**")

          message.reply({ embeds: [embed], ephemeral: true });
        } else {
          await Nqueue.skip()
            .then(song => {
              const embed = new EmbedBuilder()
                .setColor(config.embed.color)
                .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
                .setDescription("**Song has been skipped**")

              nowplay.edit({ components: [] });
              message.reply({ embeds: [embed], ephemeral: true });
            });
        }
      } else if (id === "stop") {
        if (!Nqueue) {
          collector.stop();
        }

        await Nqueue.stop();

        const embed = new EmbedBuilder()
          .setDescription(`**Song has been stopped`)
          .setColor(config.embed.color)
          .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })

        await nowplay.edit({ components: [] });
        message.reply({ embeds: [embed], ephemeral: true });
      } else if (id === "loop") {
        if (!Nqueue) {
          collector.stop();
        }
        if (Nqueue.repeatMode === 0) {
          Nqueue.setRepeatMode(1);
          const embed = new EmbedBuilder()
            .setColor(config.embed.color)
            .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
            .setDescription(`**Song is loop current**`)

          message.reply({ embeds: [embed], ephemeral: true });
        } else {
          Nqueue.setRepeatMode(0);
          const embed = new EmbedBuilder()
            .setColor(config.embed.color)
            .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
            .setDescription(`**Song is unloop current**`)

          message.reply({ embeds: [embed], ephemeral: true });
        }
      } else if (id === "previous") {
        if (!Nqueue) {
          collector.stop();
        }
        if (Nqueue.previousSongs.length == 0) {
          const embed = new EmbedBuilder()
            .setColor(config.embed.color)
            .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
            .setDescription("**There are no previous songs**")

          message.reply({ embeds: [embed], ephemeral: true });
        } else {
          await Nqueue.previous()
          const embed = new EmbedBuilder()
            .setColor(config.embed.color)
            .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
            .setDescription("**Song has been previoused**`")

          nowplay.edit({ components: [] });
          message.reply({ embeds: [embed], ephemeral: true });
        }
      }
    });
    collector.on('end', async (collected, reason) => {
      if (reason === "time") {
        nowplay.edit({ components: [] });
      }
    });

  }
}

function Queue(nowQueue, nowTrack) {
  const embeded = new EmbedBuilder()
    .setAuthor({ name: `Starting Playing...`, iconURL: 'https://cdn.discordapp.com/emojis/741605543046807626.gif' })
    .setThumbnail(nowTrack.thumbnail)
    .setColor(config.embed.color)
    .addFields([{ name: `Track Uploader:`, value: `**[${nowTrack.uploader.name}](${nowTrack.uploader.url})**`, inline: true },
    { name: `Current Player Volume:`, value: `${nowQueue.volume}%`, inline: true },
    { name: `Player Filters:`, value: `${nowQueue.filters.join(", ") || "Normal"}`, inline: true },
    { name: `Autoplay Mode:`, value: `${nowQueue.autoplay ? "On" : "Off"}`, inline: true },
    { name: `Total Playlist Duration:`, value: `${nowQueue.formattedDuration}`, inline: true },
    { name: `Current Track Duration:`, value: `${createBar(nowQueue.songs[0].duration, nowQueue.currentTime, 13)} \`${nowQueue.songs[0].formattedDuration}\`` }])
    .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
    .setDescription(`**[${nowTrack.name}](${nowTrack.url})**`)
    .setTimestamp()

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("pause")
        .setLabel(`Pause`)
        .setEmoji("⏯")
        .setStyle(ButtonStyle.Success)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("previous")
        .setLabel(`Previous`)
        .setEmoji("⬅")
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("stop")
        .setLabel(`Stop`)
        .setEmoji("✖")
        .setStyle(ButtonStyle.Danger)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("skip")
        .setLabel(`Skip`)
        .setEmoji("➡")
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("loop")
        .setLabel(`Loop`)
        .setEmoji("🔄")
        .setStyle(ButtonStyle.Success)
    )
  return {
    embeds: [embeded],
    components: [row]
  }
}
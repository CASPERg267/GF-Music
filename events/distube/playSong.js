const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../../configs/config");
const { createBar } = require("../../structures/functions");

module.exports = async (client, queue, song) => {
  client.stats.inc(`global`, `songs`)
  const newQueue = client.distube.getQueue(queue.id)
  const data = Queue(newQueue, song)

  if (queue.textChannel) {
    const nowplay = await queue.textChannel.send(data)

    const filter = (message) => {
      if (message.guild.me.voice.channel && message.guild.me.voice.channelId === message.member.voice.channelId) return true;
      else {
        message.reply({
          embeds: [new MessageEmbed()
            .setDescription(`You need to be in my voice channel <#${message.guild.me.voice.channelId}>.`)
            .setColor(config.embed.color)
            .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })], ephemeral: true
        });
      }
    };
    const collector = nowplay.createMessageComponentCollector({ filter, time: song.duration > 0 ? song.duration * 1000 : 600000 });

    collector.on('collect', async (message) => {
      const id = message.customId;
      const queue = client.distube.getQueue(message.guild.id);
      if (id === "pause") {
        if (!queue) {
          collector.stop();
        }
        if (queue.paused) {
          await client.distube.resume(message.guild.id);
          const embed = new MessageEmbed()
            .setColor(config.embed.color)
            .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
            .setDescription(`**Song has been resumed**`);

          message.reply({ embeds: [embed], ephemeral: true });
        } else {
          await client.distube.pause(message.guild.id);
          const embed = new MessageEmbed()
            .setColor(config.embed.color)
            .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
            .setDescription(`**Song has been paused**`);

          message.reply({ embeds: [embed], ephemeral: true });
        }
      } else if (id === "skip") {
        if (!queue) {
          collector.stop();
        }
        if (queue.songs.length === 1) {
          const embed = new MessageEmbed()
            .setColor(config.embed.color)
            .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
            .setDescription("**There are no songs in queue**")

          message.reply({ embeds: [embed], ephemeral: true });
        } else {
          await client.distube.skip(message)
            .then(song => {
              const embed = new MessageEmbed()
                .setColor(config.embed.color)
                .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
                .setDescription("**Song has been skipped**")

              nowplay.edit({ components: [] });
              message.reply({ embeds: [embed], ephemeral: true });
            });
        }
      } else if (id === "stop") {
        if (!queue) {
          collector.stop();
        }

        await client.distube.stop(message.guild.id);

        const embed = new MessageEmbed()
          .setDescription(`**Song has been stopped`)
          .setColor(config.embed.color)
          .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })

        await nowplay.edit({ components: [] });
        message.reply({ embeds: [embed], ephemeral: true });
      } else if (id === "loop") {
        if (!queue) {
          collector.stop();
        }
        if (queue.repeatMode === 0) {
          client.distube.setRepeatMode(message.guild.id, 1);
          const embed = new MessageEmbed()
            .setColor(config.embed.color)
            .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
            .setDescription(`**Song is loop current**`)

          message.reply({ embeds: [embed], ephemeral: true });
        } else {
          client.distube.setRepeatMode(message.guild.id, 0);
          const embed = new MessageEmbed()
            .setColor(config.embed.color)
            .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
            .setDescription(`**Song is unloop current**`)

          message.reply({ embeds: [embed], ephemeral: true });
        }
      } else if (id === "previous") {
        if (!queue) {
          collector.stop();
        }
        if (queue.previousSongs.length == 0) {
          const embed = new MessageEmbed()
            .setColor(config.embed.color)
            .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
            .setDescription("**There are no previous songs**")

          message.reply({ embeds: [embed], ephemeral: true });
        } else {
          await client.distube.previous(message)
          const embed = new MessageEmbed()
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
  const embeded = new MessageEmbed()
    .setAuthor({ name: `Starting Playing...`, iconURL: 'https://cdn.discordapp.com/emojis/741605543046807626.gif' })
    .setThumbnail(nowTrack.thumbnail)
    .setColor(config.embed.color)
    .addFields({ name: `Track Uploader:`, value: `**[${nowTrack.uploader.name}](${nowTrack.uploader.url})**`, inline: true },
      { name: `Current Player Volume:`, value: `${nowQueue.volume}%`, inline: true },
      { name: `Player Filters:`, value: `${nowQueue.filters.join(", ") || "Normal"}`, inline: true },
      { name: `Autoplay Mode:`, value: `${nowQueue.autoplay ? "On" : "Off"}`, inline: true },
      { name: `Total Playlist Duration:`, value: `${nowQueue.formattedDuration}`, inline: true },
      { name: `Current Track Duration:`, value: `${createBar(nowQueue.songs[0].duration, nowQueue.currentTime, 13)} \`${nowQueue.songs[0].formattedDuration}\`` })
    .setFooter({ text: config.embed.footer_text, iconURL: config.embed.footer_icon })
    .setDescription(`**[${nowTrack.name}](${nowTrack.url})**`)
    .setTimestamp()

  const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId("pause")
        .setEmoji("⏯")
        .setStyle("SUCCESS")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("previous")
        .setEmoji("⬅")
        .setStyle("PRIMARY")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("stop")
        .setEmoji("✖")
        .setStyle("DANGER")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("skip")
        .setEmoji("➡")
        .setStyle("PRIMARY")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("loop")
        .setEmoji("🔄")
        .setStyle("SUCCESS")
    )
  return {
    embeds: [embeded],
    components: [row]
  }
}
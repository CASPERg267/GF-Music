const DisTube = require("distube");
const { delay } = require(`../structures/functions`);

module.exports = client => {
  try {
    const autoconnect = async () => {
      let guilds = client.autoresume.keyArray();
      console.log(`Autoresume - All Guilds, to autoresume:`, guilds)
      if (!guilds || guilds.length == 0) return;
      for (const gId of guilds) {
        try {
          let guild = client.guilds.cache.get(gId);
          if (!guild) {
            client.autoresume.delete(gId);
            console.log(`Autoresume - Bot got Kicked out of the Guild`)
            continue;
          }
          let data = client.autoresume.get(gId);

          let voiceChannel = guild.channels.cache.get(data.voiceChannel);
          if (!voiceChannel && data.voiceChannel) voiceChannel = await guild.channels.fetch(data.voiceChannel).catch(() => { }) || false;
          if (!voiceChannel || !voiceChannel.members || voiceChannel.members.filter(m => !m.user.bot && !m.voice.deaf && !m.voice.selfDeaf).size < 1) {
            client.autoresume.delete(gId);
            console.log(`Autoresume - Voice Channel is either Empty / no Listeners / got deleted`)
            continue;
          }

          let textChannel = guild.channels.cache.get(data.textChannel);
          if (!textChannel) textChannel = await guild.channels.fetch(data.textChannel).catch(() => { }) || false;
          let tracks = data.songs;
          if (!tracks || !tracks[0]) {
            console.log(`Autoresume - Destroyed the player, because there are no tracks available`);
            continue;
          }
          const makeTrack = async track => {
            return new DisTube.Song(
              new DisTube.SearchResult({
                duration: track.duration,
                formattedDuration: track.formattedDuration,
                id: track.id,
                isLive: track.isLive,
                name: track.name,
                thumbnail: track.thumbnail,
                type: "video",
                uploader: track.uploader,
                url: track.url,
                views: track.views,
              }), guild.members.cache.get(track.memberId) || guild.me, track.source);
          };
          await client.distube.play(voiceChannel, tracks[0].url, {
            member: guild.members.cache.get(tracks[0].memberId) || guild.me,
            textChannel: textChannel || null
          })
          let newQueue = client.distube.getQueue(guild.id);
          //tracks = tracks.map(track => makeTrack(track));
          //newQueue.songs = [newQueue.songs[0], ...tracks.slice(1)]
          for (const track of tracks.slice(1)) {
            newQueue.songs.push(await makeTrack(track))
          }
          console.log(`Autoresume - Added ${newQueue.songs.length} Tracks on the QUEUE and started playing ${newQueue.songs[0].name} in ${guild.name}`);
          await newQueue.setVolume(data.volume)
          if (data.repeatMode && data.repeatMode !== 0) {
            newQueue.setRepeatMode(data.repeatMode);
          }
          if (!data.playing) {
            newQueue.pause();
          }
          await newQueue.seek(data.currentTime);
          if (data.filters && data.filters.length > 0) {
            await newQueue.setFilter(data.filters, true);
          }
          client.autoresume.delete(newQueue.id)
          console.log(`Autoresume`.brightCyan + " - Changed autoresume track to queue adjustments + deleted the database entry")
          if (!data.playing) {
            newQueue.pause();
          }
          await delay(1000)
        } catch (e) {
          console.log(e)
        }
      }
    }
    client.on("ready", () => {
      setTimeout(() => autoconnect(), 2 * client.ws.ping)
    })
  } catch (e) {
    console.log(e)
  }
}

/**
 * @INFO
 * idea and the code of autoresume is from Tomato#6966 | https://discord.gg/milrato you should check his github too https://github.com/Tomato6966
 */
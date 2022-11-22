const PlayerMap = new Map();
const playerintervals = new Map();

module.exports = (client, queue) => {

    if (client.PlayerMap.has(`deleted-${queue.id}`)) {
        client.PlayerMap.delete(`deleted-${queue.id}`)
    }
    let data = client.settings.get(queue.id)
    queue.autoplay = Boolean(data.defaultautoplay);
    queue.volume = Number(data.defaultvolume);

    var autoresumeinterval = setInterval(async () => {
        var newQueue = client.distube.getQueue(queue.id);
        if (newQueue && newQueue.id && client.settings.get(newQueue.id, `autoresume`)) {
            const makeTrackData = track => {
                return {
                    memberId: track.member.id,
                    source: track.source,
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
                }
            }
            client.autoresume.ensure(newQueue.id, {
                guild: newQueue.id,
                voiceChannel: newQueue.voiceChannel ? newQueue.voiceChannel.id : null,
                textChannel: newQueue.textChannel ? newQueue.textChannel.id : null,
                songs: newQueue.songs && newQueue.songs.length > 0 ? [...newQueue.songs].map(track => makeTrackData(track)) : null,
                volume: newQueue.volume,
                repeatMode: newQueue.repeatMode,
                playing: newQueue.playing,
                currentTime: newQueue.currentTime,
                filters: [...newQueue.filters].filter(Boolean),
                autoplay: newQueue.autoplay,
            });
            let data = client.autoresume.get(newQueue.id);
            if (data.guild != newQueue.id) client.autoresume.set(newQueue.id, newQueue.id, `guild`)
            if (data.voiceChannel != newQueue.voiceChannel ? newQueue.voiceChannel.id : null) client.autoresume.set(newQueue.id, newQueue.voiceChannel ? newQueue.voiceChannel.id : null, `voiceChannel`)
            if (data.textChannel != newQueue.textChannel ? newQueue.textChannel.id : null) client.autoresume.set(newQueue.id, newQueue.textChannel ? newQueue.textChannel.id : null, `textChannel`)

            if (data.volume != newQueue.volume) client.autoresume.set(newQueue.id, newQueue.volume, `volume`)
            if (data.repeatMode != newQueue.repeatMode) client.autoresume.set(newQueue.id, newQueue.repeatMode, `repeatMode`)
            if (data.playing != newQueue.playing) client.autoresume.set(newQueue.id, newQueue.playing, `playing`)
            if (data.currentTime != newQueue.currentTime) client.autoresume.set(newQueue.id, newQueue.currentTime, `currentTime`)
            if (!arraysEqual([...data.filters].filter(Boolean), [...newQueue.filters].filter(Boolean))) client.autoresume.set(newQueue.id, [...newQueue.filters].filter(Boolean), `filters`)
            if (data.autoplay != newQueue.autoplay) client.autoresume.set(newQueue.id, newQueue.autoplay, `autoplay`)
            if (newQueue.songs && !arraysEqual(data.songs, [...newQueue.songs])) client.autoresume.set(newQueue.id, [...newQueue.songs].map(track => makeTrackData(track)), `songs`)

            function arraysEqual(a, b) {
                if (a === b) return true;
                if (a == null || b == null) return false;
                if (a.length !== b.length) return false;

                for (var i = 0; i < a.length; ++i) {
                    if (a[i] !== b[i]) return false;
                }
                return true;
            }
        }
    }, Number(client.config.autoResumeInterval) * 1000);
    client.playerintervals.set(`autoresumeinterval-${queue.id}`, autoresumeinterval);
}
const PlayerMap = new Map();
const playerintervals = new Map();

module.exports = (client, queue) => {

    if (client.PlayerMap.has(`deleted-${queue.id}`)) {
        client.PlayerMap.delete(`deleted-${queue.id}`)
    }
    let data = client.settings.get(queue.id)
    queue.autoplay = Boolean(data.defaultautoplay);
    queue.volume = Number(data.defaultvolume);

    /*var autoresumeinterval = setInterval(async () => {
        if (queue && queue.id && client.settings.get(queue.id, `autoresume`)) {
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
            client.autoresume.ensure(queue.id, {
                guild: queue.id,
                voiceChannel: queue.voiceChannel ? queue.voiceChannel.id : null,
                textChannel: queue.textChannel ? queue.textChannel.id : null,
                songs: queue.songs && queue.songs.length > 0 ? [...queue.songs].map(track => makeTrackData(track)) : null,
                volume: queue.volume,
                repeatMode: queue.repeatMode,
                playing: queue.playing,
                currentTime: queue.currentTime,
                filters: [...queue.filters].filter(Boolean),
                autoplay: queue.autoplay,
            });
            let data = client.autoresume.get(queue.id);
            if (data.guild != queue.id) client.autoresume.set(queue.id, queue.id, `guild`)
            if (data.voiceChannel != queue.voiceChannel ? queue.voiceChannel.id : null) client.autoresume.set(queue.id, queue.voiceChannel ? queue.voiceChannel.id : null, `voiceChannel`)
            if (data.textChannel != queue.textChannel ? queue.textChannel.id : null) client.autoresume.set(queue.id, queue.textChannel ? queue.textChannel.id : null, `textChannel`)

            if (data.volume != queue.volume) client.autoresume.set(queue.id, queue.volume, `volume`)
            if (data.repeatMode != queue.repeatMode) client.autoresume.set(queue.id, queue.repeatMode, `repeatMode`)
            if (data.playing != queue.playing) client.autoresume.set(queue.id, queue.playing, `playing`)
            if (data.currentTime != queue.currentTime) client.autoresume.set(queue.id, queue.currentTime, `currentTime`)
            if (!arraysEqual([...data.filters].filter(Boolean), [...queue.filters].filter(Boolean))) client.autoresume.set(queue.id, [...queue.filters].filter(Boolean), `filters`)
            if (data.autoplay != queue.autoplay) client.autoresume.set(queue.id, queue.autoplay, `autoplay`)
            if (queue.songs && !arraysEqual(data.songs, [...queue.songs])) client.autoresume.set(queue.id, [...queue.songs].map(track => makeTrackData(track)), `songs`)

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
    client.playerintervals.set(`autoresumeinterval-${queue.id}`, autoresumeinterval);*/
}
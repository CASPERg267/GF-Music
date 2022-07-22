const { Client, Intents, Permissions, Collection } = require("discord.js");
const { DisTube } = require('distube');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const Genius = require("genius-lyrics");
const filters = require("./assests/filters.json");

class gfMusicClient extends Client {
    constructor() {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_VOICE_STATES,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS
            ],
            allowedMentions: {
                parse: ["roles", "users"],
                repliedUser: true,
            },
            failIfNotExists: false,
            waitGuildTimeout: 1000,
            partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
        });

        this.config = require("./configs/config");
        this.dashboard = require("./dashboard/dashboard");
        this.spawned = false;
        this.slashCommands = new Collection();
        this.cooldowns = new Collection();
        this.lyrics = new Genius.Client(this.config.geniusApiToken);
        this.logger = require("./structures/logger");
        this.maps = new Map();
        this.setMaxListeners(100); require('events').defaultMaxListeners = 100;
        this.owner = this.config.ownerId;
        if (!this.token) this.token = this.config.token;

        this.requiredVoicePermissions = [
            Permissions.FLAGS.VIEW_CHANNEL,
            Permissions.FLAGS.CONNECT,
            Permissions.FLAGS.SPEAK
        ];
        this.requiredTextPermissions = [
            Permissions.FLAGS.VIEW_CHANNEL,
            Permissions.FLAGS.SEND_MESSAGES,
            Permissions.FLAGS.READ_MESSAGE_HISTORY,
            Permissions.FLAGS.ADD_REACTIONS,
            Permissions.FLAGS.EMBED_LINKS
        ];

        this.distube = new DisTube(this, {
            emitNewSongOnly: false,
            leaveOnEmpty: true, // true if you want your bot leave voice channel if its empty
            leaveOnFinish: true, // true if you want your bot leave voice channel if no more songs to play
            leaveOnStop: true, // true if you want your bot leave voice channel on stop command
            savePreviousSongs: true, // should be needed for autoplay function
            emitAddSongWhenCreatingQueue: false,
            searchSongs: 0,
            youtubeCookie: this.config.youtube_Cookie,
            nsfw: true, // if you want your bot to play age restricted songs
            emptyCooldown: 25,
            ytdlOptions: {
                highWaterMark: 1024 * 1024 * 64,
                quality: "highestaudio",
                format: "audioonly",
                liveBuffer: 60000,
                dlChunkSize: 1024 * 1024 * 4,
            },
            youtubeDL: false,
            customFilters: filters,
            plugins: [
                new SpotifyPlugin({
                    parallel: true,
                    emitEventsAfterFetching: false,
                    api: {
                        clientId: this.config.spotify.clientId,
                        clientSecret: this.config.spotify.clientSecret,
                    },
                }),
                new SoundCloudPlugin(),
                new YtDlpPlugin()
            ]
        });

        ["aliases", "commands"].forEach(x => this[x] = new Collection());
        ["commands", "events", "distube", "autoresume", "database", "slashCommands"].forEach(x => require(`./handlers/${x}`)(this));

    }
    start() {
        return super.login(this.token);
    };
};
module.exports = gfMusicClient;
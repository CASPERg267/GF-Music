const { Client, GatewayIntentBits, Partials, Permissions, Collection } = require("discord.js");
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
                GatewayIntentBits.Flags.Guilds,
                GatewayIntentBits.Flags.GuildMessages,
                GatewayIntentBits.Flags.GuildVoiceStates,
                GatewayIntentBits.Flags.GuildMessageReactions
            ],
            allowedMentions: {
                parse: ["roles", "users"],
                repliedUser: true,
            },
            failIfNotExists: false,
            waitGuildTimeout: 1000,
            partials: [Partials.Message, Partials.Channel, Partials.Reaction],
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
            Permissions.Flags.VIEW_CHANNEL,
            Permissions.Flags.CONNECT,
            Permissions.Flags.SPEAK
        ];
        this.requiredTextPermissions = [
            Permissions.Flags.VIEW_CHANNEL,
            Permissions.Flags.SEND_MESSAGES,
            Permissions.Flags.READ_MESSAGE_HISTORY,
            Permissions.Flags.ADD_REACTIONS,
            Permissions.Flags.EMBED_LINKS
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
                new YtDlpPlugin({
                    update: false
                })
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
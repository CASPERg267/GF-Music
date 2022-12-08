const { Client, GatewayIntentBits, Partials, PermissionsBitField, Collection } = require("discord.js");
const { DisTube } = require('distube');
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { DeezerPlugin } = require("@distube/deezer");
const Genius = require("genius-lyrics");
const filters = require("./assests/filters.json");

class gfMusicClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMessageReactions
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
        this.PlayerMap = new Map();
        this.playerintervals = new Map();
        this.setMaxListeners(100); require('events').defaultMaxListeners = 100;

        this.requiredVoicePermissions = [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.Connect,
            PermissionsBitField.Flags.Speak
        ];
        this.requiredTextPermissions = [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ReadMessageHistory,
            PermissionsBitField.Flags.AddReactions,
            PermissionsBitField.Flags.EmbedLinks
        ];

        this.distube = new DisTube(this, {
            emitNewSongOnly: false,
            leaveOnEmpty: true, // true if you want your bot leave voice channel if its empty
            leaveOnFinish: true, // true if you want your bot leave voice channel if no more songs to play
            leaveOnStop: true, // true if you want your bot leave voice channel on stop command
            savePreviousSongs: true, // should be needed for autoplay function
            emitAddSongWhenCreatingQueue: false,
            searchSongs: 0,
            youtubeCookie: this.config?.youtube_Cookie,
            nsfw: true, // if you want your bot to play age restricted songs
            emptyCooldown: 25,
            ytdlOptions: {
                highWaterMark: 1024 * 1024 * 64,
                quality: "highestaudio",
                format: "audioonly",
                liveBuffer: 60000,
                dlChunkSize: 1024 * 1024 * 4,
            },
            customFilters: filters,
            plugins: [
                new SpotifyPlugin({
                    parallel: true,
                    emitEventsAfterFetching: false,
                    api: {
                        clientId: this.config.spotify?.clientId,
                        clientSecret: this.config.spotify?.clientSecret,
                    },
                }),
                new SoundCloudPlugin(),
                new YtDlpPlugin({
                    update: false
                }),
                new DeezerPlugin()
            ]
        });

        ["aliases", "commands"].forEach(x => this[x] = new Collection());
        ["commands", "events", "distube", "autoresume", "database", "slashCommands", this.config.antiCrash_Module ? "antiCrash" : null,].forEach(x => require(`./handlers/${x}`)(this));

    }
    start() {
        return super.login(this.token);
    };
};
module.exports = gfMusicClient;

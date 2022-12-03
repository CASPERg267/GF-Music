const DBD = require('discord-dashboard');
const DarkDashboard = require('dbd-dark-dashboard');
const { check_if_dj, updateFeeds } = require("../structures/functions");
const { PermissionsBitField, ChannelType } = require("discord.js");
const session = require("express-session");
const FileStore = require('session-file-store')(session);
const { readdirSync } = require("fs");
const categories = readdirSync("./commands/");
const playerActions = require(`../assests/playerActions.json`);
const playerFilters = require(`../assests/playerFilters.json`);
const playlistMixes = require(`../assests/playlistMixes.json`);

module.exports.load = async client => {
    // commands listing

    const commands = []
    categories.forEach(category => {
        const dir = client.commands.filter(c => c.category === category);
        let capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
        const list = []

        dir.forEach(c => {
            list.push({
                commandName: c.name,
                commandUsage: c.usage || `No usage`,
                commandDescription: c.description || `No description`,
                commandAlias: c.aliases || `No aliases`
            })
        })

        commands.push({
            category: capitalise,
            subTitle: "All helpful commands",
            aliasesDisabled: false,
            list: list
        })
    })

    await DBD.useLicense(client.config.dashboard.license);
    DBD.Dashboard = DBD.UpdatedClass();
    const Dashboard = new DBD.Dashboard({
        port: client.config.dashboard.port,
        client: {
            id: client.config.dashboard.clientId,
            secret: client.config.dashboard.clientSecret
        },
        redirectUri: client.config.dashboard.redirectUri,
        domain: client.config.dashboard.domain,
        bot: client,
        ownerIDs: client.config.ownerId,
        sessionStore: new FileStore({
            secret: 'asdasdasda7734r734753ererfretertdf43534wfefrrrr4awewdasdadadad',
            resave: true,
            saveUninitialized: true,
            path: './databases/sessions',
        }),
        minimizedConsoleLogs: true,
        acceptPrivacyPolicy: true,
        requiredPermissions: [DBD.DISCORD_FLAGS.Permissions.VIEW_CHANNEL], // Giving anyone access to use the dashboard, lol
        rateLimits: {
            manage: {
                windowMs: 15 * 60 * 1000, // 15 minutes
                max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
                message: 'You hitted a ratelimit', // Message returned if user should be rate limited, could be also JSON/HTML
                store: null, // <Rate Limiter Store> - if null, new MemoryStore()
                // supported stores: https://www.npmjs.com/package/express-rate-limit#store
            },
            guildPage: {
                windowMs: 15 * 60 * 1000,
                max: 100,
                message: 'You hitted a ratelimit',
                store: null,
            },
            settingsUpdatePostAPI: {
                windowMs: 15 * 60 * 1000,
                max: 100,
                message: 'You hitted a ratelimit',
                store: null,
            },
        },
        invite: {
            clientId: client.config.dashboard.clientId,
            scopes: ["bot", "identify", "guilds"],
            permissions: '274914954304',
            redirectUri: client.config.dashboard.redirectUri
        },
        supportServer: {
            slash: '/support',
            inviteUrl: client.config.support_server
        },
        guildAfterAuthorization: {
            use: client.config.dashboard.usersJoining,
            guildId: client.config.support_server_id
        },
        underMaintenanceAccessKey: `youshallnotpass`,
        underMaintenanceAccessPage: '/get-access',
        useUnderMaintenance: false,
        underMaintenance: {
            title: 'Under Maintenance',
            contentTitle: 'This page is under maintenance',
            texts: [
                '<br>',
                'We still want to change for the better for you.',
                'Therefore, we are introducing technical updates so that we can allow you to enjoy the quality of our services.',
                '<br>',
                `Come back to us later or join our <a href="${client.config.support_server}">Discord Support Server</a>`
            ],
            bodyBackgroundColors: ['#ffa191', '#ffc247'],
            buildingsColor: '#ff6347',
            craneDivBorderColor: '#ff6347',
            craneArmColor: '#f88f7c',
            craneWeightColor: '#f88f7c',
            outerCraneColor: '#ff6347',
            craneLineColor: '#ff6347',
            craneCabinColor: '#f88f7c',
            craneStandColors: ['#ff6347', '#f29b8b']
        },
        theme: DarkDashboard({
            information: {
                createdBy: "CASPER AG#7384",
                websiteTitle: `${client.user.username} Dashboard`,
                websiteName: client.user.username,
                websiteUrl: client.config.dashboard.domain,
                dashboardUrl: client.config.dashboard.domain,
                supporteMail: `support@${client.config.dashboard.domain}`,
                supportServer: client.config.support_server,
                imageFavicon: client.config.dashboard.imageFavicon,
                iconURL: client.config.dashboard.iconURL,
                loggedIn: "Successfully logged in.",
                mainColor: client.config.dashboard.mainColor || "#2CA8FF",
                subColor: client.config.dashboard.subColor || "#ebdbdb",
                preloader: "Loading..."
            },
            index: {
                card: {
                    category: `${client.user.username}'s Dashboard - Control as you like`,
                    title: `Welcome to the ${client.user.username} dashboard where you can control the core features to the bot.`,
                    image: "https://i.imgur.com/axnP93g.png",
                    footer: "The dashboard is made by amazing team (Assistants) their support server: https://discord.gg/PTcsNRBanm",
                },

                information: {
                    category: `About ${client.user.username}`,
                    title: "Commands and Categorys Information",
                    description: `${client.user.username} Total Commands: ${client.commands.size}`,
                    footer: `You can check them from ${client.config.dashboard.domain}/commands`,
                },
                feeds: setInterval(() => {
                    updateFeeds(client)
                }, Number(client.config.dashboard.updateFeeds) * 1000),
            },
            commands: commands,
            guilds: {
                cardTitle: "Servers",
                cardDescription: "Here are all the servers you currenly have permissions for:",
                type: "blurlist"
            },
            guildInfo: {
                cardTitle: "Server Information",
                cardDescription: "An overview about your server",
            },
            guildSettings: {
                cardTitle: "Servers",
                cardDescription: "Here you can manage all the settings for your server:",
            },
            popupMsg: {
                savedSettings: "Done!",
                noPerms: "Error",
            },
        }),
        settings: [
            {
                categoryId: 'song_request',
                categoryName: "Request Songs",
                categoryDescription: "testing song request",
                categoryOptionsList: [
                    {
                        optionId: 'sw1',
                        optionName: "Current Track Info",
                        optionDescription: "Auto Play",
                        optionType: DBD.formTypes.switch(true),
                        getActualSet: async ({ guild }) => {
                            let songQ = client.distube.getQueue(guild.id);
                            if (!songQ) return false;
                            else return Boolean(songQ.autoplay)
                        },
                        setNew: async ({ guild, user, newData }) => {
                            return;
                        },
                        themeOptions: {
                            minimalbutton: {
                                first: true,
                            }
                        }
                    },
                    {
                        optionId: 'sw2',
                        optionName: "",
                        optionDescription: "Song Paused",
                        optionType: DBD.formTypes.switch(true),
                        getActualSet: async ({ guild, user }) => {
                            let songQ = client.distube.getQueue(guild.id);
                            if (!songQ) return false;
                            else return Boolean(songQ.paused);
                        },
                        setNew: async ({ guild, user, newData }) => {
                            return;
                        },
                        themeOptions: {
                            minimalbutton: true
                        }
                    },
                    {
                        optionId: 'sw3',
                        optionName: "",
                        optionDescription: "Loop Song",
                        optionType: DBD.formTypes.switch(true),
                        getActualSet: async ({ guild, user }) => {
                            let songQ = client.distube.getQueue(guild.id);
                            if (!songQ || songQ.repeatMode === 0) return false;
                            else if (songQ.repeatMode === 1) return true;
                        },
                        setNew: async ({ guild, user, newData }) => {
                            return;
                        },
                        themeOptions: {
                            minimalbutton: true
                        }
                    },
                    {
                        optionId: 'sw4',
                        optionName: "",
                        optionDescription: "Loop Queue",
                        optionType: DBD.formTypes.switch(true),
                        getActualSet: async ({ guild, user }) => {
                            let songQ = client.distube.getQueue(guild.id);
                            if (!songQ || songQ.repeatMode === 0) return false;
                            else if (songQ.repeatMode === 2) return true;
                        },
                        setNew: async ({ guild, user, newData }) => {
                            return;
                        },
                        themeOptions: {
                            minimalbutton: {
                                last: true,
                            }
                        }
                    },
                    {
                        optionId: 'songs',
                        optionName: "Request a song",
                        optionDescription: "Request a song name/url as you like.",
                        optionType: DBD.formTypes.textarea(`Request a song name/url`, 2, 1024, false, false),
                        getActualSet: async ({ guild, user }) => {
                            let server = client.guilds.cache.get(guild.id);
                            let member = server.members.cache.get(user.id);
                            let queue = client.distube.getQueue(guild.id);
                            if (!queue) return `${member.displayName} No songs currently being played in ${server.name}`
                            else return `(${queue.songs[0].name}) - Requested by ${queue.songs[0].member.displayName} - Song Duration: ${queue.songs[0].formattedDuration}`;
                        },
                        setNew: async ({ guild, user, newData }) => {
                            let server = client.guilds.cache.get(guild.id);
                            let member = server.members.cache.get(user.id);
                            let queue = client.distube.getQueue(guild.id);
                            let vc = member.voice.channel;
                            if (!vc) return { error: `${member.displayName} You have to be in voice channel in ${server.name} if you want to play something` }
                            const song = client.distube.play(vc, newData, { member: member }).catch(err => {
                                return { error: err.message }
                            });
                            const nsfw = await client.settings.get(guild.id, `nsfw`);
                            if (newData) return song
                            else if (queue.songs.length === 1) {
                                if (check_if_dj(client, member, queue.songs[0])) return { error: `${member.displayName} you are not allowed to play songs since you don't have the dj role in ${server.name}` }
                            }
                            else if (song.age_restricted && !nsfw) {
                                return { error: `${member.displayName} This song is age restricted, to enable age restricted songs head to your server settings and toggle it on.` }
                            }
                        },
                    },
                    {
                        optionId: 'playerFilters',
                        optionName: "Player Filters",
                        optionDescription: "Add sound filters to the player",
                        optionType: DBD.formTypes.select(playerFilters, false),
                        getActualSet: async ({ guild, user }) => {
                            let queue = client.distube.getQueue(guild.id);
                            if (!queue) return [];
                            else return queue.filters.toString();
                        },
                        setNew: async ({ guild, user, newData }) => {
                            let queue = client.distube.getQueue(guild.id);
                            if (!queue) return;
                            else if (queue) {
                                if (newData === `clear`) queue.filters.clear();
                            } else return queue.filters.add(newData);
                        },
                    },
                    {
                        optionId: 'queue',
                        optionName: "Queue of your server",
                        optionDescription: "List of songs in the queue",
                        optionType: DBD.formTypes.textarea(`There is nothing in the queue`, 1, 2, true, false),
                        getActualSet: async ({ guild, user }) => {
                            let server = client.guilds.cache.get(guild.id);
                            let member = server.members.cache.get(user.id);
                            let queue = client.distube.getQueue(guild.id);
                            if (!queue || !queue.songs || !queue.songs.length === 0) return `${member.displayName} Nothing in the server queue`;
                            else return queue.songs.map(song => song.name).join("\n");
                        },
                        setNew: async ({ guild, user, newData }) => {
                            return;
                        },
                    },
                    {
                        optionId: 'lyrics',
                        optionName: "Lyrics",
                        optionDescription: "Lyrics of the current song",
                        optionType: DBD.formTypes.textarea(`There is nothing in the queue`, 1, 2, true, false),
                        getActualSet: async ({ guild, user }) => {
                            let server = client.guilds.cache.get(guild.id);
                            let member = server.members.cache.get(user.id);
                            let currentSong = client.distube.getQueue(guild.id);
                            let lyrics;
                            if (!currentSong) return `${member.displayName} Nothing playing to get lyrics`;
                            else if (currentSong) {
                                let searches = await client.lyrics.songs.search(currentSong.songs[0].name)
                                let firstSong = searches[0];
                                let lyrics = await firstSong.lyrics();
                                return lyrics || `${member.displayName} No lyrics found for ${currentSong.songs[0].name}`;
                            }
                        },
                        setNew: async ({ guild, user, newData }) => {
                            return;
                        },
                    },
                ]
            },
            {
                categoryId: `player_actions`,
                categoryName: `Player Actions`,
                optionDescription: `Control the player in your server`,
                categoryOptionsList: [
                    {
                        optionId: 'playerActions',
                        optionName: "Player Actions",
                        optionDescription: "Control the player to",
                        optionType: DBD.formTypes.select(playerActions, false),
                        getActualSet: async ({ guild, user }) => {
                            return [];
                        },
                        setNew: async ({ guild, user, newData }) => {
                            let server = client.guilds.cache.get(guild.id);
                            let member = server.members.cache.get(user.id);
                            let queue = client.distube.getQueue(guild.id);
                            if (!queue) return { error: `${member.displayName} No songs currently being played in ${server.name}` }
                            else if (queue) {
                                if (check_if_dj(client, member, queue.songs[0]) === true) return { error: `${member.displayName} You are not allowed to use ${newData} since you don't have the dj role in ${server.name}` }
                                else if (newData === `skip`)
                                    if (queue.songs.length === 1 && queue.autoplay === false) {
                                        return { error: `${member.displayName} There is no songs to skip` }
                                    } else return queue.skip();
                                else if (newData === `previous`)
                                    if (queue.previousSongs.length == 0) {
                                        return { error: `${member.displayName} There are no previous songs` }
                                    } else return queue.previous();
                                else if (newData === `leave`) return queue.stop();
                                else if (newData === `pause`)
                                    if (queue.paused) {
                                        return { error: `${member.displayName} The queue of ${server.name} is already paused` }
                                    } else return queue.pause();
                                else if (newData === `resume`)
                                    if (!queue.paused) {
                                        return { error: `${member.displayName} The queue of ${server.name} not paused to resume it` }
                                    } else return queue.resume();
                                else if (newData === `loop`) return queue.setRepeatMode(1);
                                else if (newData === `loopQueue`) return queue.setRepeatMode(2);
                                else if (newData === `clearQueue`) if (queue.songs.length === 0) {
                                    return { error: `${member.displayName} There is no songs to clear` }
                                } else return queue.songs.splice(1);
                                else if (newData === `disableLoop`)
                                    if (queue.repeatMode === 0) {
                                        return { error: `loop is already disabled` }
                                    } else return queue.setRepeatMode(0);
                                else if (newData === `replay`) return queue.seek(0);
                                else if (newData === `shuffle`) return queue.shuffle();
                                else if (newData === `autoplay`) return queue.toggleAutoplay();
                                else if (newData === `addRelatedSong`) return queue.addRelatedSong();
                                let seektime = queue.currentTime + 20;
                                if (seektime >= queue.songs[0].duration) seektime = queue.songs[0].duration - 1;
                                else if (newData === `forward20Sec`) return queue.seek(seektime);
                                let seekTime = queue.currentTime - 20;
                                if (seekTime < 0) seekTime = 0;
                                if (seekTime >= queue.songs[0].duration - queue.currentTime) seektime = 0;
                                else if (newData === `rewind20Sec`) return queue.seek(seekTime);
                                else return { error: `${member.displayName} something went wrong` }
                            }
                        },
                    },
                ]
            },
            {
                categoryId: 'play_mixes',
                categoryName: "Play a playlist of mixed songs",
                categoryDescription: "testing song request",
                categoryOptionsList: [
                    {
                        optionId: 'playMixes',
                        optionName: "Choose a playlist",
                        optionDescription: "play a playlist of mixes",
                        optionType: DBD.formTypes.select(playlistMixes, false),
                        getActualSet: async ({ guild, user }) => {
                            return [];
                        },
                        setNew: async ({ guild, user, newData }) => {
                            let server = client.guilds.cache.get(guild.id);
                            let member = server.members.cache.get(user.id);
                            let voiceChannel = member.voice.channel;
                            if (!voiceChannel) return { error: `${member.displayName} You have to be in voice channel in ${server.name} if you want to play something` }
                            return client.distube.play(voiceChannel, newData.toString(), { member: member }).catch(err => {
                                return { error: err.message }
                            });
                        },
                    },
                ]
            },
            {
                categoryId: 'server_settings',
                categoryName: "Server Settings",
                categoryDescription: "Edit and control your server settings",
                categoryOptionsList: [
                    {
                        optionId: 'autoPlay',
                        optionName: "AutoPlay state",
                        optionDescription: "Set the default state for autoplay.",
                        optionType: DBD.formTypes.switch(false),
                        getActualSet: async ({ guild, user }) => {
                            let autoPlay = await client.settings.get(guild.id, `defaultautoplay`);
                            return Boolean(autoPlay);
                        },
                        setNew: async ({ guild, user, newData }) => {
                            let server = client.guilds.cache.get(guild.id);
                            let member = server.members.cache.get(user.id);
                            if (member.permissions.has([PermissionsBitField.Flags.ManageGuild])) {
                                return client.settings.set(guild.id, newData, `defaultautoplay`);
                            } else return { error: `You don't have (Manage Server) permission in order to edit this setting` }
                        },
                        themeOptions: {
                            minimalbutton: {
                                first: true,
                            }
                        }
                    },
                    {
                        optionId: 'nsfw',
                        optionName: "Age Restricted Videos",
                        optionDescription: "Set the player to play age restricted tracks or not.",
                        optionType: DBD.formTypes.switch(false),
                        getActualSet: async ({ guild, user }) => {
                            let nsfw = await client.settings.get(guild.id, `nsfw`);
                            return Boolean(nsfw);
                        },
                        setNew: async ({ guild, user, newData }) => {
                            return client.settings.set(guild.id, newData, `nsfw`);
                        },
                        themeOptions: {
                            minimalbutton: {
                                last: true,
                            }
                        }
                    },
                    {
                        optionId: 'prefix',
                        optionName: "Bot Prefix",
                        optionDescription: "Set the prefix for your server.",
                        optionType: DBD.formTypes.input(`new prefix must be a between 1/3 characters`, 1, 3, false, false),
                        getActualSet: async ({ guild, user }) => {
                            let prefix = await client.settings.get(guild.id, `prefix`);
                            return String(prefix);
                        },
                        setNew: async ({ guild, user, newData }) => {
                            return client.settings.set(guild.id, newData, `prefix`);
                        },
                    },
                    {
                        optionId: 'dj',
                        optionName: "DJ Role",
                        optionDescription: "Set a dj role for roles who can control the bot.",
                        optionType: DBD.formTypes.rolesSelect(false),
                        getActualSet: async ({ guild, user }) => {
                            let roleid = await client.settings.get(guild.id, `djroles`);
                            return roleid.toString();
                        },
                        setNew: async ({ guild, user, newData }) => {
                            return client.settings.push(guild.id, newData, "djroles");
                        },
                    },
                    {
                        optionId: 'botChannel',
                        optionName: "Bot Channel",
                        optionDescription: "Set a bot chat where users can control the bot.",
                        optionType: DBD.formTypes.channelsSelect(false, [ChannelType.GuildText]),
                        getActualSet: async ({ guild, user }) => {
                            let botChannel = await client.settings.get(guild.id, `botchannel`);
                            return botChannel.toString();
                        },
                        setNew: async ({ guild, user, newData }) => {
                            return client.settings.push(guild.id, newData, `botchannel`);
                        },
                    },
                    {
                        optionId: 'defaultVolume',
                        optionName: "Default player volume",
                        optionDescription: "Set the default player volume for your server.",
                        optionType: DBD.formTypes.input(`Player volume must be a number between 1/150`, 1, 3, false, false),
                        getActualSet: async ({ guild, user }) => {
                            let defaultVolume = await client.settings.get(guild.id, `defaultvolume`);
                            return defaultVolume;
                        },
                        setNew: async ({ guild, user, newData }) => {
                            let server = client.guilds.cache.get(guild.id);
                            let member = server.members.cache.get(user.id);
                            if (!newData || (newData > 150 || newData < 1)) {
                                return { error: `${member.displayName} player volume must be a number between 1/150` }
                            } return client.settings.set(guild.id, newData, `defaultvolume`);
                        },
                    },
                ]
            },
        ],
    });

    Dashboard.DBDEvents.on('userLoggedIn', (data) => {
        if (client.config.dashboard.events.userLoggedIn) {
            client.logger.silly(`New user has logged in: ${JSON.stringify(data)}`, { label: `Dashboard` })
        }
    });

    Dashboard.DBDEvents.on('websiteView', (data) => {
        if (client.config.dashboard.events.websiteView) {
            client.logger.silly(`New user viewed bot website: ${JSON.stringify(data)}`, { label: `Dashboard` })
        }
    });

    Dashboard.DBDEvents.on('guildSettingsUpdated', (data) => {
        if (client.config.dashboard.events.guildSettingsUpdated) {
            client.logger.silly(`New user updated guild settings: ${JSON.stringify(data)}`, { label: `Dashboard` })
        }
    });

    DBD.customPagesTypes.redirectToUrl(`github`, `https://github.com/CASPERg267/GF-Music`);

    await Dashboard.init().then(
        client.spawned = true).catch(err => {
            client.logger.error(`Dashboard failed to initialize: ${err}`, { label: `Dashboard` })
        })
    client.logger.info(`Dashboard launched on port ${client.config.dashboard.port}`, { label: `Dashboard` })
}

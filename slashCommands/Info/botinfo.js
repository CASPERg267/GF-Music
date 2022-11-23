const { EmbedBuilder, version, ChannelType } = require("discord.js");
let cpuStat = require("cpu-stat");
let os = require("os");
const { duration } = require("../../structures/functions");

module.exports = {
    name: "botinfo",
    cooldown: 10,
    description: "Shows Bot Information",
    category: "info",
    checkers: {
        vc: false,
        queue: false,
        sVc: false,
        dj: false,
    },
    run: async (client, interaction) => {
        try {
            cpuStat.usagePercent(function (e, percent, seconds) {
                try {
                    if (e) return console.log(String(e.stack).red);

                    let connectedchannelsamount = 0;
                    let guilds = client.guilds.cache.map((guild) => guild);
                    for (let i = 0; i < guilds.length; i++) {
                        if (guilds[i].members.me.voice.channel) connectedchannelsamount += 1;
                    }
                    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;

                    const botinfo = new EmbedBuilder()
                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                        .setTitle("__**Stats:**__")
                        .setColor(client.config.embed.color)
                        .addFields([{ name: "⏳ Memory Usage", value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, inline: true }])
                        .addFields([{ name: "⌚️ Uptime ", value: `${duration(client.uptime).map(i => `\`${i}\``).join(", ")}`, inline: true}])
                        .addFields([{ name: "\u200b", value: `\u200b`, inline: true}])
                        .addFields([{ name: "📁 Users", value: `\`Total: ${client.users.cache.size} Users\``, inline: true}])
                        .addFields([{ name: "📁 Servers", value: `\`Total: ${client.guilds.cache.size} Servers\``, inline: true}])
                        .addFields([{ name: "\u200b", value: `\u200b`, inline: true}])
                        .addFields([{ name: "📁 Voice-Channels", value: `\`${client.channels.cache.filter((ch) => ch.type === ChannelType.GuildVoice || ch.type === ChannelType.GuildStageVoice).size}\``, inline: true}])
                        .addFields([{ name: "🔊 Connections", value: `\`${connectedchannelsamount} Connections\``, inline: true}])
                        .addFields([{ name: "\u200b", value: `\u200b`, inline: true}])
                        .addFields([{ name: "👾 Discord.js", value: `\`v${version}\``, inline: true}])
                        .addFields([{ name: "🤖 Node", value: `\`${process.version}\``, inline: true}])
                        .addFields([{ name: "\u200b", value: `\u200b`, inline: true}])
                        .addFields([{ name: "🤖 CPU", value: `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``}])
                        .addFields([{ name: "🤖 CPU usage", value: `\`${percent.toFixed(2)}%\``, inline: true}])
                        .addFields([{ name: "🤖 Arch", value: `\`${os.arch()}\``, inline: true}])
                        .addFields([{ name: "\u200b", value: `\u200b`, inline: true}])
                        .addFields([{ name: "💻 Platform", value: `\`\`${os.platform()}\`\``, inline: true}])
                        .addFields([{ name: "API Latency", value: `\`${client.ws.ping}ms\``, inline: true}])
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    interaction.reply({
                        embeds: [botinfo]
                    });

                } catch (e) {
                    console.log(e)
                    let connectedchannelsamount = 0;
                    let guilds = client.guilds.cache.map((guild) => guild);
                    for (let i = 0; i < guilds.length; i++) {
                        if (guilds[i].members.me.voice.channel) connectedchannelsamount += 1;
                    }
                    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                    const botinfo = new EmbedBuilder()
                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                        .setTitle("__**Stats:**__")
                        .setColor(client.config.embed.color)
                        .addFields([{ name: "⏳ Memory Usage", value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, inline: true }])
                        .addFields([{ name: "⌚️ Uptime ", value: `${duration(client.uptime).map(i => `\`${i}\``).join(", ")}`, inline: true}])
                        .addFields([{ name: "\u200b", value: `\u200b`, inline: true}])
                        .addFields([{ name: "📁 Users", value: `\`Total: ${client.users.cache.size} Users\``, inline: true}])
                        .addFields([{ name: "📁 Servers", value: `\`Total: ${client.guilds.cache.size} Servers\``, inline: true}])
                        .addFields([{ name: "\u200b", value: `\u200b`, inline: true}])
                        .addFields([{ name: "📁 Voice-Channels", value: `\`${client.channels.cache.filter((ch) => ch.type === ChannelType.GuildVoice || ch.type === ChannelType.GuildStageVoice).size}\``, inline: true}])
                        .addFields([{ name: "🔊 Connections", value: `\`${connectedchannelsamount} Connections\``, inline: true}])
                        .addFields([{ name: "\u200b", value: `\u200b`, inline: true}])
                        .addFields([{ name: "👾 Discord.js", value: `\`v${version}\``, inline: true}])
                        .addFields([{ name: "🤖 Node", value: `\`${process.version}\``, inline: true}])
                        .addFields([{ name: "\u200b", value: `\u200b`, inline: true}])
                        .addFields([{ name: "🤖 CPU", value: `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``}])
                        .addFields([{ name: "🤖 CPU usage", value: `\`${percent.toFixed(2)}%\``, inline: true}])
                        .addFields([{ name: "🤖 Arch", value: `\`${os.arch()}\``, inline: true}])
                        .addFields([{ name: "\u200b", value: `\u200b`, inline: true}])
                        .addFields([{ name: "💻 Platform", value: `\`\`${os.platform()}\`\``, inline: true}])
                        .addFields([{ name: "API Latency", value: `\`${client.ws.ping}ms\``, inline: true}])
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    interaction.reply({
                        embeds: [botinfo]
                    });
                }
            })
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    }
}
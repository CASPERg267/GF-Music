const { MessageEmbed, version } = require("discord.js");
let cpuStat = require("cpu-stat");
let os = require("os");
const { duration } = require("../../structures/functions");

module.exports = {
    name: "botinfo",
    cooldown: 10,
    description: "Shows Bot Information",
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    run: async (client, message) => {
        try {
            cpuStat.usagePercent(function (e, percent, seconds) {
                try {
                    if (e) return console.log(String(e.stack).red);

                    let connectedchannelsamount = 0;
                    let guilds = client.guilds.cache.map((guild) => guild);
                    for (let i = 0; i < guilds.length; i++) {
                        if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                    }
                    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;

                    const botinfo = new MessageEmbed()
                        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
                        .setTitle("__**Stats:**__")
                        .setColor(client.config.embed.color)
                        .addField("⏳ Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
                        .addField("⌚️ Uptime ", `${duration(client.uptime).map(i => `\`${i}\``).join(", ")}`, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("📁 Users", `\`Total: ${client.users.cache.size} Users\``, true)
                        .addField("📁 Servers", `\`Total: ${client.guilds.cache.size} Servers\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("📁 Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size}\``, true)
                        .addField("🔊 Connections", `\`${connectedchannelsamount} Connections\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("👾 Discord.js", `\`v${version}\``, true)
                        .addField("🤖 Node", `\`${process.version}\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                        .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``, true)
                        .addField("🤖 Arch", `\`${os.arch()}\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("💻 Platform", `\`\`${os.platform()}\`\``, true)
                        .addField("API Latency", `\`${client.ws.ping}ms\``, true)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    message.reply({
                        embeds: [botinfo]
                    });

                } catch (e) {
                    console.log(e)
                    let connectedchannelsamount = 0;
                    let guilds = client.guilds.cache.map((guild) => guild);
                    for (let i = 0; i < guilds.length; i++) {
                        if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                    }
                    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                    const botinfo = new MessageEmbed()
                        .setAuthor(client.user.username, client.user.displayAvatarURL())
                        .setTitle("__**Stats:**__")
                        .setColor(client.config.embed.color)
                        .addField("⏳ Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, true)
                        .addField("⌚️ Uptime ", `${duration(client.uptime).map(i => `\`${i}\``).join(", ")}`, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("📁 Users", `\`Total: ${client.users.cache.size} Users\``, true)
                        .addField("📁 Servers", `\`Total: ${client.guilds.cache.size} Servers\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("📁 Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "GUILD_VOICE" || ch.type === "GUILD_STAGE_VOICE").size}\``, true)
                        .addField("🔊 Connections", `\`${connectedchannelsamount} Connections\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("👾 Discord.js", `\`v${version}\``, true)
                        .addField("🤖 Node", `\`${process.version}\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                        .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``, true)
                        .addField("🤖 Arch", `\`${os.arch()}\``, true)
                        .addField("\u200b", `\u200b`, true)
                        .addField("💻 Platform", `\`\`${os.platform()}\`\``, true)
                        .addField("API Latency", `\`${client.ws.ping}ms\``, true)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                    message.reply({
                        embeds: [botinfo]
                    });
                }
            })
        } catch (e) {
            console.log(String(e.stack).bgRed)
        }
    }
}
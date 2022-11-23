const { ChannelType } = require("discord.js");

module.exports = async (client, guild) => {
    if (!guild || !guild.available) return;
    client.distube.getQueue(guild)?.stop();
    let guildOwner = "No owner data fetched";
    await guild.fetchOwner().then(({
        user
    }) => {
        guildOwner = user;
    }).catch((error) => { client.logger.silly(`Error on fetching guild owner [${error}]`, { label: `guildCreate` }) })

    client.logger.info(`I have left a server **Server Name: ${guild.name}, Server Id: ${guild.id}, Member count: ${guild.memberCount}, Owner: ${guildOwner}, Owner Id: ${guildOwner.id}**`, { label: `guildDelete` })
}
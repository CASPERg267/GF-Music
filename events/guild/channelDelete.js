const { ChannelType } = require("discord.js");

module.exports = (client, channel) => {
    if (channel.type === ChannelType.GuildVoice) {
        if (channel.members.has(client.user.id)) {
            client.distube.getQueue(channel.guild)?.stop();
        }
    }
}
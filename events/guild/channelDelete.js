module.exports = (client, channel) => {
    if (channel.type === "GUILD_VOICE") {
        if (channel.members.has(client.user.id)) {
            const queue = client.distube.getQueue(channel.guild);
            queue.stop();
        }
    }
}
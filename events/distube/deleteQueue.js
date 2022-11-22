const { EmbedBuilder } = require("discord.js");

module.exports = (client, queue) => {

    if (!client.PlayerMap.has(`deleted-${queue.id}`)) {
        client.PlayerMap.set(`deleted-${queue.id}`, true);
    }
    clearInterval(client.playerintervals.get(`autoresumeinterval-${queue.id}`))
    if (client.autoresume.has(queue.id)) client.autoresume.delete(queue.id);
}
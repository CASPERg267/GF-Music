const { MessageEmbed } = require("discord.js");
const PlayerMap = new Map();
const playerintervals = new Map();

module.exports = (client, queue) => {

    if (!PlayerMap.has(`deleted-${queue.id}`)) {
        PlayerMap.set(`deleted-${queue.id}`, true);
    }
    clearInterval(playerintervals.get(`autoresumeinterval-${queue.id}`))
    if (client.autoresume.has(queue.id)) client.autoresume.delete(queue.id);
}
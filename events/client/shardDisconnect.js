module.exports = (client, event, id) => {
    client.logger.error(`[${String(new Date).split(" ", 5).join(" ")}] || ==> || Shard #${id} Disconnected`, { label: `Shard Disconnect` })
}
module.exports = (client, id) => {
    client.logger.info(`[${String(new Date).split(" ", 5).join(" ")}] || ==> || Shard #${id} Resumed`, { label: `Shard Resume` })
}

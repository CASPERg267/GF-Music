module.exports = (client, error, id) => {
    client.logger.error(`[${String(new Date).split(" ", 5).join(" ")}] || ==> || Shard #${id} Errored, Error: **[${error}]**`, { label: `Shard Error` })
}
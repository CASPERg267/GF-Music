module.exports = client => {
    client.logger.error(`[${client.user.username}] || Disconnected at ${new Date()}.`, { label: `Client Disconnect`});
}
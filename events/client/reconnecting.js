module.exports = client => {
    client.logger.info(`[${client.user.username}] || Reconnceting at ${new Date()}.`, { label: `Client Reconnecting` })
}
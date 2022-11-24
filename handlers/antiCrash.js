module.exports = (client) => {

    process.on('unhandledRejection', (reason, p) => {
        client.logger.error(`Unhandled Rejection, (${reason} ${p})`, { label: `Anti Crash Module` })

    });
    process.on("uncaughtException", (err, origin) => {
        client.logger.error(`Uncaught Exception, (${err} ${origin})`, { label: `Anti Crash Module` })

    })
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        client.logger.error(`Uncaught Exception Monitor, (${err} ${origin})`, { label: `Anti Crash Module` })

    });
    process.on('multipleResolves', (type, promise, reason) => {
        client.logger.error(`Multiple Resolves, (${type} ${promise} ${reason})`, { label: `Anti Crash Module` })

    });
}
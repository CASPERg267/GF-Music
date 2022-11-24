module.exports = (client) => {

    process.on('unhandledRejection', (reason, p) => {
        client.logger.error(`Unhandled Rejection, (${JSON.stringify(reason, p)})`, { label: `Anti Crash Module` })
        console.log(reason, p)

    });
    process.on("uncaughtException", (err, origin) => {
        client.logger.error(`Uncaught Exception, (${JSON.stringify(err, origin)})`, { label: `Anti Crash Module` })
        console.log(err, origin)

    })
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        client.logger.error(`Uncaught Exception Monitor, (${JSON.stringify(err, origin)})`, { label: `Anti Crash Module` })
        console.log(err, origin)
        
    });
    process.on('multipleResolves', (type, promise, reason) => {
        //client.logger.error(`Multiple Resolves, (${JSON.stringify(type, promise, reason)})`, { label: `Anti Crash Module` })

    });
}
module.exports = async (client, thread) => {
    if (thread.joinable) {
        try {
            await thread.join();
        } catch (e) {
            client.logger.error(`Something Went Wrong **[${e}]**`, { label: `threadCreate`})
        }
    }
}
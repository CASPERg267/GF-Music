const { readdirSync } = require("fs");
const delay = require("delay");

module.exports = async client => {
    try {
        readdirSync("./events/distube/").forEach(file => {
            const event = require(`../events/distube/${file}`);
            let eventName = file.split(".")[0];
            client.distube.on(eventName, event.bind(null, client));
        });
    } catch (e) {
        client.logger.error(`Something Went Wrong **[${e}]**`, { label: `Distube`})
    }
    await delay(4000);
    client.logger.info(`Distube Events Loaded`, { label: `Distube events` })
};
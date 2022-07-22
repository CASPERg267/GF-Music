const delay = require("delay");

module.exports = async (client, id) => { 
    await delay(2000); 
    client.logger.info(`[${String(new Date).split(" ", 5).join(" ")}] || ==> || Shard #${id} Ready`, { label: `Shard Ready`})
}
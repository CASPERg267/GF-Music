const logger = require('./structures/logger');
const { ShardingManager } = require('discord.js');
const config = require("./configs/config");

const manager = new ShardingManager('./index.js', {
    token: config.token,
    autoSpawn: true,
    totalShards: "auto" // leave it to auto if you want the recommended shards from discord.com
});

manager.on('shardCreate', shard => logger.info(`Launching Shard ${shard.id}`, { label: `Shard` }));
try {
    manager.spawn({ delay: 5500, timeout: 120000 });
} catch (e) {
    logger.error(`Something went wrong while spawning shards **[${e}]**`, { label: `Shard` })
}

if (config.topgg_token) {
    let { AutoPoster } = require('topgg-autoposter');
    let poster = AutoPoster(config.topgg_token, manager)

    poster.on('posted', () => {
        logger.info(`Posted stats to Top.gg!`, { label: `Top.gg Api` })
    })

}

if (config.statcord_token) {
    let Statcord = require("statcord.js");
    let statcord = new Statcord.ShardingClient({
        key: config.statcord_token,
        manager,
        postCpuStatistics: true, /* Whether to post CPU statistics or not, defaults to true */
        postMemStatistics: true, /* Whether to post memory statistics or not, defaults to true */
        postNetworkStatistics: true, /* Whether to post memory statistics or not, defaults to true */
        autopost: true /* Whether to auto post or not, defaults to true */
    });

    statcord.on("autopost-start", () => {
        // Emitted when statcord autopost starts
        logger.info(`Started autopost`, { label: `Statcord Api` })
    });

    statcord.on("post", status => {
        // status = false if the post was successful
        // status = "Error message" or status = Error if there was an error
        if (!status) return;
        else logger.error(`Error posting bot stats [${status}]`, { label: `Statcord Api` })
    });

}
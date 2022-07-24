const splintr = require('splintr');

module.exports = async (client) => {

  client.cpulist = cpu;
  client.logger.info(`${client.user.username} is now ready`, { label: `Ready` })

  if (client.config.dashboard.enabled) {
    if (!client.spawned) {
      client.dashboard.load(client);
    }
  }

  if (!client.shard) {
    splintr.proc(client.config.splintr.splintr_key, client.config.splintr.splintr_name, client, "Client")
  }

  let guilds = client.guilds.cache.size;
  let users = client.users.cache.size;

  const activities = [
    `${client.config.prefix}help | ${guilds} servers`,
    `${client.config.prefix}play | ${users} users`,
  ]

  setInterval(() => {
    client.user.setActivity(`${activities[Math.floor(Math.random() * activities.length)]}`, { type: 'WATCHING' });
  }, 35000)
}
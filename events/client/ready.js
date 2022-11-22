const { ActivityType } = require("discord.js");

module.exports = async (client) => {

  client.logger.info(`${client.user.username} is now ready`, { label: `Ready` })

  if (client.config.dashboard.enabled) {
    if (!client.spawned) {
      client.dashboard.load(client);
    }
  }

  let guilds = client.guilds.cache.size;
  let users = client.users.cache.size;

  const activities = [
    `${client.config.prefix}help | ${guilds} servers`,
    `${client.config.prefix}play | ${users} users`,
  ]

  setInterval(() => {
    client.user.setActivity(`${activities[Math.floor(Math.random() * activities.length)]}`, { type: ActivityType.Watching });
  }, Number(client.config.activityInterval) * 1000)
}
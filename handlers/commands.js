const { readdirSync } = require("fs");
const delay = require('delay');

module.exports = async client => {
  const load = dirs => {
    const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
    for (let file of commands) {
      let pull = require(`../commands/${dirs}/${file}`);
      client.commands.set(pull.name, pull);
      if (pull.aliases) pull.aliases.forEach(a => client.aliases.set(a, pull.name));
    };
  };
  ["music", "info", "owner"].forEach(x => load(x));
  await delay(4000);
  client.logger.info(`Commands Loaded`, { label: `Commands` });
};
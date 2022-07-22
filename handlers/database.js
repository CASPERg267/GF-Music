const Enmap = require("enmap");

module.exports = client => {
    client.settings = new Enmap({ name: "settings", dataDir: "./databases/settings", fetchAll: false });

    client.infos = new Enmap({ name: "infos", dataDir: "./databases/infos", fetchAll: false });

    client.autoresume = new Enmap({ name: "autoresume", dataDir: "./databases/infos", fetchAll: false });

    client.stats = new Enmap({ name: "stats", dataDir: "./databases/stats", fetchAll: false });

    client.stats.ensure("global", {
        commands: 0,
        songs: 0,
    });
}
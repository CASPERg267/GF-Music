const { EmbedBuilder } = require("discord.js");
const { databasing } = require("../../structures/functions");

module.exports = async (client, guild) => {
    if (!guild || guild.available === false) return;
    let guildOwner = "No owner data fetched";
    await guild.fetchOwner().then(({
        user
    }) => {
        guildOwner = user;
    }).catch((error) => { client.logger.silly(`Error on fetching guild owner [${error}]`, { label: `guildCreate` }) })

    databasing(client, guild.id)

    if (guild.systemChannel) {
        guild.systemChannel.send({
            embeds: [new EmbedBuilder()
                .setTitle(`Thanks for inviting me to your server! :blush: `)
                .setColor(client.config.embed.color)
                .setDescription(`Hello everyone, i am ${client.user.username} i can play songs from **(Youtube - SoundCloud - Spotify)**`)
                .addFields([{ name: `More info...`, value: `All of my commands are available in slash commands soon which is more better than usual commands, but these are available too soon, **my prefix is: ${client.config.prefix}**, if you have any issue or suggestion you can join our [Support Server](${client.config.support_server})` },
                { name: `Tip`, value: `to fully control me you can log in to my dashboard [here](${client.config.dashboard.domain}/guild/${guild.id})` }])
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
            ]
        })
    }
    client.logger.info(`I have joined a new server **Server Name: ${guild.name}, Server Id: ${guild.id}, Member count: ${guild.members.memberCount}, Owner: ${guildOwner}, Owner Id: ${guildOwner.id}**`, { label: `guildCreate`})
}
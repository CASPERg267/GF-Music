const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "playskip",
    description: "Plays a song from the source.",
    category: "music",

    run: async (client, message, args) => {
        const msg = await message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription("Processing.....")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        });
        
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send({
            embeds: [new MessageEmbed()
                .setDescription(`You have to be in voice channel first if you want to play something`)
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        })
        if (!message.guild.me.permissions.has(client.requiredVoicePermissions)) return
        msg.edit({
            embeds: [new MessageEmbed()
                .setDescription("I don't have perm `CONNECT` or `SPEAK` to execute command!")
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        });
        if (!message.guild.me.permissionsIn(channel).has(client.requiredVoicePermissions)) return msg.edit({
            embeds: [new MessageEmbed()
                .setDescription(`I don't have perm **[\`CONNECT\` or \`SPEAK\`]** in ${channel.name} to join voice!`)
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
        });

        const string = args.join(" ");
        if (!string) {
            return message.channel.send(new MessageEmbed()
                .setDescription(`Please provide a song name or link.`)
                .setColor(client.config.embed.color)
                .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon }));
        }

        const options = {
            member: message.member,
            textChannel: message.channel,
            message,
            skip: true
        }

        await client.distube.play(message.member.voice.channel, string, options);
    }
}
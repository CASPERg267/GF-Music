const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "join",
	aliases: ["summon"],
	description: "Makes the bot join the voice channel.",
	category: "music",

	run: async (client, message) => {
		const msg = await message.channel.send({
			embeds: [new MessageEmbed()
				.setDescription("Processing.....")
				.setColor(client.config.embed.color)
				.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
		});

		const { channel } = message.member.voice;
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

		const clientVoice = message.guild.me.voice.channel;
		const memberVoice = message.member.voice.channel;

		if (clientVoice) {
			if (clientVoice !== memberVoice) {
				const embed = new MessageEmbed()
					.setColor(client.config.embed.color)
					.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
					.setDescription(`You must be in my voice channel <#${message.guild.me.voice.channelId}>`);

				return msg.edit({ embeds: [embed] });
			} else {
				const embed = new MessageEmbed()
					.setColor(client.config.embed.color)
					.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
					.setDescription(`**I'm already on your voice channel**`);

				return msg.edit({ embeds: [embed] });
			}
		} else {
			if (memberVoice) {
				client.distube.voices.join(memberVoice)
					.then(voice => {
						const embed = new MessageEmbed()
							.setColor(client.config.embed.color)
							.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
							.setDescription(`**Joined \`${memberVoice.name}\`**`)

						msg.edit({ embeds: [embed] });
					})
					.catch(e => {
						console.log(e);
					})


			} else {
				const embed = new MessageEmbed()
					.setColor(client.config.embed.color)
					.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
					.setDescription(`**You must be in a voice channel!**`);

				return msg.edit({ embeds: [embed] });
			}
		}
	}
}
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "join",
	aliases: ["summon"],
	description: "Makes the bot join the voice channel.",
	category: "music",
	run: async (client, interaction) => {
		interaction.reply({
			embeds: [new MessageEmbed()
				.setDescription("Processing.....")
				.setColor(client.config.embed.color)
				.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
		});

		const { channel } = interaction.member.voice;
		if (!interaction.guild.me.permissions.has(client.requiredVoicePermissions))
			return interaction.editReply({
				embeds: [new MessageEmbed()
					.setDescription("I don't have perm `CONNECT` or `SPEAK` to execute command!")
					.setColor(client.config.embed.color)
					.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
			});
		if (!interaction.guild.me.permissionsIn(channel).has(client.requiredVoicePermissions)) return interaction.editReply({
			embeds: [new MessageEmbed()
				.setDescription(`I don't have perm **[\`CONNECT\` or \`SPEAK\`]** in ${channel.name} to join voice!`)
				.setColor(client.config.embed.color)
				.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })]
		});

		const clientVoice = interaction.guild.me.voice.channel;
		const memberVoice = interaction.member.voice.channel;

		if (clientVoice) {
			if (clientVoice !== memberVoice) {
				const embed = new MessageEmbed()
					.setColor(client.config.embed.color)
					.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
					.setDescription(`You must be in my voice channel <#${interaction.guild.me.voice.channelId}>`);

				return interaction.editReply({ embeds: [embed] });
			} else {
				const embed = new MessageEmbed()
					.setColor(client.config.embed.color)
					.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
					.setDescription(`**I'm already on your voice channel**`);

				return interaction.editReply({ embeds: [embed] });
			}
		} else {
			if (memberVoice) {
				client.distube.voices.join(memberVoice)
					.then(voice => {
						const embed = new MessageEmbed()
							.setColor(client.config.embed.color)
							.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
							.setDescription(`**Joined \`${memberVoice.name}\`**`)

						interaction.editReply({ embeds: [embed] });
					})
					.catch(e => {
						console.log(e);
					})
			} else {
				const embed = new MessageEmbed()
					.setColor(client.config.embed.color)
					.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
					.setDescription(`**You must be in a voice channel!**`);

				return interaction.editReply({ embeds: [embed] });
			}
		}
	}
}
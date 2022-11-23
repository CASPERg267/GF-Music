const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "join",
	aliases: ["summon"],
	description: "Makes the bot join the voice channel.",
	category: "music",
	checkers: {
        vc: true,
        queue: false,
        sVc: false,
        dj: false,
    },
	
	run: async (client, interaction, queue) => {
		
		const clientVoice = interaction.guild.members.me.voice.channel;
		const memberVoice = interaction.member.voice.channel;

		if (clientVoice) {
			if (clientVoice !== memberVoice) {
				const embed = new EmbedBuilder()
					.setColor(client.config.embed.color)
					.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
					.setDescription(`You must be in my voice channel <#${interaction.guild.members.me.voice.channelId}>`);

				return interaction.reply({ embeds: [embed] });
			} else {
				const embed = new EmbedBuilder()
					.setColor(client.config.embed.color)
					.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
					.setDescription(`**I'm already on your voice channel**`);

				return interaction.reply({ embeds: [embed] });
			}
		} else {
			if (memberVoice) {
				client.distube.voices.join(memberVoice)
					.then(voice => {
						const embed = new EmbedBuilder()
							.setColor(client.config.embed.color)
							.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
							.setDescription(`**Joined \`${memberVoice.name}\`**`)

						interaction.reply({ embeds: [embed] });
					})
					.catch(e => {
						console.log(e);
					})
			} else {
				const embed = new EmbedBuilder()
					.setColor(client.config.embed.color)
					.setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
					.setDescription(`**You must be in a voice channel!**`);

				return interaction.reply({ embeds: [embed] });
			}
		}
	}
}
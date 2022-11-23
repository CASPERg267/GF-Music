const { EmbedBuilder } = require("discord.js");
const pagequeue = require('../../structures/pagequeue');

module.exports = {
	name: "queue",
	aliases: ["q", "que"],
	description: "Diplay the queue",
	category: "music",
	checkers: {
        vc: true,
        queue: true,
        sVc: true,
        dj: false,
    },

	run: async (client, message, args, prefix, queue) => {

		const pagesNum = Math.ceil(queue.songs.length / 10);
		if (pagesNum === 0) pagesNum = 1;

		const qduration = queue.formattedDuration;

		const songStrings = [];
		for (let i = 1; i < queue.songs.length; i++) {
			const song = queue.songs[i];
			songStrings.push(`**${i}.** [${song.name}](${song.url}) \`[${song.formattedDuration}]\` • ${song.user}`);
		}

		const pages = [];
		for (let i = 0; i < pagesNum; i++) {
			const str = songStrings.slice(i * 10, i * 10 + 10).join('');
			const embed = new EmbedBuilder()
				.setAuthor({ name: `Queue - ${message.guild.name}`, iconURL: message.guild.iconURL({ dynamic: true }) })
				.setThumbnail(queue.songs[0].thumbnail)
				.setColor(client.config.embed.color)
				.setDescription(`**Currently Playing:**\n**[${queue.songs[0].name}](${queue.songs[0].url})** \`[${queue.songs[0].formattedDuration}]\` • ${queue.songs[0].user}\n\n**Rest of queue**${str == '' ? '  Nothing' : '\n' + str}`)
				.setFooter({ text: `Page • ${i + 1}/${pagesNum} | ${queue.songs.length} • Songs | ${queue.formattedDuration} • Total duration` });
			pages.push(embed);
		}

		if (!args[0]) {
			if (pages.length == pagesNum && queue.songs.length > 10) pagequeue(client, message, pages, 60000, queue.songs.length, qduration);
			else return message.reply({ embeds: [pages[0]] });
		}
		else {
			if (isNaN(args[0])) return message.reply({ content: 'Page must be a number.' });
			if (args[0] > pagesNum) return message.reply({ content: `There are only ${pagesNum} pages available.` });
			const pageNum = args[0] == 0 ? 1 : args[0] - 1;
			return message.reply({ embeds: [pages[pageNum]] });
		}
	}
}
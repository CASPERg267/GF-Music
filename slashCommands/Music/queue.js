const { EmbedBuilder, SelectMenuBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: "queue",
    description: "get a list of the current Queue",
    cooldown: 10,
    queue: true,

    run: async (client, interaction) => {
        try {
            const { channel } = interaction.member.voice;
            if (!channel) return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setDescription(`**Please join a Voice Channel First!**`)
                ],
                ephemeral: true
            })
            if (channel.guild.members.me.voice.channel && channel.guild.members.me.voice.channel.id != channel.id) {
                return interaction.reply({
                    embeds: [new EmbedBuilder()
                        .setColor(client.config.embed.color)
                        .setFooter({ text: client.config.embed.footer_text, iconURL: client.config.embed.footer_icon })
                        .setTitle(`Join my Voice Channel!`)
                        .setDescription(`<#${interaction.guild.members.me.voice.channel.id}>`)
                    ],
                    ephemeral: true
                });
            }
            try {
                let embeds = [];
                let k = 10;
                let theSongs = newQueue.songs;
                //defining each Pages
                for (let i = 0; i < theSongs.length; i += 10) {
                    let qus = theSongs;
                    const current = qus.slice(i, k)
                    let j = i;
                    const info = current.map((track) => `**${j++} -** [\`${String(track.name).replace(/\[/igu, "{").replace(/\]/igu, "}").substring(0, 60)}\`](${track.url}) - \`${track.formattedDuration}\``).join("\n")
                    const embed = new EmbedBuilder()
                        .setColor(client.config.embed.color)
                        .setDescription(`${info}`)
                    if (i < 10) {
                        embed.setTitle(`📑 **Top ${theSongs.length > 50 ? 50 : theSongs.length} | Queue of ${interaction.guild.name}**`)
                        embed.setDescription(`**(0) Current Song:**\n> [\`${theSongs[0].name.replace(/\[/igu, "{").replace(/\]/igu, "}")}\`](${theSongs[0].url})\n\n${info}`)
                    }
                    embeds.push(embed);
                    k += 10; //Raise k to 10
                }
                embeds[embeds.length - 1] = embeds[embeds.length - 1]
                    .setFooter({ text: `\n${theSongs.length} Songs in the Queue | Duration: ${newQueue.formattedDuration}`, iconURL: client.config.embed.footer_icon })
                let pages = []
                for (let i = 0; i < embeds.length; i += 3) {
                    pages.push(embeds.slice(i, i + 3));
                }
                pages = pages.slice(0, 24)
                const Menu = new SelectMenuBuilder()
                    .setCustomId("QUEUEPAGES")
                    .setPlaceholder("Select a Page")
                    .addOptions([
                        pages.map((page, index) => {
                            return {
                                label: `Page ${index}`,
                                value: index,
                                description: `Shows the ${index}/${pages.length - 1} Page!`
                            }
                            /*let Obj = {};
                            Obj.label = `Page ${index}`
                            Obj.value = `${index}`;
                            Obj.description = `Shows the ${index}/${pages.length - 1} Page!`
                            return Obj;*/
                        })
                    ])
                const row = new ActionRowBuilder()
                    .addComponents([Menu])
                interaction.reply({
                    embeds: [embeds[0]],
                    components: [row],
                    ephemeral: true
                });
                //Event
                client.on('interactionCreate', (i) => {
                    if (!i.isSelectMenu()) return;
                    if (i.customId === "QUEUEPAGES" && i.applicationId == client.user.id) {
                        i.reply({
                            embeds: pages[Number(i.values[0])],
                            ephemeral: true
                        }).catch(e => { })
                    }
                });
            } catch (e) {
                console.log(e)
            }
        } catch (e) {
            console.log(e)
        }
    }
}
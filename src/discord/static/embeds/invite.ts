import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, GuildMember, MessageActionRowComponentBuilder, MessageCreateOptions } from 'discord.js';

export function buildInviteManager(member: GuildMember): MessageCreateOptions {
  const embed = new EmbedBuilder()
    .setTitle(`Bienvenido a ${member.guild.name}`)
    .setDescription(`\`\`\`Para continuar con el proceso de configuración debes invitar al bot de administración al servidor.\`\`\``)
    .setImage('https://imgur.com/cRs7G8Q.png')
    .setColor(14947446);

  return {
    embeds: [embed],
    components: [
      new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
        new ButtonBuilder().setURL('https://discord.com/oauth2/authorize?client_id=1264016650034741258').setEmoji('🎆').setLabel('Invitar Bot').setStyle(ButtonStyle.Link)
      )
    ]
  };
}

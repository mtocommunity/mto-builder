import { Router } from 'express';
import client from '../../../discord/client';
import { TypeServer } from '../../../ts';
import { getTemplate } from '../../../database/functions';
import BuildProcess from '../../../database/models/build_process';

const server = Router();

// Create a server
server.post('/create', async (req, res) => {
  const name: string = req.body?.name;
  const type: TypeServer = req.body?.type;
  const template_id: string = req.body?.template;
  const creator_id: string = req.body?.creator_id;

  if (!name || !type || !template_id || !creator_id) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const template = await getTemplate(template_id);

  if (!template) {
    return res.status(404).json({ error: 'Template not found' });
  }

  const discordTemplate = await client.fetchGuildTemplate(template.discord_id);

  if (!discordTemplate) {
    return res.status(500).json({ error: 'Internal error: No template' });
  }

  if ((await client.guilds.fetch()).size >= 10) {
    return res.status(500).json({ error: 'Internal error: Max guild per bot' });
  }

  const guild = await discordTemplate.createGuild(name, client.user?.displayAvatarURL());

  if (!guild) {
    return res.status(500).json({ error: 'Internal error: Error to create guild' });
  }

  guild.invites
    .create(guild.channels.cache.first()?.id as string, { maxUses: 1, unique: true })
    .then(async (invite) => {
      await BuildProcess.create({
        type: type,
        template_id: template_id,
        creator_id: creator_id,
        guild_id: guild.id,
        completed_time: null
      });

      return res.json({ data: { guild_id: guild.id, invitation_link: invite.url } });
    })
    .catch((e) => {
      console.log(e);
      return res.status(500).json({ error: 'Internal error: Cannot create invitation' });
    });
});

export default server;

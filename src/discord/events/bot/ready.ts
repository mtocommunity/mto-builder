import BuildProcess from '../../../database/models/build_process';
import { DiscordEvent } from '../../../ts';

/**
 * This event is triggered when the bot is ready.
 */
const readyEvent: DiscordEvent = {
  name: 'ready',
  description: 'This event is triggered when the bot is ready.',
  run: (client) => {
    console.log(`Logged in as ${client.user?.tag}!`);

    // TODO: delete this
    client.guilds.fetch().then((guilds) => {
      console.log(`Fetched ${guilds.size} guilds`);
      guilds.forEach(async (guild) => {
        if (!guild.owner) {
          await client.guilds.cache.get(guild.id)?.leave();
          return;
        }

        const buildProcess = await BuildProcess.findOne({ where: { guild_id: guild.id } });

        if (!buildProcess || buildProcess.getDataValue('aborted')) {
          buildProcess?.set('completed_time', new Date());
          await buildProcess?.save();
          await client.guilds.cache.get(guild.id)?.delete();
          console.log(`Deleted guild ${guild.name} ${guild.id}`);
          return;
        }

        if (buildProcess.getDataValue('completed_time')) return;

        if (Date.now() - guild.createdAt.getTime() < 1000 * 60 * 5) return;

        buildProcess.set('completed_time', new Date());
        buildProcess.set('aborted', true);
        buildProcess.save();

        await client.guilds.cache.get(guild.id)?.delete();
        console.log(`Deleted guild ${guild.name} ${guild.id}`);
      });
    });
  }
};

export default readyEvent;

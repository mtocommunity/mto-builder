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
      guilds.forEach(async (guild) => {
        if (guild.owner && Date.now() - guild.createdAt.getTime() > 1000 * 60 * 5) {
          await client.guilds.cache.get(guild.id)?.delete();
          console.log(`Deleted guild ${guild.name} ${guild.id}`);
        }
      });
    });
  }
};

export default readyEvent;

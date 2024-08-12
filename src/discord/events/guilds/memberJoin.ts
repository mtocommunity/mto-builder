import { GuildMember } from 'discord.js';
import { DiscordEvent } from '../../../ts';
import Config from '../../../config';
import { abortBuildProcess, getBuildProcess } from '../../../database/functions';

/**
 * This event is triggered when the bot is ready.
 */
const readyEvent: DiscordEvent = {
  name: 'guildMemberAdd',
  description: 'This event is triggered when the bot is ready.',
  run: async (client, member: GuildMember) => {
    const guild = member.guild;

    const buildProcess = await getBuildProcess(guild.id);

    if (!buildProcess) return;

    // Check if the member is the creator of the build process
    if (member.user.id !== buildProcess.creator_id) {
      member.kick('The build process is running. Please try again later.');
      return;
    }

    // Check if the build process expired
    if (Date.now() - buildProcess.start_time.getTime() > Config.BUILD_PROCESS.MAX_TIME * 60 * 1000) {
      member.kick('The build process has expired. Please try again later.');
      return;
    }

    // Check if the build process is aborted
    if (buildProcess.aborted) {
      member.kick('The build process is aborted. Please try again later.');
      return;
    }

    // Check if the build process is completed
    if (buildProcess.completed_time) {
      await guild.leave();
      return;
    }
  }
};

export default readyEvent;

import { Guild, GuildMember, TextChannel } from 'discord.js';
import { DiscordEvent } from '../../../ts';
import Config from '../../../config';
import { abortBuildProcess, completeBuildProcess, getBuildProcess } from '../../../database/functions';
import Template from '../../../database/models/template';
import { buildInviteManager } from '../../static/embeds';

/**
 * This event is triggered when the bot is ready.
 */
const memberJoinEvent: DiscordEvent = {
  name: 'guildMemberAdd',
  description: 'This event is triggered when the bot is ready.',
  run: async (client, member: GuildMember) => {
    const guild = member.guild;

    const buildProcess = await getBuildProcess(guild.id);

    if (!buildProcess) return;

    if (member.user.id === Config.BUILD_PROCESS.MANAGER_ID) {
      try {
        // Move role of the manager to top // -1 because this count @everyone role
        await member.roles.highest.edit({ position: guild.roles.cache.size - 1 });

        // Set owner of the guild to the creator of the build process
        await guild.setOwner(buildProcess.creator_id);

        // Exit the guild
        await guild.leave();

        // Complete the build process
        await completeBuildProcess(guild.id);
      } catch {
        await abortBuildProcess(guild.id);

        if (guild.ownerId === client.user?.id) {
          await guild.delete();
        } else {
          await guild.leave();
        }
      }
      return;
    }

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

    const setupChannel = getSetUpChannel(guild, buildProcess.template);
    const staffRole = getStaffRole(guild, buildProcess.template);

    if (!setupChannel || !staffRole) {
      await abortBuildProcess(guild.id);
      await guild.delete();
      return;
    }

    await member.roles.add(staffRole);

    await setupChannel.send(buildInviteManager(member));
  }
};

function getSetUpChannel(guild: Guild, template: Template) {
  return guild.channels.cache.filter((channel) => channel.name === template.setup_channel_name).first() as TextChannel;
}

function getStaffRole(guild: Guild, template: Template) {
  return guild.roles.cache.filter((role) => role.name === template.staff_role_name).first();
}

export default memberJoinEvent;

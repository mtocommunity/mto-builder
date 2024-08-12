import { TypeServer } from '../../ts';
import BuildProcess from '../models/build_process';
import Template from '../models/template';

export async function getBuildProcess(guild_id: string): Promise<BuildProcess | null> {
  return await BuildProcess.findOne({
    where: { guild_id: guild_id },
    include: {
      model: Template,
      all: true,
      foreignKey: 'template_id'
    }
  });
}

export async function createBuildProcess({ type, template_id, creator_id, guild_id }: { type: TypeServer; template_id: string; creator_id: string; guild_id: string }): Promise<BuildProcess | null> {
  return await BuildProcess.create({
    type: type,
    template_id: template_id,
    creator_id: creator_id,
    guild_id: guild_id,
    completed_time: null
  });
}

export async function completeBuildProcess(guild_id: string): Promise<boolean> {
  return (await BuildProcess.update({ completed_time: new Date() }, { where: { guild_id: guild_id } }))[0] > 0;
}

export async function abortBuildProcess(guild_id: string): Promise<boolean> {
  return (await BuildProcess.update({ aborted: true, completed_time: new Date() }, { where: { guild_id: guild_id } }))[0] > 0;
}

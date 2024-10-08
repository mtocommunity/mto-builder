import { DataTypes, Model } from 'sequelize';
import { TypeServer } from '../../ts';

import Database from '../Database';
import Template from './template';

class BuildProcess extends Model {
  declare id: string;
  declare type: TypeServer;
  declare template_id: string;
  declare guild_id: string;
  declare creator_id: string;
  declare start_time: Date;
  declare aborted: boolean;
  declare completed_time: Date;
  declare template: Template;
}

BuildProcess.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: TypeServer.PEOJECT
    },
    template_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    guild_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    creator_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    aborted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    completed_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  { sequelize: Database, tableName: 'build_process', timestamps: false }
);

export default BuildProcess;

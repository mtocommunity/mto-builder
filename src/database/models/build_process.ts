import { DataTypes, Model } from 'sequelize';
import { TypeServer } from '../../ts';

import Database from '../Database';

class BuildProcess extends Model {
  declare id: string;
  declare type: TypeServer;
  declare template_id: string;
  declare creator_id: string;
  declare start_time: Date;
  declare completed_date: Date;
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
    creator_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    completed_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  { sequelize: Database, modelName: 'build_process', timestamps: false }
);

export default BuildProcess;

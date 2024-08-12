import { DataTypes, Model } from 'sequelize';

import Database from '../Database';

class Template extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
  declare discord_id: string;
}

Template.init(
  {
    id: {
      type: DataTypes.STRING(20),
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    discord_id: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  },
  {
    sequelize: Database,
    modelName: 'template',
    timestamps: false
  }
);

export default Template;

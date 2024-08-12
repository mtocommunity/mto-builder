import { DataTypes, Model } from 'sequelize';

import Database from '../Database';

class Template extends Model {
  declare id: string;
  declare name: string;
  declare description: string;
  declare discord_id: string;
  declare setup_channel_name: string;
  declare staff_role_name: string;
  declare member_role_name: string;
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
    },
    setup_channel_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    staff_role_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    member_role_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  },
  {
    sequelize: Database,
    tableName: 'template',
    timestamps: false
  }
);

export default Template;

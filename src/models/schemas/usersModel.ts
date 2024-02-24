import { DataTypes, Model } from 'sequelize';
import database from '../../connections/sequelize';

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  }
);

export default User;

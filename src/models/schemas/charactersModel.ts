import { DataTypes, Model } from 'sequelize';
import database from '../../connections/sequelize';

class CharacterModel extends Model {
  public idcharacters!: number;
  public name!: string;
  public gender!: string | null;
  public films!: string[];
  public species!: string[];
  public created!: Date;
  public edited!: Date;
}

CharacterModel.init(
  {
    idcharacters: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    films: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    species: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    edited: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'Character',
    tableName: 'characters',
    timestamps: false,
  }
);

export default CharacterModel;

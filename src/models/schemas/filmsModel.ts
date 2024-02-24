import { DataTypes, Model } from 'sequelize';
import database from '../../connections/sequelize';
import CharacterModel from './charactersModel';
import FilmCharacter from './filmcharactersModel';

class FilmModel extends Model {
  public idfilms!: number;
  public title!: string;
  public episode_id!: number;
  public opening_crawl!: string;
  public director!: string;
  public producer!: string;
  public release_date!: Date;
  public created!: Date;
  public edited!: Date;
  public url!: string;
}

FilmModel.init(
  {
    idfilms: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    episode_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    opening_crawl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    producer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    edited: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: database,
    modelName: 'Film',
    tableName: 'films',
    timestamps: false,
  }
);
FilmModel.belongsToMany(CharacterModel, {
  through: FilmCharacter,
  foreignKey: 'idfilms',
  otherKey: 'idcharacters',
  as: 'characters',
});

export default FilmModel;

import { DataTypes, Model } from 'sequelize';
import database from '../../connections/sequelize';
import Film from './filmsModel';
import Character from './charactersModel';

class FilmCharacter extends Model {
  public idfilms!: number;
  public idcharacters!: number;
}

FilmCharacter.init(
  {
    idfilms: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Film,
        key: 'idfilms',
      },
    },
    idcharacters: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Character,
        key: 'idcharacters',
      },
    },
  },
  {
    sequelize: database,
    modelName: 'FilmCharacter',
    tableName: 'film_characters',
    timestamps: false,
  }
);

export default FilmCharacter;

export type Character = {
  idcharacters: number;
  name: string;
  gender: string | null;
  films: string[];
  species: string[];
  created: Date;
  edited: Date;
};

export type CharacterApiResponse = {
  name: string;
  gender: string;
  species: string[];
};

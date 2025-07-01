export type Hobby = {
  id: string;
  color: string;
};

export type Cocktail = {
  name: string;
  fruitImage: string;
  fruitImageAlt: string;
  cocktailImage: string;
  cocktailImageAlt: string;
  description: string;
  ingredients: string[];
  backgroundColor: string;
};

export type Project = {
  name: string;
  projectImage: string;
  projectLink: string;
  description: string;
  stack: string[];
};

export type Song = {
  name: string;
  artist: string;
  album: string;
  songImage: string;
  spotifyUri: string;
  youtubeId: string;
};

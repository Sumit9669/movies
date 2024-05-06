type Genre =
  | 'Action'
  | 'Comedy'
  | 'Drama'
  | 'Fantasy'
  | 'Horror'
  | 'Romance'
  | 'SciFi';

export interface IUser {
  id: string;
  username: string;
  preferences: {
    favoriteGenres: Genre[];
    dislikedGenres: Genre[];
  };
  watchHistory: {
    contentId: string;
    watchedOn: Date;
    rating?: number;
  }[];
}
export interface IMovie {
  id: string;
  title: string;
  description: string;
  genres: string;
  releaseDate: Date;
  director: string;
  actors: string[];
}
export interface ITVShow {
  id: string;
  title: string;
  description: string;
  genres: string;
  episodes: {
    episodeNumber: number;
    seasonNumber: number;
    releaseDate: Date;
    director: string;
    actors: string[];
  }[];
}

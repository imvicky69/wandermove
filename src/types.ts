
export interface Movie {
  id: string;
  title: string;
  genre: Category;
  releaseDate: string; // YYYY-MM-DD for easy sorting
  description: string;
  posterUrl: string;
  watchUrl: string;
}

export enum SortOption {
  TITLE_ASC = 'title_asc',
  TITLE_DESC = 'title_desc',
  RELEASE_DATE_ASC = 'release_date_asc',
  RELEASE_DATE_DESC = 'release_date_desc',
}

export enum Category {
  ACTION = 'Action',
  COMEDY = 'Comedy',
  DRAMA = 'Drama',
  HORROR = 'Horror',
  SCIFI = 'Sci-Fi',
  ROMANCE = 'Romance',
  THRILLER = 'Thriller',
  ANIMATION = 'Animation',
  FANTASY = 'Fantasy',
}

export interface GeminiMovieInsights {
  tagline: string;
  funFact: string;
  similarMovieSuggestion: string;
}

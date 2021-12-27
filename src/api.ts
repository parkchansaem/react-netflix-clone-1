const API_KEY = "d20d691c4dcca268fa8e0c655d698616";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieNowPlaying {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export const handleMovieNowPlaying = async () => {
  const movieNowPlaying = await (await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)).json();
  return movieNowPlaying;
};

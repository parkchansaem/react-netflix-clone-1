const API_KEY = "d20d691c4dcca268fa8e0c655d698616";
const BASE_PATH = "https://api.themoviedb.org/3";

export const handleMovieNowPlaying = async () => {
  const movieNowPlaying = await (await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)).json();
  return movieNowPlaying;
};

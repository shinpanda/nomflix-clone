const API_KEY = "9cdc5568d6b2a14f55dd6786f4169b52";
const BASE_URL = "https://api.themoviedb.org/3/";
const language = "ko";

interface NowPlayingMovie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  popularity: string;
}

export interface NowPlayingMoviesResponse {
  page: number;
  results: NowPlayingMovie[];
  dates: {
    maximum: string;
    minimum: string;
  };
  total_pages: number;
  total_results: number;
}

export async function getNowPlayingMovies() {
  return await fetch(
    `${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=${language}&page=1`
  ).then((response) => response.json());
}

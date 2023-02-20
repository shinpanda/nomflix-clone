const API_KEY = "9cdc5568d6b2a14f55dd6786f4169b52";
const BASE_URL = "https://api.themoviedb.org/3/";
const language = "ko";

export interface Movie {
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

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface NowPlayingMoviesResponse extends MoviesResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
}

export async function getNowPlayingMovies() {
  return await fetch(
    `${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export async function getPopularMovies() {
  return await fetch(
    `${BASE_URL}movie/popular?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export async function getTopRatedMovies() {
  return await fetch(
    `${BASE_URL}movie/top_rated?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export async function getUpcomingMovies() {
  return await fetch(
    `${BASE_URL}movie/upcoming?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export interface TvShow {
  poster_path: string;
  popularity: number;
  id: number;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  name: string;
  original_name: string;
}

export interface TvShowsReponse {
  results: TvShow[];
  total_results: number;
  total_pages: number;
}

export async function getOnTheAirTvShows() {
  return await fetch(
    `${BASE_URL}tv/on_the_air?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export async function getAiringTodayTvShows() {
  return await fetch(
    `${BASE_URL}tv/airing_today?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export async function getPopularTvShows() {
  return await fetch(
    `${BASE_URL}tv/popular?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export async function getTopRatedTvShows() {
  return await fetch(
    `${BASE_URL}tv/top_rated?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

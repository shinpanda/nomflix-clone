import { useQueries, UseQueryResult } from "react-query";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  MoviesResponse,
} from "../api";
import { Banner, Loader, Overview, Title, Wrapper } from "../styles/PageStyles";
import { makeImagePath } from "../utils";
import MovieSlider from "./Slider";

function Home() {
  const responses = useQueries<MoviesResponse[]>([
    {
      queryKey: ["movies", "nowPlaying"],
      queryFn: getNowPlayingMovies,
      suspense: true,
    },
    {
      queryKey: ["movies", "popular"],
      queryFn: getPopularMovies,
      suspense: true,
    },
    {
      queryKey: ["movies", "topRated"],
      queryFn: getTopRatedMovies,
      suspense: true,
    },
    {
      queryKey: ["movies", "upComing"],
      queryFn: getUpcomingMovies,
      suspense: true,
    },
  ]) as UseQueryResult<MoviesResponse>[];
  const data = responses.map((response) => response.data);
  const isLoading = responses.some((res) => res.isLoading);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(data[0]?.results[0].backdrop_path || "")}
          >
            <Title>{data[0]?.results[0].title}</Title>
            <Overview>{data[0]?.results[0].overview}</Overview>
          </Banner>
          <MovieSlider
            title="Now Playing Movies"
            data={responses[0].data}
            key="nowPlaying"
          />
          <MovieSlider
            title="Popular Movies"
            data={responses[1].data}
            key="topRated"
          />
          <MovieSlider
            title="Top Rated Movies"
            data={responses[2].data}
            key="topRated"
          />
          <MovieSlider
            title="Upcoming Movies"
            data={responses[3].data}
            key="popular"
          />
        </>
      )}
    </Wrapper>
  );
}

export default Home;

import { useScroll } from "framer-motion";
import { useState } from "react";
import { useQueries, UseQueryResult } from "react-query";
import styled from "styled-components";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  MoviesResponse,
} from "../api";
import { makeImagePath } from "../utils";
import MovieSlider from "./Slider";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 3vh 6vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  color: ${(props) => props.theme.white.lighter};
`;

const Title = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-weight: 400;
`;

const Overview = styled.p`
  font-size: 15px;
  width: 50%;
`;

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

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { scrollY } = useScroll();
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

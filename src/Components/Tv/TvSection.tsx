import { useQueries, UseQueryResult } from "react-query";
import styled from "styled-components";
import {
  getAiringTodayTvShows,
  getOnTheAirTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
  TvShowsReponse,
} from "../../api";
import { makeImagePath } from "../../utils";
import TvSlider from "./TvSlider";

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

function TvSection() {
  const responses = useQueries([
    {
      queryKey: ["tvshows", "OnTheAir"],
      queryFn: getOnTheAirTvShows,
      suspense: true,
    },
    {
      queryKey: ["tvshows", "airingToday"],
      queryFn: getAiringTodayTvShows,
      suspense: true,
    },
    {
      queryKey: ["tvshows", "popular"],
      queryFn: getPopularTvShows,
      suspense: true,
    },
    {
      queryKey: ["tvshows", "topRated"],
      queryFn: getTopRatedTvShows,
      suspense: true,
    },
  ]) as UseQueryResult<TvShowsReponse>[];
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
            <Title>{data[0]?.results[0].name}</Title>
            <Overview>{data[0]?.results[0].overview}</Overview>
          </Banner>
          <TvSlider
            title="On The Air"
            data={responses[0].data}
            key="OnTheAir"
          />
          <TvSlider
            title="Airing Today"
            data={responses[1].data}
            key="airingToday"
          />
          <TvSlider
            title="Popular TvShows"
            data={responses[2].data}
            key="popular"
          />
          <TvSlider
            title="Popular TvShows"
            data={responses[3].data}
            key="topRated"
          />
        </>
      )}
    </Wrapper>
  );
}

export default TvSection;

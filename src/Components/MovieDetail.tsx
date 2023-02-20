import { motion } from "framer-motion";
import styled from "styled-components";
import { Movie } from "../api";
import { makeImagePath } from "../utils";

const MovieContainer = styled(motion.div)`
  position: absolute;
  width: 80vw;
  height: 100vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: black;
`;

const Cover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 1vh 3vw;
  font-size: 46px;
  font-weight: 400;
`;

const Detail = styled.div`
  padding: 30px;
  line-height: 2em;
`;

const Overview = styled.p`
  padding: 10px;
  color: ${(props) => props.theme.white.lighter};
  line-height: 1.5em;
`;

interface movieParam {
  clickedMovie: Movie;
  slideId: string;
}

function MovieDetail({ clickedMovie, slideId }: movieParam) {
  return (
    <MovieContainer layoutId={clickedMovie.id + slideId}>
      {clickedMovie && (
        <>
          <Cover
            style={{
              backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                clickedMovie.backdrop_path
              )})`,
            }}
          >
            <Title>{clickedMovie.title}</Title>
          </Cover>
          <Detail>
            <h4>개봉일</h4>
            <p>{clickedMovie.release_date}</p>
            {clickedMovie.overview ? (
              <>
                <h4>줄거리</h4>
                <Overview>{clickedMovie.overview}</Overview>
              </>
            ) : null}
          </Detail>
        </>
      )}
    </MovieContainer>
  );
}

export default MovieDetail;

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MoviesResponse } from "../api";
import { makeImagePath, offset } from "../utils";
import MovieDetail from "./MovieDetail";

const Container = styled.div`
  margin: 30px 0px;
`;

const Slider = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const ArrowButton = styled.button`
  font-size: 5vw;
  cursor: pointer;
`;

const SliderTitle = styled.h3`
  font-size: 25px;
  font-weight: bold;
  color: white;
  padding-left: 10px;
  margin-bottom: 10px;
`;

const Row = styled(motion.div)`
  display: inline-grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  width: 90vw;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  height: 200px;
  font-size: 66px;
  background-color: white;
  background: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 10,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 10,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

interface sliderParam {
  title: string;
  data?: MoviesResponse;
  key: string;
}

function MovieSlider({ title, data, key }: sliderParam) {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const onOverlayClick = () => navigate("/");

  const totalMovies = data ? data.results.length - 1 : 0;
  const maxIndex = Math.floor(totalMovies / offset) - 1;

  const decreaseIndex = () => {
    if (leaving) return;
    toggleLeaving();
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const increaseIndex = () => {
    if (leaving) return;
    toggleLeaving();
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === bigMovieMatch.params.movieId
    );

  return (
    <Container>
      <SliderTitle>{title}</SliderTitle>
      <Slider>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <ArrowButton as={MdArrowLeft} onClick={decreaseIndex} />
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "linear", duration: 0.3 }}
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  layoutId={movie.id + key}
                  key={movie.id}
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  onClick={() => onBoxClicked(movie.id)}
                  transition={{ type: "tween" }}
                  bgPhoto={makeImagePath(movie.poster_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
          <ArrowButton as={MdArrowRight} onClick={increaseIndex} />
        </AnimatePresence>
      </Slider>
      <AnimatePresence>
        {bigMovieMatch && clickedMovie ? (
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <MovieDetail clickedMovie={clickedMovie} slideId={key} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Container>
  );
}
export default MovieSlider;

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { TvShowsReponse } from "../../api";
import {
  ArrowButton,
  Box,
  Container,
  Info,
  Overlay,
  Row,
  Slider,
  SliderTitle,
} from "../../styles/SliderStyles";
import { makeImagePath, offsetState } from "../../utils";
import TvDetail from "./TvDetail";

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
  data?: TvShowsReponse;
  key: string;
}

function TvSlider({ title, data, key }: sliderParam) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (tvId: number) => {
    navigate(`/tv/${tvId}`);
  };
  const onOverlayClick = () => navigate("/tv");
  const [offset, setOffset] = useRecoilState(offsetState);

  const totalTvs = data ? data.results.length - 1 : 0;
  const maxIndex = Math.floor(totalTvs / offset) - 1;
  const matchItem = useMatch("/tv/:tvId");

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

  const clickedTv =
    matchItem?.params.tvId &&
    data?.results.find((tv) => String(tv.id) === matchItem.params.tvId);

  const handleOffset = () => {
    setOffset(Math.ceil(window.innerWidth / 240));
  };

  useEffect(() => {
    handleOffset();
    window.addEventListener("resize", handleOffset);
    return () => {
      window.removeEventListener("resize", handleOffset);
    };
  }, []);

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
            transition={{ type: "linear", duration: 0.1 }}
            key={index}
            offset={offset}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((tv) => (
                <Box
                  layoutId={tv.id + key}
                  key={tv.id}
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  onClick={() => onBoxClicked(tv.id)}
                  transition={{ type: "tween" }}
                  bgPhoto={makeImagePath(tv.poster_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{tv.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
          <ArrowButton as={MdArrowRight} onClick={increaseIndex} />
        </AnimatePresence>
      </Slider>
      <AnimatePresence>
        {matchItem && clickedTv ? (
          <Overlay
            onClick={onOverlayClick}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <TvDetail clickedTv={clickedTv} slideId={key} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Container>
  );
}
export default TvSlider;

import { motion } from "framer-motion";
import styled from "styled-components";

export const Container = styled.div`
  margin: 30px 0px;
`;

export const Slider = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const ArrowButton = styled.button`
  font-size: 5vw;
  cursor: pointer;
`;

export const SliderTitle = styled.h3`
  font-size: 25px;
  font-weight: bold;
  color: white;
  padding-left: 5vw;
  margin-bottom: 10px;
`;

export const Row = styled(motion.div)<{ offset: number }>`
  display: inline-grid;
  gap: 10px;
  grid-template-columns: repeat(${(props) => props.offset}, 1fr);
  width: 90vw;
`;

export const Box = styled(motion.div)<{ bgPhoto: string }>`
  width: 10vw;
  min-width: 150px;
  font-size: 66px;
  background-color: white;
  background: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  display: inline-flex;
  align-items: flex-end;
  aspect-ratio: 2/3;
`;

export const Info = styled(motion.div)`
  padding: 10px;
  opacity: 0;
  text-shadow: 1px 1px 2px black;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

import { motion } from "framer-motion";
import styled from "styled-components";

export const MovieContainer = styled(motion.div)`
  position: absolute;
  width: 80vw;
  max-width: 800px;
  height: 90vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 50%;
  transform: translate(0%, -50%);
  border-radius: 15px;
  overflow: hidden;
  background-color: black;
`;

export const Cover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 46px;
  font-weight: 400;
  padding-left: 3vw;
`;

export const Detail = styled.div`
  padding: 30px;
  line-height: 2em;
`;

export const DetailTitle = styled.h4`
  font-weight: 400;
`;

export const DetailItem = styled.p`
  padding: 10px;
  color: ${(props) => props.theme.white.lighter};
  line-height: 1.5em;
`;

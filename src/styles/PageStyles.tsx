import styled from "styled-components";

export const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 3vh 6vw;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  color: ${(props) => props.theme.white.lighter};
`;

export const Title = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 20px;
  font-weight: 400;
`;

export const Overview = styled.p`
  font-size: 15px;
  width: 50%;
`;

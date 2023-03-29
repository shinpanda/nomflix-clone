import { Movie } from "../../api";
import {
  Cover,
  Detail,
  DetailItem,
  DetailTitle,
  MovieContainer,
  Title,
} from "../../styles/DetailStyles";
import { makeImagePath } from "../../utils";

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
            <DetailTitle>개봉일</DetailTitle>
            <DetailItem>{clickedMovie.release_date}</DetailItem>
            {clickedMovie.overview ? (
              <>
                <DetailTitle>줄거리</DetailTitle>
                <DetailItem>{clickedMovie.overview}</DetailItem>
              </>
            ) : null}
          </Detail>
        </>
      )}
    </MovieContainer>
  );
}

export default MovieDetail;

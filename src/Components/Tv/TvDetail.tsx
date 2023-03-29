import { TvShow } from "../../api";
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
  clickedTv: TvShow;
  slideId: string;
}

function TvDetail({ clickedTv, slideId }: movieParam) {
  return (
    <MovieContainer layoutId={clickedTv.id + slideId}>
      {clickedTv && (
        <>
          <Cover
            style={{
              backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                clickedTv.backdrop_path
              )})`,
            }}
          >
            <Title>{clickedTv.name}</Title>
          </Cover>
          <Detail>
            {clickedTv.overview ? (
              <>
                <DetailTitle>줄거리</DetailTitle>
                <DetailItem>{clickedTv.overview}</DetailItem>
              </>
            ) : null}
          </Detail>
        </>
      )}
    </MovieContainer>
  );
}

export default TvDetail;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import InfoTab from "./Tab";
const Container = styled.div`
  @media only screen and (max-width: 600px) {
    padding: 20px 0px 0px 20px;
  }
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 90%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  @media only screen and (max-width: 600px) {
    width: 30%;
    height: 30%;
    max-height: 180px;
  }
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;
const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 20px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const DetailPresenter = ({ result, loading, error, tab }) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Sonflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      {console.log(tab)}
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Sonflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : "" //require(" ") image 동적으로 불러오기
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime || result.runtime === 0
                ? result.runtime
                : result.episode_run_time[0]}{" "}
              min
            </Item>
            <Divider>•</Divider>
            <Item>
              {/* 장르마다 한개씩 뽑아오는건데 마지막 요소만 뒤에 /를 빼고 출력 +++ map은 index를 가지고 올 수 있음 */}
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          {console.log("result: ", result)}
          <InfoTab result={result}></InfoTab>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;

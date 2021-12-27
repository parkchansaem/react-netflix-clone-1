import { useQuery } from "react-query";
import styled from "styled-components";
import { handleMovieNowPlaying, IMovieNowPlaying } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ backdropPath: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${(props) => props.backdropPath}) center center;
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Home = () => {
  const { isLoading, data } = useQuery<IMovieNowPlaying | undefined>(["movies", "nowPlaying"], handleMovieNowPlaying);
  console.log("isLoading, data", isLoading, data);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner backdropPath={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0]?.title}</Title>
            <Overview>{data?.results[0]?.overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
};

export default Home;

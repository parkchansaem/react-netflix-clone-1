import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ backdroppath: string }>`
  height: 200px;
  font-size: 26px;
  background: url(${(props) => props.backdroppath}) no-repeat center center;
  background-size: cover;
`;

const rowVariants = {
  initial: { x: window.outerWidth + 10 },
  animate: { x: 0, transition: { type: "tween", duration: 1 } },
  exit: { x: -window.outerWidth - 10, transition: { type: "tween", duration: 1 } },
};

const numberOfMovie = 6;

const Home = () => {
  const { isLoading, data } = useQuery<IMovieNowPlaying | undefined>(["movies", "nowPlaying"], handleMovieNowPlaying);
  console.log("isLoading, data", isLoading, data);

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const handleToggleLeaving = () => {
    setLeaving((current) => !current);
  };

  const handleIncreaseIndex = () => {
    if (leaving) {
      return;
    }

    if (data) {
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / numberOfMovie) - 1;
      console.log("totalMovies", totalMovies);
      console.log("maxIndex", maxIndex);

      handleToggleLeaving();
      setIndex((currentIndex) => (currentIndex === maxIndex ? 0 : currentIndex + 1));
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner onClick={handleIncreaseIndex} backdropPath={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0]?.title}</Title>
            <Overview>{data?.results[0]?.overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={handleToggleLeaving}>
              <Row key={index} variants={rowVariants} initial="initial" animate="animate" exit="exit">
                {data?.results
                  ?.slice(1)
                  .slice(numberOfMovie * index, numberOfMovie * index + numberOfMovie)
                  .map((movie) => (
                    <Box key={movie.id} backdroppath={makeImagePath(movie.backdrop_path, "w500")}></Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
};

export default Home;

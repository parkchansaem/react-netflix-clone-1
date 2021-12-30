import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router";
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

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  box-sizing: border-box;
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

const boxVariants = {
  initial: { scale: 1 },
  whileHover: { scale: 1.2, y: -30, transition: { type: "tween", delay: 0.3, duration: 0.3 } },
};

const rowVariants = {
  initial: { x: window.outerWidth + 10 },
  animate: { x: 0, transition: { type: "tween", duration: 1 } },
  exit: { x: -window.outerWidth - 10, transition: { type: "tween", duration: 1 } },
};

const infoVariants = {
  whileHover: { opacity: 1, transition: { type: "tween", delay: 0.3, duration: 0.3 } },
};

const numberOfMovie = 6;

const Home = () => {
  const history = useHistory();
  const movieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  console.log("movieMatch", movieMatch);

  const { isLoading, data } = useQuery<IMovieNowPlaying | undefined>(["movies", "nowPlaying"], handleMovieNowPlaying);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  console.log("isLoading, data", isLoading, data);

  const handleClickBox = (movieId: number) => {
    console.log("handleClickBox", movieId);
    history.push(`/movies/${movieId}`);
  };

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
                    <Box
                      layoutId={String(movie.id)}
                      key={movie.id}
                      onClick={() => handleClickBox(movie.id)}
                      variants={boxVariants}
                      initial="initial"
                      whileHover="whileHover"
                      transition={{ type: "tween" }}
                      backdroppath={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {movieMatch ? (
              <motion.div
                layoutId={movieMatch?.params?.movieId}
                style={{ position: "absolute", width: "40vw", height: "80vh", backgroundColor: "red", top: 50, left: 0, right: 0, margin: "0 auto" }}
              ></motion.div>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};

export default Home;

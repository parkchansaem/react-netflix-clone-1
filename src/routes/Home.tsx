import { AnimatePresence, motion, MotionValue, useViewportScroll } from "framer-motion";
import { url } from "inspector";
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
  box-sizing: border-box;
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const MovieBox = styled(motion.div)<{ scrolly: MotionValue<number> }>`
  position: absolute;
  top: ${(props) => props.scrolly.get() + 200}px;
  left: 0;
  right: 0;
  width: 50vw;
  height: 60vh;
  background-color: ${(props) => props.theme.black.lighter};
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const MovieCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const MovieTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const MovieOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
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
  const { scrollY } = useViewportScroll();
  const { isLoading, data } = useQuery<IMovieNowPlaying | undefined>(["movies", "nowPlaying"], handleMovieNowPlaying);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  console.log("data", data);

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

  const handleClickBox = (movieId: number) => {
    return history.push(`/movies/${movieId}`);
  };

  const handleClickOverlay = () => {
    return history.push("/");
  };

  console.log("movieMatch", movieMatch);

  const isClickedMovie = movieMatch?.params.movieId && data?.results.find((movie) => movie.id === +movieMatch?.params.movieId);
  console.log("isClickedMovie", isClickedMovie);

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
              <>
                <Overlay onClick={handleClickOverlay} animate={{ opacity: 1 }} exit={{ opacity: 0 }}></Overlay>
                <MovieBox layoutId={movieMatch?.params?.movieId} scrolly={scrollY}>
                  {isClickedMovie && (
                    <div>
                      <MovieCover style={{ backgroundImage: `linear-gradient(to top, black,transparent),  url(${makeImagePath(isClickedMovie.backdrop_path, "w500")})` }} />
                      <MovieTitle>{isClickedMovie.title}</MovieTitle>
                      <MovieOverview>{isClickedMovie.overview}</MovieOverview>
                    </div>
                  )}
                </MovieBox>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};

export default Home;

import { useQuery } from "react-query";
import { handleMovieNowPlaying } from "../api";

const Home = () => {
  const { isLoading, data } = useQuery(["movies", "nowPlaying"], handleMovieNowPlaying);
  console.log("isLoading, data", isLoading, data);

  return (
    <div style={{ backgroundColor: "whitesmoke", height: "500vh" }}>
      <h1>Home</h1>
    </div>
  );
};

export default Home;

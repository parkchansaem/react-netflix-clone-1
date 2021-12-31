import { useLocation } from "react-router";

const Search = () => {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const keywordValue = urlSearchParams.get("keyword");

  console.log("keywordValue", keywordValue);

  return (
    <div>
      <h1>Search</h1>
    </div>
  );
};

export default Search;

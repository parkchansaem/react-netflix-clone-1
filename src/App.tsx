import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import GlobalStyle from "./GlobalStyle";
import Home from "./routes/Home";
import Search from "./routes/Search";
import TV from "./routes/TV";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Header />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/tv">
            <TV />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </Routes>
    </>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import MovieCategory from "./pages/MovieCategory";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/popular" element={<MovieCategory category="popular" />} />
      <Route
        path="/now_playing"
        element={<MovieCategory category="now_playing" />}
      />
      <Route path="/upcoming" element={<MovieCategory category="upcoming" />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/detail/:movieId" element={<Detail />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

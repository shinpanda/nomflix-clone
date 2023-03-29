import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./Components/Error/NotFound";
import MovieSection from "./Components/Movie/MovieSection";
import SearchSection from "./Components/Search/SearchSection";
import TvSection from "./Components/Tv/TvSection";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <MovieSection />,
        children: [
          {
            path: "/movies/:movieId",
          },
        ],
      },
      {
        path: "tv",
        element: <TvSection />,
        children: [
          {
            path: "/tv/:tvId",
          },
        ],
      },
      {
        path: "search",
        element: <SearchSection />,
      },
    ],
  },
  {
    basename: process.env.PUBLIC_URL,
  },
]);

export default router;

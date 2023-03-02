import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./Components/Error/NotFound";
import Home from "./Components/Home";
import Search from "./Components/Search";
import Tv from "./Components/Tv";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "/movies/:movieId",
          },
        ],
      },
      {
        path: "tv",
        element: <Tv />,
      },
      {
        path: "search",
        element: <Search />,
      },
    ],
  },
  {
    basename: process.env.PUBLIC_URL,
  },
]);

export default router;

import { Routes, Route } from "react-router-dom";
import { Homepage, Error404, Watch, Playlists } from "./pages";
import TopNavbar from "./components/topNavbar";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const currTheme: string = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currTheme);
  }, []);

  return (
    <>
      <TopNavbar />
      <Routes>
        <Route
          path="/"
          element={<Homepage />}
        />
        <Route
          path="/watch"
          element={<Watch />}
        />
        <Route
          path="/playlists"
          element={<Playlists />}
        />
        <Route
          path="/*"
          element={<Error404 />}
        />
      </Routes>
    </>
  );
}

export default App;

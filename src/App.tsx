import { Routes, Route } from "react-router-dom";
import { Homepage, Error404, Watch, Playlists } from "./pages";
import TopNavbar from "./components/topNavbar";
import BottomNavbar from "./components/bottomNavbar";
import { useEffect } from "react";
import { getTheme, setTheme } from "./utils/toggleTheme";

function App() {
  useEffect(() => {
    setTheme(getTheme());
  }, []);

  return (
    <>
      <TopNavbar />
      <main className="my-4 mb-24 md:mb-8 px-2 sm:px-0 sm:w-5/6 mx-auto">
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
      </main>
      <div>
        <BottomNavbar />
      </div>
    </>
  );
}

export default App;

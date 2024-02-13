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
      <main className="my-4 w-5/6 sm:w-[600px] md:w-[768px] lg:w-[992px] xl:w-[1024px] mx-auto">
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

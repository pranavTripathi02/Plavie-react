import { useEffect, useState } from "react";
import Moon from "../assets/moon.svg?react";
import Sun from "../assets/sun.svg?react";
import Video from "../assets/video.svg?react";
import { getTheme, setTheme } from "../utils/toggleTheme";
import { Link } from "react-router-dom";
import useVideosContext from "../hooks/useVideosContext";
import useDebounce from "../hooks/useDebounce";

function TopNavbar() {
  const [currentTheme, setCurrentTheme] = useState(getTheme());
  const { setVideoSearch } = useVideosContext();
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search.toLowerCase());

  useEffect(() => {
    setVideoSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleThemeChange = () => {
    if (currentTheme === "dark") {
      setTheme("light");
      setCurrentTheme("light");
    } else {
      setTheme("dark");
      setCurrentTheme("dark");
    }
  };

  return (
    <nav className="flex justify-between py-4 px-2 sm:px-10 xl:px-20 items-center">
      {/* logo and nav links */}
      <div className="flex justify-between items-center gap-12">
        <Link to="/">
          <div className="logo flex gap-1 items-center text-[1.5rem]">
            <span className="hidden sm:inline-block">PLAYVIE</span>
            <Video
              strokeWidth={1}
              stroke={"var(--accent)"}
              width={32}
              height={32}
            />
          </div>
        </Link>
        {/* links */}
        <div className="hidden md:flex gap-6">
          <Link to="/">Explore</Link>
          <Link to="/playlists">Playlists</Link>
        </div>
      </div>
      {/* search bar */}
      <div className="search w-2/3 sm:w-1/2 xl:w-1/3">
        <input
          className="placeholder:italic placeholder:opacity-50 text-[var(--text)] focus:outline outline-2 outline-[var(--accent)] w-full rounded-full px-4 py-2 bg-[var(--secondary)]"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* theme toggle */}
      <button onClick={handleThemeChange}>
        {currentTheme === "dark" ? (
          <Sun
            height={32}
            width={32}
          />
        ) : (
          <Moon
            height={32}
            width={32}
          />
        )}
      </button>
    </nav>
  );
}

export default TopNavbar;

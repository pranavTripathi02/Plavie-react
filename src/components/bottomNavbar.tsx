import { useLocation, Link } from "react-router-dom";
import ExploreSVG from "../assets/explore.svg?react";
import PlaySVG from "../assets/play.svg?react";
import PlaylistsSVG from "../assets/playlists.svg?react";
import { useEffect, useState } from "react";
function BottomNavbar() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  useEffect(() => {
    console.log(location, location.pathname);
    setCurrentPath(location.pathname);
  }, [location]);
  return (
    <>
      <nav className="flex sm:hidden  justify-between w-full px-2 py-4 fixed">
        <Link
          to="/watch"
          className={`${
            currentPath == "/watch" ? "text-[var(--accent)]" : null
          }`}
        >
          <PlaySVG
            height={32}
            width={32}
          />
        </Link>
        <Link
          to="/"
          className={`${currentPath == "/" ? "text-[var(--accent)]" : null}`}
        >
          <ExploreSVG
            height={32}
            width={32}
          />
        </Link>
        <Link
          to="/playlists"
          className={`${
            currentPath == "/playlists" ? "text-[var(--accent)]" : null
          }`}
        >
          <PlaylistsSVG
            height={32}
            width={32}
          />
        </Link>
      </nav>
    </>
  );
}

export default BottomNavbar;

import { useLocation, Link } from "react-router-dom";
import ExploreSVG from "../assets/explore.svg?react";
import PlaySVG from "../assets/play.svg?react";
import PlaylistsSVG from "../assets/playlists.svg?react";
import { useEffect, useState } from "react";
function BottomNavbar() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);
  // console.log("hi");
  return (
    <>
      <nav className="flex md:hidden justify-between w-full px-16 py-4 fixed bottom-0 bg-[var(--bg)] z-20">
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

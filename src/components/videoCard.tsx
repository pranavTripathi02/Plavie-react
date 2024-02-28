import { Link } from "react-router-dom";
import { TVideo } from "../types";
import baseUrl from "../api/baseUrl";
// import useVideosContext from "../hooks/useVideosContext";
import PlaySVG from "../assets/play.svg?react";
import PlaylistAddSVG from "../assets/playlistAdd.svg?react";
import VerticalMenuDotsSVG from "../assets/verticalMenuDots.svg?react";
import { useState } from "react";

function VideoCard({
  videoInfo,
  handleShowPlaylistModal,
}: {
  videoInfo: TVideo;
  handleShowPlaylistModal: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const { thumb, title, subtitle, id } = videoInfo;
  // const { setCurrentVideo } = useVideosContext();
  // const handleVideo = () => {
  //   setCurrentVideo({ id });
  // };

  return (
    <Link
      to={`/watch?vid=${id}`}
      className="flex flex-col group/card"
      // onClick={handleVideo}
    >
      {/* video thumbnail */}
      <div className="mx-auto w-full h-full rounded-xl overflow-clip relative group">
        <img
          src={`${baseUrl}${thumb}`}
          alt={`Video thumbnail for video titled ${title}`}
          className="object-cover hover:scale-105 duration-300 mx-auto bg-black w-full"
          height={360}
          width={480}
        />
        <button
          className="hidden md:block absolute bottom-4 group-hover:translate-x-0 right-0 translate-x-full duration-300 hover:text-[var(--accent)] bg-[var(--secondary-2)] rounded-md flex w-fit flex-row px-4"
          onClick={(e) => {
            e.preventDefault();
            handleShowPlaylistModal();
          }}
          title="Add to playlist"
        >
          <div className="w-full h-fit flex shadow-2xl items-center gap-4">
            <span>Add to playlist</span>
            <PlaylistAddSVG
              height={32}
              width={32}
              aria-label="Add to playlist"
            />
          </div>
        </button>
      </div>
      <div className="flex flex-col group/title justify-between px-2 my-2">
        <div className="flex justify-between w-full ">
          <div>
            <h5 className="">{title}</h5>
            <span className="opacity-50">{subtitle}</span>
          </div>
          <button
            className="md:hidden relative md:group-hover/card:block"
            onClick={(e) => {
              e.preventDefault();
              setShowMenu((prev) => !prev);
            }}
            title="more option"
          >
            <VerticalMenuDotsSVG aria-label="more menu" />
            {showMenu && (
              <div
                onMouseLeave={() => setShowMenu(false)}
                className="absolute bg-[var(--secondary-2)] w-[200px] h-fit py-4 px-4 right-0 bottom-8 rounded-lg text-[var(--text)] flex flex-col justify-start text-left gap-4"
              >
                <Link
                  to={`/watch?vid=${id}`}
                  className="flex gap-4 border-b border-black pb-2 hover:text-[var(--accent)]"
                  // onClick={handleVideo}
                >
                  <PlaySVG
                    height={24}
                    width={24}
                    aria-label="Play"
                  />
                  Play
                </Link>
                <button
                  className="flex gap-4 hover:text-[var(--accent)]"
                  onClick={(e) => {
                    e.preventDefault();
                    handleShowPlaylistModal();
                  }}
                  title="Add to playlist"
                >
                  <PlaylistAddSVG
                    height={24}
                    width={24}
                    aria-label="Add to playlist"
                  />
                  Add to playlist
                </button>
              </div>
            )}
          </button>
        </div>
      </div>
      {/* video title */}
    </Link>
  );
}

export default VideoCard;

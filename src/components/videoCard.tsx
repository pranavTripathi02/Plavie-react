import { Link } from "react-router-dom";
import { TVideo } from "../types";
import baseUrl from "../api/baseUrl";
// import useVideosContext from "../hooks/useVideosContext";
import PlaylistAdd from "../assets/playlistAdd.svg?react";

function VideoCard({
  videoInfo,
  handleShowPlaylistModal,
}: {
  videoInfo: TVideo;
  handleShowPlaylistModal: () => void;
}) {
  const { thumb, title, id } = videoInfo;
  // const { setCurrentVideo } = useVideosContext();
  // const handleVideo = () => {
  //   setCurrentVideo({ id });
  // };

  return (
    <Link
      to={`/watch?vid=${id}`}
      className="flex flex-col hover:text-[var(--accent)] duration-300"
      // onClick={handleVideo}
    >
      {/* video thumbnail */}
      <div className="mx-auto w-full h-full rounded-xl overflow-clip relative group">
        <img
          src={`${baseUrl}${thumb}`}
          alt={`Video thumbnail for video titled ${title}`}
          className="object-cover hover:scale-105 duration-300"
        />
        <button
          className="absolute scale-0 group-hover:scale-100 bottom-4 right-4 text-white bg-black/50 rounded-lg"
          onClick={(e) => {
            e.preventDefault();
            handleShowPlaylistModal();
          }}
        >
          <PlaylistAdd
            height={48}
            width={48}
          />
        </button>
      </div>
      <div>
        <h5 className="px-2 my-2">{title}</h5>
      </div>
      {/* video title */}
    </Link>
  );
}

export default VideoCard;

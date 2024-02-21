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
          height={360}
          width={480}
        />
        <button
          className="hidden lg:block absolute scale-0 group-hover:scale-100 bottom-4 right-4 text-white bg-black/50 rounded-lg"
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
      <div className="flex flex-col justify-between px-2 my-2">
        <h5 className="">{title}</h5>
        <button
          className="lg:hidden block text-left flex gap-4"
          onClick={(e) => {
            e.preventDefault();
            handleShowPlaylistModal();
          }}
        >
          Add to playlist
          <PlaylistAdd
            height={24}
            width={24}
          />
        </button>
      </div>
      {/* video title */}
    </Link>
  );
}

export default VideoCard;

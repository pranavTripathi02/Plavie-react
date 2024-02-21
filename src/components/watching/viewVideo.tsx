import { useState } from "react";
import { TVideo } from "../../types";
import ChevronDown from "../../assets/chevronDown.svg?react";
import ChevronUp from "../../assets/chevronUp.svg?react";
import "./videoPlayer.css";
// import { useNavigate } from "react-router-dom";
import VideoPlayer from "./videoPlayer";
import PlaylistAddSVG from "../../assets/playlistAdd.svg?react";
import AddToPlaylistModal from "../addToPlaylistsModal";

function ViewVideo({
  video,
  handleVideoEnded,
}: {
  video: TVideo | undefined;
  handleVideoEnded: () => void;
}) {
  const [descIsActive, setDescIsActive] = useState(false);
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
  const handleShowPlaylistModal = () => {
    setShowAddToPlaylistModal((prev) => !prev);
  };

  return (
    <>
      <div className="pb-4 px-1 bg-black/20 rounded-xl w-full ">
        {/* black bg behind vid*/}
        {/* <div className="absolute z-[-1] w-screen left-0 top-0 bottom-0 border-2 bg-black" /> */}
        {video && (
          <>
            {showAddToPlaylistModal && (
              <AddToPlaylistModal
                videoId={video!.id}
                handleShowPlaylistModal={handleShowPlaylistModal}
              />
            )}
            <VideoPlayer
              video={video}
              handleVideoEnded={handleVideoEnded}
            />
            {/* meta */}
            <div>
              <h2>{video.title}</h2>
              <span className="my-20">{video.subtitle}</span>
              <div className="my-4 md:mx-8 md:float-right">
                <button
                  className="flex gap-4"
                  onClick={(e) => {
                    e.preventDefault();
                    handleShowPlaylistModal();
                  }}
                >
                  Add video to playlist
                  <PlaylistAddSVG
                    height={24}
                    width={24}
                  />
                </button>
              </div>
              <div
                className="flex mt-4 cursor-pointer select-none"
                onClick={() => setDescIsActive((prev) => !prev)}
              >
                <p>See video description</p>
                <h4>{descIsActive ? <ChevronUp /> : <ChevronDown />}</h4>
              </div>
              <div
                className={`duration-100 ${
                  descIsActive ? "translate-y-0" : "-translate-y-full"
                }`}
              >
                <span className={`${descIsActive ? "" : "hidden"}`}>
                  {video.description}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ViewVideo;

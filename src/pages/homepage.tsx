import { useState } from "react";
import VideoCard from "../components/videoCard";
import useVideosContext from "../hooks/useVideosContext";
import AddToPlaylistModal from "../components/addToPlaylistsModal";

function Homepage() {
  const { videosList } = useVideosContext();
  const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
  const [videoId, setVideoId] = useState<number | null>(null);
  // console.log(videosList);
  const handleShowPlaylistModal = () => {
    setShowAddToPlaylistModal((prev) => !prev);
  };
  return (
    <div>
      {showAddToPlaylistModal && (
        <AddToPlaylistModal
          videoId={videoId}
          handleShowPlaylistModal={handleShowPlaylistModal}
        />
      )}
      <h1>Explore</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {videosList.map((video) => (
          <div
            key={video.id}
            className="overflow-hidden w-full h-full relative"
          >
            <VideoCard
              videoInfo={video}
              handleShowPlaylistModal={() => {
                setVideoId(video.id);
                handleShowPlaylistModal();
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;

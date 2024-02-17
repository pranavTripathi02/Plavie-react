import usePlaylistContext from "../../hooks/usePlaylistContext";
import DraggableQueue from "../draggableQueue";

function NextUpQueue() {
  const { currentPlaylist } = usePlaylistContext();
  return (
    <div>
      {currentPlaylist ? (
        <div>
          <h5>Next up in {currentPlaylist?.playlistName}</h5>
          <DraggableQueue />
        </div>
      ) : (
        <h5>No playlist selected</h5>
      )}
    </div>
  );
}

export default NextUpQueue;

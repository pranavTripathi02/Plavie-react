import usePlaylistContext from "../../hooks/usePlaylistContext";
import DraggableQueue from "../draggableQueue";

function NextUpQueue() {
  const { currentPlaylist } = usePlaylistContext();
  return (
    <div>
      <h5>Next up in {currentPlaylist?.playlistName}</h5>
      <DraggableQueue />
    </div>
  );
}

export default NextUpQueue;

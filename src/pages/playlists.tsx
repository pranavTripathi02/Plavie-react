import { useNavigate } from "react-router-dom";
import usePlaylistContext from "../hooks/usePlaylistContext";
import DraggableQueue from "../components/draggableQueue";
// import UnderDevelopment from "./underDevelopment";

function Playlists() {
  const { playlists, currentPlaylist, setCurrentPlaylist } =
    usePlaylistContext();

  setCurrentPlaylist(null);
  const navigate = useNavigate();
  const handleChoosePlaylist = (playlistId: number) => {
    setCurrentPlaylist(
      playlists.find((playlist) => playlist.playlistId === playlistId) || null,
    );
    navigate(`/watch?playlist=${playlistId}`);
  };
  return (
    <div>
      <h1 className="mb-8">Playlists</h1>
      {currentPlaylist ? (
        <div className="flex">
          {/* {currentPlaylistVideos.map((video) => { */}
          <DraggableQueue />
        </div>
      ) : (
        playlists.map((playlist) => {
          return (
            <div
              key={playlist.playlistId}
              className="flex flex-col bg-[var(--secondary-2)] gap-4 px-4 py-2 rounded-xl cursor-pointer"
              onClick={() => handleChoosePlaylist(playlist.playlistId)}
            >
              {playlist.playlistName}
            </div>
          );
        })
      )}
    </div>
  );
}

export default Playlists;

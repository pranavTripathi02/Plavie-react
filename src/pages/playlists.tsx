import { useNavigate } from "react-router-dom";
import usePlaylistContext from "../hooks/usePlaylistContext";
import DraggableQueue from "../components/draggableQueue";
import { useState } from "react";
import { CreateNewPlaylist } from "../components/addToPlaylistsModal";
// import UnderDevelopment from "./underDevelopment";

function Playlists() {
  const { playlists, currentPlaylist, setCurrentPlaylist, addPlaylist } =
    usePlaylistContext();

  const [createNewPlaylist, setCreateNewPlaylist] = useState(false);
  const changeCreateNewPlaylistStatus = () => {
    setCreateNewPlaylist((prev) => !prev);
  };
  const handleAddNewPlaylist = (playlistName: string) => {
    if (!playlistName || playlistName.length < 1) return;
    addPlaylist({ playlistName });
    setCreateNewPlaylist(false);
  };
  setCurrentPlaylist(null);
  const navigate = useNavigate();
  const handleChoosePlaylist = (playlistId: number) => {
    setCurrentPlaylist(
      playlists.find((playlist) => playlist.playlistId === playlistId) || null,
    );
    navigate(`/watch?pid=${playlistId}&pidx=${currentPlaylist?.playlistIdx}`);
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
      {/* create new playlist */}
      <div className="w-full flex justify-end">
        <button
          className="mx-4 my-2 px-2 py-1 rounded-lg bg-[var(--secondary-2)]"
          onClick={changeCreateNewPlaylistStatus}
        >
          {createNewPlaylist ? "Cancel" : "Create new playlist"}
        </button>
        {createNewPlaylist && (
          <CreateNewPlaylist handleAddNewPlaylist={handleAddNewPlaylist} />
        )}
      </div>
    </div>
  );
}

export default Playlists;

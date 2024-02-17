// import { useNavigate } from "react-router-dom";
import usePlaylistContext from "../hooks/usePlaylistContext";
import DraggableQueue from "../components/draggableQueue";
import { useState } from "react";
import { CreateNewPlaylist } from "../components/addToPlaylistsModal";
import LeftArrowSVG from "../assets/leftArrow.svg?react";
// import UnderDevelopment from "./underDevelopment";

function Playlists() {
  const { playlists, currentPlaylist, setCurrentPlaylist, addPlaylist } =
    usePlaylistContext();

  const [createNewPlaylist, setCreateNewPlaylist] = useState(false);
  const [playlistView, setPlaylistView] = useState(false);

  const changeCreateNewPlaylistStatus = () => {
    setCreateNewPlaylist((prev) => !prev);
  };
  const handleAddNewPlaylist = (playlistName: string) => {
    if (!playlistName || playlistName.length < 1) return;
    addPlaylist({ playlistName });
    setCreateNewPlaylist(false);
  };
  // setCurrentPlaylist(null);
  // const navigate = useNavigate();
  const handleChoosePlaylist = (playlistId: number) => {
    const selectedPlaylist =
      playlists.find((playlist) => playlist.playlistId === playlistId) || null;
    setCurrentPlaylist(selectedPlaylist);
    setPlaylistView(true);
  };

  return (
    <div>
      <h1 className="mb-8">Playlists</h1>
      {playlistView && currentPlaylist ? (
        <div className="flex flex-col">
          <button
            className="flex gap-4"
            onClick={() => {
              setPlaylistView(false);
              // navigate(-1);
            }}
          >
            <LeftArrowSVG />
            <span>Back to playlists</span>
          </button>
          <DraggableQueue />
        </div>
      ) : (
        <div className="flex flex-col gap-4 mb-8">
          {playlists &&
            playlists.map((playlist) => {
              return (
                <div
                  key={playlist.playlistId}
                  className="flex flex-col bg-[var(--secondary-2)] gap-4 px-4 py-4 rounded-xl cursor-pointer hover:bg-[var(--secondary)]"
                  onClick={() => handleChoosePlaylist(playlist.playlistId)}
                >
                  {playlist.playlistName}
                </div>
              );
            })}
        </div>
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

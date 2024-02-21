// import { useNavigate } from "react-router-dom";
import usePlaylistContext from "../hooks/usePlaylistContext";
import DraggableQueue from "../components/draggableQueue";
import { useState } from "react";
import { CreateNewPlaylist } from "../components/addToPlaylistsModal";
import LeftArrowSVG from "../assets/leftArrow.svg?react";
import PencilSVG from "../assets/pencil.svg?react";
import TrashSVG from "../assets/trash.svg?react";
// import UnderDevelopment from "./underDevelopment";

function Playlists() {
  const {
    playlists,
    currentPlaylist,
    setCurrentPlaylist,
    addPlaylist,
    removePlaylist,
  } = usePlaylistContext();

  const [createNewPlaylist, setCreateNewPlaylist] = useState(false);
  const [playlistView, setPlaylistView] = useState(false);
  const [editPlaylistName, setEditPlaylistName] = useState(false);

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
    // console.log(playlists);
    const selectedPlaylist =
      playlists.find((playlist) => playlist.playlistId === playlistId) || null;
    setCurrentPlaylist(selectedPlaylist);
    setPlaylistView(true);
  };
  const handleEditPlaylist = () => {
    console.log("name");
  };
  const handleRemovePlaylist = (playlistId: number) => {
    removePlaylist(playlistId);
    setPlaylistView(false);
    setEditPlaylistName(false);
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
          <div className="px-4 flex justify-between">
            {editPlaylistName ? (
              <input
                type="text"
                className="bg-[var(--secondary)] my-4 p-2 rounded-xl"
                value={currentPlaylist.playlistName}
                onChange={(e) => {
                  currentPlaylist.playlistName = e.target.value;
                }}
              />
            ) : (
              <h3 className="my-4">{currentPlaylist.playlistName}</h3>
            )}
            <div className="flex gap-8">
              <button
                title="Edit Playlist"
                onClick={() => setEditPlaylistName((prev) => !prev)}
              >
                <PencilSVG />
              </button>
              <button
                title="Delete Playlist"
                onClick={() => handleRemovePlaylist(currentPlaylist.playlistId)}
              >
                <TrashSVG />
              </button>
            </div>
          </div>
          <DraggableQueue />
        </div>
      ) : (
        <div className="flex flex-col gap-4 mb-8">
          {playlists &&
            playlists.map((playlist) => {
              return (
                <div
                  key={playlist.playlistId}
                  className="flex bg-[var(--secondary-2)] gap-4 px-4 py-4 rounded-xl cursor-pointer hover:bg-[var(--secondary)]"
                  onClick={() => handleChoosePlaylist(playlist.playlistId)}
                >
                  <img
                    src={playlist.playlistThumb}
                    // srcSet=""
                    alt=""
                    height={120}
                    width={160}
                    onError={(e) => {
                      e.currentTarget.src;
                    }}
                  />
                  <h4>{playlist.playlistName}</h4>
                </div>
              );
            })}
        </div>
      )}
      {/* create new playlist */}
      {!playlistView && (
        <div className="w-full flex flex-col justify-start">
          {createNewPlaylist && (
            <CreateNewPlaylist handleAddNewPlaylist={handleAddNewPlaylist} />
          )}
          <button
            className="self-end mx-4 my-2 px-4 py-4 w-fit rounded-lg bg-[var(--secondary-2)]"
            onClick={changeCreateNewPlaylistStatus}
          >
            {createNewPlaylist ? "Cancel" : "Create new playlist"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Playlists;

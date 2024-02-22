import usePlaylistContext from "../hooks/usePlaylistContext";
import DraggableQueue from "../components/draggableQueue";
import { useState } from "react";
import { CreateNewPlaylist } from "../components/addToPlaylistsModal";
import LeftArrowSVG from "../assets/leftArrow.svg?react";
import PencilSVG from "../assets/pencil.svg?react";
import TrashSVG from "../assets/trash.svg?react";
import CheckSVG from "../assets/check.svg?react";

function Playlists() {
  const {
    playlists,
    currentPlaylist,
    setCurrentPlaylist,
    addPlaylist,
    removePlaylist,
    updatePlaylist,
  } = usePlaylistContext();

  const [createNewPlaylist, setCreateNewPlaylist] = useState(false);
  const [playlistView, setPlaylistView] = useState(false);
  const [editPlaylistName, setEditPlaylistName] = useState(false);
  const [playlistNewName, setPlaylistNewName] = useState<string | undefined>(
    "",
  );

  const changeCreateNewPlaylistStatus = () => {
    setCreateNewPlaylist((prev) => !prev);
  };
  const handleAddNewPlaylist = (playlistName: string) => {
    if (!playlistName || playlistName.length < 1) return;
    addPlaylist({ playlistName });
    setCreateNewPlaylist(false);
  };
  const handleChoosePlaylist = (playlistId: number) => {
    const selectedPlaylist =
      playlists.find((playlist) => playlist.playlistId === playlistId) || null;
    setCurrentPlaylist(selectedPlaylist);
    setPlaylistNewName(selectedPlaylist?.playlistName);
    setPlaylistView(true);
  };
  const handleEditPlaylist = () => {
    if (currentPlaylist && playlistNewName) {
      currentPlaylist.playlistName = playlistNewName;
      updatePlaylist({
        playlistId: currentPlaylist.playlistId,
        playlist: currentPlaylist,
      });
    }
    setEditPlaylistName(false);
  };
  const handleRemovePlaylist = (playlistId: number) => {
    removePlaylist(playlistId);
    setPlaylistView(false);
    setEditPlaylistName(false);
  };

  return (
    <div className="sm:w-[600px] md:w-[768px] lg:w-[992px] xl:w-[1024px] mx-auto">
      <h1 className="mb-8">Playlists</h1>
      {playlistView && currentPlaylist ? (
        <>
          {/* go back button */}
          <button
            className="flex gap-4 my-8"
            onClick={() => {
              setPlaylistView(false);
              // navigate(-1);
            }}
            title="back"
          >
            <LeftArrowSVG />
            <span>Back to playlists</span>
          </button>
          <div className="flex flex-col md:flex-row">
            {/* playlist info */}
            <div className="md:w-1/3 bg-gradient-to-b from-transparent from-30% to-[var(--accent)] to-99% ">
              <div className="px-4 flex justify-between">
                {editPlaylistName ? (
                  <input
                    type="text"
                    className="bg-[var(--secondary)] my-4 p-2 rounded-xl w-2/3"
                    value={playlistNewName}
                    onChange={(e) => setPlaylistNewName(e.target.value)}
                  />
                ) : (
                  <h3 className="my-4 overflow-hidden">
                    {currentPlaylist.playlistName}
                  </h3>
                )}
                <div className="flex gap-8">
                  {editPlaylistName ? (
                    <button
                      title="Save Playlist Name"
                      onClick={() => handleEditPlaylist()}
                    >
                      <CheckSVG />
                    </button>
                  ) : (
                    <button
                      title="Edit Playlist"
                      onClick={() => setEditPlaylistName((prev) => !prev)}
                    >
                      <PencilSVG />
                    </button>
                  )}
                  <button
                    title="Delete Playlist"
                    onClick={() =>
                      handleRemovePlaylist(currentPlaylist.playlistId)
                    }
                  >
                    <TrashSVG />
                  </button>
                </div>
              </div>
            </div>
            {/* playlist contents */}
            <div className="flex flex-col md:w-2/3">
              <DraggableQueue />
            </div>
          </div>
        </>
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
                    className="bg-transparent"
                    src={playlist.playlistThumb}
                    alt=""
                    height={120}
                    width={160}
                    onError={() => {
                      // console.log(e);
                      // e.currentTarget.height = 120;
                      // e.currentTarget.width = 120;
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
            title={` ${createNewPlaylist ? "Cancel" : "Create new playlist"} `}
          >
            {createNewPlaylist ? "Cancel" : "Create new playlist"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Playlists;

import usePlaylistContext from "../hooks/usePlaylistContext";
import CloseSVG from "../assets/close.svg?react";
import CheckSVG from "../assets/check.svg?react";
import { useState } from "react";
import { TPlaylist } from "../context/playlistContext";

export function CreateNewPlaylist({
  handleAddNewPlaylist,
}: {
  handleAddNewPlaylist: (str: string) => void;
}) {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  return (
    <div className="flex flex-col justify-start h-full mx-4 my-4 overflow-scroll w-full">
      <label
        htmlFor="newPlaylistName"
        className="mt-2"
      >
        Enter playlist name:
      </label>
      <form
        className="flex"
        action="#"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddNewPlaylist(newPlaylistName);
        }}
      >
        <input
          name="newPlaylistName"
          className="rounded-lg px-2 py-2 bg-[var(--secondary)] outline-none"
          placeholder="New playlist name"
          type="text"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
        />
        <button
          className="bg-[var(--text)] text-[var(--bg)] p-2 rounded-lg mx-2"
          type="submit"
        >
          <CheckSVG />
        </button>
      </form>
    </div>
  );
}

function AddToPlaylistModal({
  videoId,
  handleShowPlaylistModal,
}: {
  videoId: number | null;
  handleShowPlaylistModal: () => void;
}) {
  const { playlists, addPlaylist, updatePlaylist } = usePlaylistContext();
  const [createNewPlaylist, setCreateNewPlaylist] = useState(false);
  const changeCreateNewPlaylistStatus = () => {
    setCreateNewPlaylist((prev) => !prev);
  };

  const handleAddNewPlaylist = (playlistName: string) => {
    if (!playlistName || playlistName.length < 1) return;
    addPlaylist({ playlistName });
    setCreateNewPlaylist(false);
  };

  const handleAddVideoToPlaylist = (videoId: number, playlist: TPlaylist) => {
    if (!playlist.playlistContents) {
      playlist.playlistContents = [videoId];
    } else if (playlist.playlistContents.indexOf(videoId) > -1) {
      playlist.playlistContents = playlist.playlistContents.filter(
        (id) => id !== videoId,
      );
    } else {
      playlist.playlistContents.push(videoId);
    }
    updatePlaylist({ playlistId: playlist.playlistId, playlist });
  };

  return (
    <div className="relative h-full m-auto">
      <div
        className="fixed inset-0 w-screen h-screen bg-black/50 z-10"
        onClick={handleShowPlaylistModal}
      />
      <div className="fixed left-0 top-0 right-0 bottom-0 flex flex-col justify-between text-[var(--text)] h-2/5 lg:h-3/5 w-80 z-20 bg-[var(--bg)] rounded-xl m-auto">
        {/* add to playlist header */}
        <div className="flex mx-4 my-2 justify-between">
          <span>Add to playlist</span>
          <button onClick={handleShowPlaylistModal}>
            <CloseSVG />
          </button>
        </div>
        {/* playlists and checkboxes */}
        {/* create new playlist */}
        {createNewPlaylist ? (
          <CreateNewPlaylist handleAddNewPlaylist={handleAddNewPlaylist} />
        ) : (
          <div className="flex flex-col justify-start h-full mx-4 my-2 overflow-scroll">
            {playlists ? (
              playlists.map((playlist) => {
                const isVideoInPlaylist = playlist.playlistContents?.includes(
                  videoId || -1,
                );
                return (
                  <label
                    className="flex justify-between items-center border-b border-[var(--secondary)] mt-2 px-2 select-none"
                    key={playlist.playlistId}
                    htmlFor={playlist.playlistId.toString()}
                  >
                    <span>{playlist.playlistName}</span>
                    <input
                      id={playlist.playlistId.toString()}
                      className="appearance-none bg-[var(--secondary)] border-1 border-[var(--text)] h-4 w-4 checked:bg-[var(--accent)]"
                      type="checkbox"
                      // using math.random and defaultChecked instead of checked to rerended onchange
                      key={Math.random()}
                      defaultChecked={isVideoInPlaylist}
                      onChange={() => {
                        handleAddVideoToPlaylist(videoId!, playlist);
                      }}
                    />
                  </label>
                );
              })
            ) : (
              <span>You have not created any playlists</span>
            )}
          </div>
        )}
        {/* create new playlist */}
        <div className="w-full flex justify-end">
          <button
            className="me-4 my-2 px-2 py-1 rounded-lg border border-[var(--secondary-2)]"
            onClick={changeCreateNewPlaylistStatus}
          >
            {createNewPlaylist ? "Cancel" : "New playlist"}
          </button>
          <button
            className="me-4 my-2 px-2 py-1 rounded-lg bg-[var(--text)] text-[var(--secondary)]"
            onClick={handleShowPlaylistModal}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToPlaylistModal;

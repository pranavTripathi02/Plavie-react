import usePlaylistContext from "../hooks/usePlaylistContext";
import CloseSVG from "../assets/close.svg?react";
import CheckSVG from "../assets/check.svg?react";
import { useState } from "react";
// import useVideosContext from "../hooks/useVideosContext";
//
export function CreateNewPlaylist({
  handleAddNewPlaylist,
}: {
  handleAddNewPlaylist: (str: string) => void;
}) {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  return (
    <div className="flex flex-col justify-start h-full mx-4 my-4 overflow-scroll">
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
          className="bg-[var(--text)] p-2 rounded-lg mx-2"
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
  const { playlists, addPlaylist, changePlaylistContent } =
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

  const handleAddVideoToPlaylist = (videoId: number, playlistId: number) => {
    changePlaylistContent({
      videoId,
      playlistId,
    });
  };

  // const {} = useVideosContext()
  // console.log(videoId, playlists, addPlaylist);
  return (
    <div className="relative h-full m-auto">
      <div
        className="fixed inset-0 w-screen h-screen bg-black/50 z-10"
        onClick={handleShowPlaylistModal}
      />
      <div className="fixed left-0 top-0 right-0 bottom-0 flex flex-col justify-between text-white h-2/5 lg:h-3/5 w-80 z-20 bg-[var(--bg)] rounded-xl m-auto">
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
                      className="appearance-none bg-[var(--secondary)] h-4 w-4 checked:bg-[var(--accent)]"
                      type="checkbox"
                      // using math.random and defaultChecked instead of checked to rerended onchange
                      key={Math.random()}
                      defaultChecked={isVideoInPlaylist}
                      onChange={() => {
                        handleAddVideoToPlaylist(videoId!, playlist.playlistId);
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
            className="mx-4 my-2 px-2 py-1 rounded-lg bg-[var(--secondary-2)]"
            onClick={changeCreateNewPlaylistStatus}
          >
            {createNewPlaylist ? "Cancel" : "New playlist"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToPlaylistModal;

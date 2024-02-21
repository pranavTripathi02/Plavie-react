import { ReactNode, createContext, useEffect, useState } from "react";

export type TPlaylist = {
  playlistThumb?: string;
  playlistId: number;
  playlistIdx: number;
  playlistName: string;
  playlistContents: number[];
};
type TPlaylistContext = {
  currentPlaylist: TPlaylist | null;
  playlists: TPlaylist[];
  setCurrentPlaylist: React.Dispatch<React.SetStateAction<TPlaylist | null>>;
  addPlaylist: ({ playlistName }: { playlistName: string }) => void;
  removePlaylist: (playlistId: number) => void;
  updatePlaylist: ({
    playlistId,
    playlist,
  }: {
    playlistId: number;
    playlist: TPlaylist;
  }) => void;
};

const PlaylistContext = createContext<TPlaylistContext | null>(null);

function PlaylistContextProvider({ children }: { children: ReactNode }) {
  const [playlists, setPlaylists] = useState<TPlaylist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<TPlaylist | null>(
    null,
  );

  const updatePlaylist = ({
    playlistId,
    playlist,
  }: {
    playlistId: number;
    playlist: TPlaylist;
  }) => {
    const playlistFound = playlists.find(
      (playlist) => playlist.playlistId == playlistId,
    );
    if (!playlistFound) {
      throw new Error("Invalid playlist Id");
    } else {
      playlistFound.playlistName = playlist.playlistName;
      playlistFound.playlistIdx = playlist.playlistIdx;
      playlistFound.playlistThumb = playlist.playlistThumb;
      playlistFound.playlistContents = playlist.playlistContents;
    }
    updateLocalStoragePlaylist();
  };
  // add/remove videoid from existing playlist
  // const changePlaylistContent = ({
  //   videoId,
  //   playlistId,
  // }: {
  //   videoId: number;
  //   playlistId: number;
  // }) => {
  //   const playlist = playlists.find(
  //     (playlist) => playlist.playlistId === playlistId,
  //   );
  //   const videoFound = playlist?.playlistContents?.includes(videoId);
  //   if (!playlist) return;
  //   if (videoFound) {
  //     const newPlaylistContents = playlist.playlistContents!.filter(
  //       (id) => id !== videoId,
  //     );
  //     playlist.playlistContents = newPlaylistContents;
  //   } else {
  //     if (!playlist.playlistContents) {
  //       playlist.playlistContents = [videoId];
  //     } else {
  //       playlist?.playlistContents?.push(videoId);
  //     }
  //   }
  //   updateLocalStoragePlaylist();
  // };
  // add new playlist
  const addPlaylist = ({ playlistName }: { playlistName: string }) => {
    // console.log(playlistName);
    const newPlaylist: TPlaylist = {
      playlistId: Date.now(),
      playlistName,
      playlistIdx: 0,
      playlistContents: [],
    };
    // append new playlist to localstorage else, create new key
    if (playlists?.length) {
      setPlaylists([...playlists, newPlaylist]);
    } else {
      setPlaylists([newPlaylist]);
    }
    updateLocalStoragePlaylist();
  };
  // remove playlist
  const removePlaylist = (playlistId: number) => {
    const newPlaylists = playlists.filter(
      (playlist) => playlist.playlistId != playlistId,
    );
    setPlaylists(newPlaylists);
    updateLocalStoragePlaylist();
  };

  const updateLocalStoragePlaylist = () => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
  };

  useEffect(() => {
    const localStoragePlaylists = localStorage.getItem("playlists");
    // set state playlists as local storage playlists if they exist. Else, set null
    setPlaylists(
      localStoragePlaylists ? JSON.parse(localStoragePlaylists) : null,
    );
  }, []);

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        addPlaylist,
        removePlaylist,
        currentPlaylist,
        setCurrentPlaylist,
        updatePlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export { PlaylistContext, PlaylistContextProvider };

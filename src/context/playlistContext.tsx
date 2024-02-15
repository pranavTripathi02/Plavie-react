import { ReactNode, createContext, useEffect, useState } from "react";

type TPlaylist = {
  playlistId: number;
  playlistIdx: number;
  playlistName: string;
  playlistContents?: number[];
};
type TPlaylistContext = {
  currentPlaylist: Pick<TPlaylist, "playlistId"> | null;
  playlists: TPlaylist[];
  setCurrentPlaylist: React.Dispatch<
    React.SetStateAction<Pick<TPlaylist, "playlistId"> | null>
  >;
  addPlaylist: ({ playlistName }: { playlistName: string }) => void;
  changePlaylistContent: ({
    videoId,
    playlistId,
  }: {
    videoId: number;
    playlistId: number;
  }) => void;
};

const PlaylistContext = createContext<TPlaylistContext | null>(null);

function PlaylistContextProvider({ children }: { children: ReactNode }) {
  const [playlists, setPlaylists] = useState<TPlaylist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Pick<
    TPlaylist,
    "playlistId"
  > | null>(null);

  // add/remove videoid from existing playlist
  const changePlaylistContent = ({
    videoId,
    playlistId,
  }: {
    videoId: number;
    playlistId: number;
  }) => {
    const playlist = playlists.find(
      (playlist) => playlist.playlistId === playlistId,
    );
    const videoFound = playlist?.playlistContents?.includes(videoId);
    if (!playlist) return;
    if (videoFound) {
      const newPlaylistContents = playlist.playlistContents!.filter(
        (id) => id !== videoId,
      );
      playlist.playlistContents = newPlaylistContents;
    } else {
      if (!playlist.playlistContents) {
        playlist.playlistContents = [videoId];
      } else {
        playlist?.playlistContents?.push(videoId);
      }
    }
    updateLocalStoragePlaylist();
  };
  // add new playlist
  const addPlaylist = ({ playlistName }: { playlistName: string }) => {
    console.log(playlistName);
    const newPlaylist: TPlaylist = {
      playlistId: Date.now(),
      playlistName,
      playlistIdx: 0,
    };
    // append new playlist to localstorage else, create new key
    if (playlists?.length) {
      setPlaylists([...playlists, newPlaylist]);
    } else {
      setPlaylists([newPlaylist]);
    }
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
        currentPlaylist,
        setCurrentPlaylist,
        changePlaylistContent,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}

export { PlaylistContext, PlaylistContextProvider };

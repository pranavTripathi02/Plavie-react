import { ReactNode, createContext, useEffect, useState } from "react";
import { TVideo } from "../types";

type TPlaylist = {
  playlistId: number;
  playlistName: string;
  playlistContents?: [Pick<TVideo, "id">];
};
type TPlaylistContext = {
  playlists: TPlaylist[];
  addPlaylist: ({ playlist }: { playlist: TPlaylist }) => void;
};

const PlaylistContext = createContext<TPlaylistContext | null>(null);

function PlaylistProvider({ children }: { children: ReactNode }) {
  const [playlists, setPlaylists] = useState<TPlaylist[]>([]);

  const addPlaylist = ({ playlist }: { playlist: TPlaylist }) => {
    console.log(playlist);
    setPlaylists((prev) => [...prev, playlist]);
    localStorage.setItem("playlists", JSON.stringify([...playlists, playlist]));
  };

  useEffect(() => {
    const localStoragePlaylists = JSON.parse(
      localStorage.getItem("playlists") || "",
    ) as TPlaylist[];
    console.log(localStoragePlaylists);
    setPlaylists(localStoragePlaylists);
  }, []);

  return (
    <PlaylistContext.Provider value={{ playlists, addPlaylist }}>
      {children}
    </PlaylistContext.Provider>
  );
}

export { PlaylistContext, PlaylistProvider };

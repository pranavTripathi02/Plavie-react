import { useContext } from "react";
import { PlaylistContext } from "../context/playlistContext";

const usePlaylistContext = () => {
  const currentContext = useContext(PlaylistContext);
  if (!currentContext) {
    throw new Error("Error no context");
  }
  return currentContext;
};

export default usePlaylistContext;

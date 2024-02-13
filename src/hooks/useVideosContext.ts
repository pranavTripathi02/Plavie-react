import { useContext } from "react";
import { VideoContext } from "../context/videosContext";
const useVideosContext = () => {
  const currentContext = useContext(VideoContext);
  if (!currentContext) {
    throw new Error("Error no context");
  }
  return currentContext;
};

export default useVideosContext;

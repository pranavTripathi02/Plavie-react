import {
  useState,
  useEffect,
  ReactNode,
  createContext,
  SetStateAction,
} from "react";
import { TVideo } from "../types";
import mediaJSON from "../../videoList";

type TVideosContext = {
  videosList: TVideo[];
  currentVideo: Pick<TVideo, "id"> | null;
  setCurrentVideo: React.Dispatch<SetStateAction<Pick<TVideo, "id"> | null>>;
  videoSearch?: string;
  setVideoSearch: React.Dispatch<SetStateAction<string | undefined>>;
};

const VideoContext = createContext<TVideosContext | null>(null);

function VideoContextProvider({ children }: { children: ReactNode }) {
  const [videosList, setVideosList] = useState<TVideo[]>([]);
  const [currentVideo, setCurrentVideo] = useState<Pick<TVideo, "id"> | null>(
    null,
  );

  // video search term for filtering
  const [videoSearch, setVideoSearch] = useState<string | undefined>();

  // we are using local data; else need to make api call
  const fetchVideos = () => {
    setVideosList(mediaJSON);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <VideoContext.Provider
      value={{
        videoSearch,
        videosList,
        currentVideo,
        setCurrentVideo,
        setVideoSearch,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export { VideoContext, VideoContextProvider };

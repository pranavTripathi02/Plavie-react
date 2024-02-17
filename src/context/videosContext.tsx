import {
  useState,
  useEffect,
  ReactNode,
  createContext,
  SetStateAction,
} from "react";
import { TVideo } from "../types";
import mediaJSON from "../../videoList";

type TVideoMeta = {
  id: number;
  timestamp: number;
};

type TVideosContext = {
  videoList: TVideo[];
  // currentVideo: Pick<TVideo, "id"> | null; // for in the case of non-url based video playing
  // setCurrentVideo: React.Dispatch<SetStateAction<Pick<TVideo, "id"> | null>>;
  videoSearch: string;
  setVideoSearch: React.Dispatch<SetStateAction<string>>;
  videoMeta: TVideoMeta[] | null;
  handleUpdateVideoMeta: (videoId: number, timestamp: number) => void;
};

const VideoContext = createContext<TVideosContext | null>(null);

function VideoContextProvider({ children }: { children: ReactNode }) {
  const [videoList, setVideoList] = useState<TVideo[]>([]);
  const [videoMeta, setVideoMeta] = useState<TVideoMeta[] | null>(null);
  // const [currentVideo, setCurrentVideo] = useState<Pick<TVideo, "id"> | null>(
  //   null,
  // );
  //
  const handleUpdateVideoMeta = (videoId: number, timestamp: number) => {
    const newData: TVideoMeta = { id: videoId, timestamp };
    // console.log(newData, videoMeta);
    if (videoMeta) {
      const newVideoMeta = videoMeta.find((item) => item.id === videoId);
      if (newVideoMeta) {
        newVideoMeta!.timestamp = timestamp;
      } else {
        videoMeta.push(newData);
        // setVideoMeta([...videoMeta, newData]);
      }
      localStorage.setItem("videoMeta", JSON.stringify(videoMeta));
    } else {
      setVideoMeta([newData]);
      localStorage.setItem("videoMeta", JSON.stringify([newData]));
    }
  };

  // video search term for filtering
  const [videoSearch, setVideoSearch] = useState<string>("");

  // we are using local data; else need to make api call
  const fetchVideos = () => {
    setVideoList(mediaJSON);
  };

  const fetchVideoMeta = () => {
    const localMeta = localStorage.getItem("videoMeta");
    if (localMeta) {
      setVideoMeta(JSON.parse(localMeta));
    }
  };

  useEffect(() => {
    fetchVideos();
    fetchVideoMeta();
  }, []);

  return (
    <VideoContext.Provider
      value={{
        videoSearch,
        videoList,
        // currentVideo,
        // setCurrentVideo,
        setVideoSearch,
        videoMeta,
        handleUpdateVideoMeta,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
}

export { VideoContext, VideoContextProvider };

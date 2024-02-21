import { useNavigate, useSearchParams } from "react-router-dom";
import useVideosContext from "../hooks/useVideosContext";
import { useState } from "react";
// import { TVideo } from "../types";
import {
  NextUpQueue,
  SuggestedVideos,
  ViewVideo,
} from "../components/watching";
import usePlaylistContext from "../hooks/usePlaylistContext";
import { Error404 } from ".";
import { TVideo } from "../types";

function Watch() {
  const [autoPlay, setAutoPlay] = useState(true);
  const { videoList, handleUpdateVideoMeta } = useVideosContext();
  const { playlists, setCurrentPlaylist, currentPlaylist } =
    usePlaylistContext();
  const [params] = useSearchParams();
  const videoId = parseInt(params.get("vid") || "");
  const playlistId = parseInt(params.get("pid") || "");
  const playlistIdx = parseInt(params.get("pidx") || "");

  // should be done async-ly w/ db
  let videoSelected: TVideo | undefined;
  // priority -> videoId > playlistId
  if (videoId) {
    videoSelected = videoList.find(({ id }) => id === videoId);
    if (videoSelected) {
      setCurrentPlaylist(null);
    }
  } else if (playlistId) {
    const playlistFound = playlists.find(
      (playlist) => playlist.playlistId === playlistId,
    );
    if (playlistFound) {
      setCurrentPlaylist(playlistFound);
      if (playlistIdx !== undefined && playlistIdx > -1) {
        videoSelected = videoList.find(
          (video) =>
            video.id === playlistFound.playlistContents[playlistIdx] ||
            video.id === playlistFound.playlistContents[0],
        );
      } else {
        videoSelected =
          videoList[
            playlistFound.playlistContents
              ? playlistFound.playlistContents[0]
              : 0
          ];
      }
    }
  }

  const navigate = useNavigate();
  const handleVideoEnded = () => {
    if (videoSelected) {
      handleUpdateVideoMeta(videoSelected.id, 0);
    }
    if (currentPlaylist && autoPlay) {
      currentPlaylist.playlistIdx =
        (currentPlaylist.playlistIdx + 1) %
        currentPlaylist.playlistContents!.length;
      navigate(
        `/watch?pid=${currentPlaylist.playlistId}&pidx=${currentPlaylist.playlistIdx}`,
      );
    }
  };

  return (
    <div>
      {/* main video player */}
      {videoSelected ? (
        <>
          <div>
            <ViewVideo
              video={videoSelected}
              handleVideoEnded={handleVideoEnded}
            />
          </div>
          <hr className="border-t border-black my-4" />
          <div className="md:flex w-full">
            {/* playlist queue */}
            <div className="md:w-2/3">
              <div className="mt-4 mr-2">
                <label className="flex items-center mb-5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="appearance-none peer"
                    checked={autoPlay}
                    onChange={() => setAutoPlay((prev) => !prev)}
                  />
                  <div className="relative w-9 h-5 bg-gray-500 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-textSecondary">
                    Autoplay
                  </span>
                </label>
              </div>
              {/* <div className="relative flex items-center w-8 rounded-full cursor-pointer"> */}
              {/*   <label className="flex gap-4"> */}
              {/*     <span>Autoplay</span> */}
              {/*     <input */}
              {/*       type="checkbox" */}
              {/*       className="border-2 w-4 cursor-pointer outline-none" */}
              {/*       checked={autoPlay} */}
              {/*       onChange={() => setAutoPlay((prev) => !prev)} */}
              {/*     /> */}
              {/*   </label> */}
              {/* </div> */}
              <NextUpQueue />
            </div>
            <hr className="border-r border-black h-full mx-4" />
            {/* suggested videos */}
            <div className="md:w-1/3">
              <SuggestedVideos />
            </div>
          </div>
        </>
      ) : (
        <Error404 />
      )}
    </div>
  );
}

export default Watch;

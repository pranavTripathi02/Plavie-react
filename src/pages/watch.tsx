import { useSearchParams } from "react-router-dom";
import useVideosContext from "../hooks/useVideosContext";
// import { useState } from "react";
// import { TVideo } from "../types";
import {
  VideoPlayer,
  NextUpQueue,
  SuggestedVideos,
} from "../components/watching";
import usePlaylistContext from "../hooks/usePlaylistContext";

function Watch() {
  const { videosList } = useVideosContext();
  const { playlists, setCurrentPlaylist, currentPlaylist } =
    usePlaylistContext();
  const [params] = useSearchParams();
  const videoId = parseInt(params.get("vid") || "");
  const playlistId = parseInt(params.get("pid") || "");
  const playlistIdx = parseInt(params.get("pidx") || "");
  // console.log(videoId, currentPlaylist, playlistId);

  let videoSelected;
  if (playlistId && playlistIdx && !videoId) {
    videoSelected = videosList.find(({ id }) => id === videoId);
  } else if (playlistId && videoId) {
    videoSelected = videosList.find(({ id }) => id === videoId);
  } else if (!playlistId && videoId) {
    videoSelected = videosList.find(({ id }) => id === videoId);
  }
  if (currentPlaylist) {
    if (!playlistId) {
      params.set("pid", currentPlaylist.playlistId.toString());
    }
  } else {
    const playlistSelected = playlists.find(
      (playlist) => playlist.playlistId === playlistId,
    );
    if (playlistSelected) {
      setCurrentPlaylist(playlistSelected);
    }
  }
  // if (videoId) {
  //   const videoFound = videosList.find(({ id }) => id === videoId);
  //   if (videoFound) setVideoSelected(videoFound);
  // }
  // console.log(videoId, videoSelected);
  // if (!videoId || !videoSelected) {
  //   return <div>No video playing</div>;
  // }

  return (
    <div>
      {/* main video player */}
      <div>
        <VideoPlayer video={videoSelected} />
      </div>
      <hr className="border-t border-black my-4" />
      <div className="md:flex w-full">
        {/* playlist queue */}
        <div className="md:w-2/3">
          <NextUpQueue />
        </div>
        <hr className="border-r border-black h-full mx-4" />
        {/* suggested videos */}
        <div className="md:w-1/3">
          <SuggestedVideos />
        </div>
      </div>
    </div>
  );
}

export default Watch;

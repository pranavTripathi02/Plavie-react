import { useSearchParams } from "react-router-dom";
import useVideosContext from "../hooks/useVideosContext";
// import { useState } from "react";
// import { TVideo } from "../types";
import {
  NextUpQueue,
  SuggestedVideos,
  ViewVideo,
} from "../components/watching";
import usePlaylistContext from "../hooks/usePlaylistContext";

function Watch() {
  const { videoList } = useVideosContext();
  const { playlists, setCurrentPlaylist, currentPlaylist } =
    usePlaylistContext();
  const [params] = useSearchParams();
  const videoId = parseInt(params.get("vid") || "");
  const playlistId = parseInt(params.get("pid") || "");
  const playlistIdx = parseInt(params.get("pidx") || "");

  // should be done async-ly w/ db
  let videoSelected = videoList.find(({ id }) => id === videoId);
  // priority -> videoId > playlistId > playlistIdx
  if (videoId && currentPlaylist) {
    videoSelected = videoList.find(({ id }) => id === videoId);
    if (
      videoSelected &&
      currentPlaylist.playlistContents?.includes(videoSelected?.id)
    ) {
      currentPlaylist.playlistIdx = currentPlaylist.playlistContents.indexOf(
        videoSelected?.id,
      );
      setCurrentPlaylist(currentPlaylist);
    }
    // remove invalid vid
    // if (!videoSelected) {
    //   params.delete("vid");
    // }
    // remove pid and pidx if video not included in that playlist
    // else if (!currentPlaylist.playlistContents?.includes(videoSelected?.id)) {
    //   params.delete("pid");
    //   params.delete("pidx");
    // }
  } else if (!videoId && currentPlaylist) {
    if (playlistIdx) {
      videoSelected =
        videoList[
          currentPlaylist.playlistContents
            ? currentPlaylist.playlistContents[playlistIdx]
            : 0 || 0
        ];
    } else {
      videoSelected =
        videoList[
          currentPlaylist.playlistContents
            ? currentPlaylist.playlistContents[0]
            : 0
        ];
    }
  }
  // update current playlist based on url parameter
  if (playlistId) {
    const playlistFromUrl = playlists.find(
      (playlist) => playlist.playlistId === playlistId,
    );
    if (
      (!currentPlaylist && playlistFromUrl) ||
      currentPlaylist?.playlistId != playlistFromUrl?.playlistId
    ) {
      setCurrentPlaylist(playlistFromUrl!);
    } else if (!currentPlaylist && !playlistFromUrl) {
      setCurrentPlaylist(null);
    }
  }

  if (currentPlaylist) {
    if (!playlistId) {
      params.set("pid", currentPlaylist.playlistId.toString());
    }
  } else if (playlistId) {
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
        <ViewVideo video={videoSelected} />
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

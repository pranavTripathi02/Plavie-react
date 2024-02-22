import { useEffect, useRef, useState } from "react";
import { TVideo } from "../../types";

import PlaySVG from "../../assets/play.svg?react";
import PauseSVG from "../../assets/pause.svg?react";
import FullscreenMaxSVG from "../../assets/fullscreen-max.svg?react";
import FullscreenMinSVG from "../../assets/fullscreen-min.svg?react";
import VolumeSVG from "../../assets/volume.svg?react";
import VolumeMutedSVG from "../../assets/volumeMuted.svg?react";
import GaugeSVG from "../../assets/gauge.svg?react";
// import LoopSVG from "../../assets/loop.svg?react";
import timeFormat from "../../utils/timeFormat";
import useVideosContext from "../../hooks/useVideosContext";

function VideoPlayer({
  video,
  handleVideoEnded,
}: {
  video: TVideo;
  handleVideoEnded: () => void;
}) {
  const { videoMeta, handleUpdateVideoMeta } = useVideosContext();
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [videoProgress, setVideoProgress] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const handleLoadedMetadata = () => {
    setVideoDuration(videoRef.current!.duration);
    setIsVideoPlaying(true);
  };

  useEffect(() => {
    if (videoRef) videoRef.current?.focus();
    if (videoMeta) {
      const videoMetaInfo = videoMeta.find((item) => item.id === video.id);
      if (videoMetaInfo) {
        setVideoProgress(videoMetaInfo.timestamp);
        videoRef.current!.currentTime = videoMetaInfo.timestamp;
      }
    } else {
      setVideoProgress(0);
    }
    const saveVideoProgressInterval = setInterval(() => {
      if (videoDuration && videoProgress && videoDuration - videoProgress <= 10)
        handleUpdateVideoMeta(video.id, 0);
      else handleUpdateVideoMeta(video.id, videoRef.current!.currentTime);
    }, 10000);
    return () => clearInterval(saveVideoProgressInterval);
  }, [video.id]);

  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);

  const [videoPlaybackRate, setVideoPlaybackRate] = useState<number>(1);

  // let isVideoLoop = false;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleVideoProgressBarUpdate = () => {
    inputRef.current!.style.backgroundSize =
      (videoProgress! / videoDuration!) * 100 + "%";
    setVideoProgress(videoRef.current!.currentTime);
  };
  const handleVideoProgressChange = (timeStamp: number) => {
    videoRef.current!.currentTime = timeStamp;
    setVideoProgress(timeStamp);
  };

  const handleKeyboardShortcuts = (
    e: React.KeyboardEvent<HTMLVideoElement>,
  ) => {
    const key = e.key;
    switch (key) {
      case "ArrowLeft":
      case "j":
        if (videoRef.current?.currentTime)
          handleVideoProgressChange(videoRef.current?.currentTime - 5);
        break;
      case "ArrowRight":
      case "l":
        if (videoRef.current?.currentTime)
          handleVideoProgressChange(videoRef.current?.currentTime + 5);
        break;
      case " ":
      case "k":
        handlePlayPauseToggle();
        break;
      case ">":
        if (videoPlaybackRate < 2.5)
          handlePlaybackRate((videoPlaybackRate + 0.5).toString());
        break;
      case "<":
        if (videoPlaybackRate > 0.5)
          handlePlaybackRate((videoPlaybackRate - 0.5).toString());
        break;
      case "m":
        handleVideoVolume();
        break;
      case "ArrowDown":
        if (videoRef.current?.volume && videoRef.current?.volume > 0)
          videoRef.current.volume -= 0.05;
        break;
      case "ArrowUp":
        if (videoRef.current?.volume && videoRef.current?.volume < 1)
          videoRef.current.volume += 0.05;
        break;
      default:
        break;
    }
  };

  const videoHasEnded = () => {
    handleVideoEnded();
  };

  // controls
  // progress bar
  // const handleProgressBar = () => {};
  // play/pause
  const handlePlayPauseToggle = () => {
    if (isVideoPlaying) {
      videoRef.current?.pause();
      setIsVideoPlaying(false);
    } else {
      // videoRef.current.play
      setIsVideoPlaying(true);
      videoRef.current?.play().catch(() => setIsVideoPlaying(false));
    }
  };

  // speed control
  const handlePlaybackRate = (newPlaybackRate: string) => {
    videoRef.current!.playbackRate = parseFloat(newPlaybackRate);
    setVideoPlaybackRate(parseFloat(newPlaybackRate));
  };

  // volume
  const handleVideoVolume = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted((prev) => !prev);
    }
  };

  // fullscreen
  const handleFullscreenToggle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const element = e.currentTarget.closest("figure");
    if (element && !document.fullscreenElement) {
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsVideoFullscreen((prev) => !prev);
  };

  return (
    <div>
      <div className="videoBg"></div>
      <figure
        id="videoContainer"
        className="relative rounded-xl group my-2 bg-black text-white/70 max-w-[1280px] max-h-[720px] m-auto"
        data-fullscreen={false}
      >
        <video
          ref={videoRef}
          onContextMenu={(e) => e.preventDefault()} // disable context menu
          src={video.sources[0]}
          autoFocus={true}
          autoPlay={isVideoPlaying}
          // controls
          // loop={isVideoLoop}
          controlsList="nofullscreen nodownload"
          disablePictureInPicture={true}
          muted={isVideoMuted}
          title={video.title}
          poster={video.thumb}
          className="rounded-xl m-auto h-full w-full"
          height={720}
          width={1280}
          onTimeUpdate={handleVideoProgressBarUpdate}
          onEnded={videoHasEnded}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={handlePlayPauseToggle}
          onKeyDown={(e) => handleKeyboardShortcuts(e)}
        ></video>
        {/* controls */}
        {videoRef.current && (
          <div className="controls absolute bottom-0 duration-200 ease-out opacity-0 group-hover:opacity-100 w-full flex flex-col justify-center bg-black/70 h-fit pt-1 pb-2 z-[2147483648]">
            {/* controls line 1 */}
            <div className="timeline w-full px-2 h-fit">
              {/* progress bar */}
              {/* <progress */}
              {/*   className="w-full h-2 my-1 bg-[var(--secondary)] rounded-xl cursor-pointer text-[var(--accent)] hover:h-4 hover:my-0 duration-100 m-auto" */}
              {/*   value={20} */}
              {/*   max={100} */}
              {/* > */}
              <input
                className="w-full h-4"
                ref={inputRef}
                type="range"
                value={videoProgress || 0}
                max={videoDuration || 0}
                onChange={(e) => {
                  handleVideoProgressChange(e.target.valueAsNumber);
                }}
              />
              {/* <CircleSVG className="bg-[var(--accent)] text-[var(--accent)]" /> */}
              {/* </progress> */}
            </div>
            {/* controls line 2 */}
            <div className="flex justify-between w-full md:px-2 h-fit">
              {/* play pause and duration */}
              <div className="flex md:gap-4">
                {/* play/pause */}
                <button
                  className="cursor-pointer bg-transparent"
                  id="playpause"
                  onClick={handlePlayPauseToggle}
                  title={` ${isVideoPlaying ? "Pause" : "Play"} `}
                >
                  {isVideoPlaying ? <PauseSVG /> : <PlaySVG />}
                </button>
                {/* duration */}
                <div className="hidden md:block">
                  {timeFormat(videoRef.current.currentTime)}/
                  {timeFormat(videoDuration || 0)}
                </div>
              </div>
              {/* playback rate,loop, volume and fullscreen controls */}
              <div className="flex gap-4">
                {/* playback rate control */}
                <div className="flex gap-1">
                  <GaugeSVG />
                  <select
                    className="bg-transparent me-2 p-0"
                    value={videoPlaybackRate}
                    onChange={(e) => handlePlaybackRate(e.target.value)}
                  >
                    <option value="0.5">0.5</option>
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                  </select>
                </div>
                {/* loop */}
                {/* <button onClick={handleVideoLoop}> */}
                {/*   <LoopSVG /> */}
                {/* </button> */}
                {/* volume */}
                <div className="group/vol flex items-center w-fit">
                  <button
                    onClick={handleVideoVolume}
                    title="Mute"
                  >
                    {!isVideoMuted ? <VolumeSVG /> : <VolumeMutedSVG />}
                  </button>
                  <div className="md:group-hover/vol:inline-block hover:block overflow-hidden">
                    <input
                      className="w-0 h-0 translate-x-[5rem] border-2 mx-2 group-hover/vol:w-24 group-hover/vol:translate-x-0 duration-300"
                      type="range"
                      value={videoRef.current.volume * 100}
                      min={0}
                      max={100}
                      onChange={(e) => {
                        videoRef.current!.volume =
                          parseInt(e.target.value) / 100;
                      }}
                    />
                  </div>
                </div>
                {/* fullscreen */}
                <button
                  id="fullscreen"
                  onClick={(e) => handleFullscreenToggle(e)}
                  title="Fullscreen"
                  aria-label="fullscreen video toggle"
                >
                  {isVideoFullscreen ? (
                    <FullscreenMinSVG />
                  ) : (
                    <FullscreenMaxSVG />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </figure>
    </div>
  );
}

export default VideoPlayer;

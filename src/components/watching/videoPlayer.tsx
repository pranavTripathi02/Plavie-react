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
  // const [isVideoLoop, setIsVideoLoop] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const handleLoadedMetadata = () => {
    setVideoDuration(videoRef.current!.duration);
    setIsVideoPlaying(true);
  };

  useEffect(() => {
    if (videoMeta) {
      const videoMetaInfo = videoMeta.find((item) => item.id === video.id);
      // console.log(videoMetaInfo);
      if (videoMetaInfo) {
        // setVideoProgress(videoMetaInfo.timestamp);
        videoRef.current!.currentTime = videoMetaInfo.timestamp;
      }
    } else {
      setVideoProgress(0);
    }
    const saveVideoProgressInterval = setInterval(() => {
      handleUpdateVideoMeta(video.id, videoRef.current!.currentTime);
    }, 10000);
    return () => clearInterval(saveVideoProgressInterval);
  }, []);

  const [isVideoFullscreen, setIsVideoFullscreen] = useState(false);

  // const [videoPlaybackRate, setVideoPlaybackRate] = useState(1);

  // let isVideoLoop = false;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // console.log(isVideoPlaying);

  // save video progress every 10 seconds
  // const handleTimeUpdate = (timeStamp: number) => {
  //   // console.log(videoProgress);
  //   setVideoProgress(parseInt(timeStamp.toFixed(0)) / 1000);
  // };

  const handleVideoProgressBarUpdate = () => {
    // const parsedTime = parseInt((timestamp / 1000).toFixed(0));
    // console.log(inputRef.current!.style.backgroundSize);
    inputRef.current!.style.backgroundSize =
      (videoProgress! / videoDuration!) * 100 + "%";
    // console.log(inputRef.current!.style.backgroundSize);
    setVideoProgress(videoRef.current!.currentTime);
  };
  const handleVideoProgressChange = (timeStamp: number) => {
    // console.log(timeStamp);
    // const parsedTime = parseInt((timeStamp / 1000).toFixed(0));
    // const newTime = throttle(() => timeFormat(parsedTime), 1000)();
    // console.log(videoProgress, videoDuration);
    videoRef.current!.currentTime = timeStamp;
    setVideoProgress(timeStamp);
  };

  // const navigate = useNavigate();
  const videoHasEnded = () => {
    // console.log("video has ended");
    handleVideoEnded();
    // navigate("/");
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
  // video progress
  // const handleVideoProgress = () => {
  //   setIsVideoPlaying((prev) => !prev);
  // };
  // loop control
  // const handleVideoLoop = () => {
  //   // setIsVideoLoop((prev) => !prev);
  //   isVideoLoop = !isVideoLoop;
  // };
  // speed control
  const handlePlaybackRate = (newPlaybackRate: number) => {
    videoRef.current!.playbackRate = newPlaybackRate;
    // setVideoPlaybackRate(newPlaybackRate);
  };
  // volume
  const handleVideoVolume = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted((prev) => !prev);
    }
  };
  // fullscreen
  const handleFullscreenToggle = () => {
    videoRef.current
      ?.requestFullscreen()
      .then(() => setIsVideoFullscreen((prev) => !prev));
  };
  return (
    <div>
      <div className="videoBg"></div>
      <figure
        id="videoContainer"
        className="relative rounded-xl group w-full h-full my-2 bg-black text-white/70"
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
          className="rounded-xl m-auto w-full"
          height={720}
          width={1280}
          onTimeUpdate={handleVideoProgressBarUpdate}
          onEnded={videoHasEnded}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={handlePlayPauseToggle}
        ></video>
        {/* controls */}
        {videoRef.current && (
          <div className="controls absolute bottom-0 duration-200 ease-out opacity-0 group-hover:opacity-100 w-full flex flex-col justify-center bg-black/70 h-fit pt-0 pb-2">
            {/* controls line 1 */}
            <div className="timeline w-full px-2 h-fit">
              {/* progress bar */}
              {/* <progress */}
              {/*   className="w-full h-2 my-1 bg-[var(--secondary)] rounded-xl cursor-pointer text-[var(--accent)] hover:h-4 hover:my-0 duration-100 m-auto" */}
              {/*   value={20} */}
              {/*   max={100} */}
              {/* > */}
              <input
                className="w-full h-2"
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
                <button onClick={() => handlePlaybackRate(1)}>
                  <GaugeSVG />
                </button>
                {/* loop */}
                {/* <button onClick={handleVideoLoop}> */}
                {/*   <LoopSVG /> */}
                {/* </button> */}
                {/* volume */}
                <div className="group/vol flex items-center">
                  <button onClick={handleVideoVolume}>
                    {!isVideoMuted ? <VolumeSVG /> : <VolumeMutedSVG />}
                  </button>
                  <div className="hidden md:group-hover/vol:inline-block">
                    <input
                      className="w-0 border-2 mx-2 group-hover/vol:w-24 duration-400"
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
                  onClick={handleFullscreenToggle}
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

import { useState } from "react";
import { TVideo } from "../../types";
import ChevronDown from "../../assets/chevronDown.svg?react";
import ChevronUp from "../../assets/chevronUp.svg?react";
import "./videoPlayer.css";
// import { useNavigate } from "react-router-dom";
import VideoPlayer from "./videoPlayer";

function ViewVideo({ video }: { video: TVideo | undefined }) {
  const [descIsActive, setDescIsActive] = useState(false);

  return (
    <div className="pb-4 px-1 bg-black/20 rounded-xl w-full">
      {/* black bg behind vid*/}
      {/* <div className="absolute z-[-1] w-screen left-0 top-0 bottom-0 border-2 bg-black" /> */}
      {video && (
        <>
          <VideoPlayer video={video} />
          {/* meta */}
          <div>
            <h2>{video.title}</h2>
            <div
              className="flex cursor-pointer select-none"
              onClick={() => setDescIsActive((prev) => !prev)}
            >
              <p>See video description</p>
              <h4>{descIsActive ? <ChevronUp /> : <ChevronDown />}</h4>
            </div>
            <div
              className={`duration-100 ${
                descIsActive ? "translate-y-0" : "-translate-y-full"
              }`}
            >
              <span className={`${descIsActive ? "" : "hidden"}`}>
                {video.description}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewVideo;

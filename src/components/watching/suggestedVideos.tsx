import { Link } from "react-router-dom";
import baseUrl from "../../api/baseUrl";
import useVideosContext from "../../hooks/useVideosContext";
import ChevronDownSVG from "../../assets/chevronDown.svg?react";
import { useState } from "react";

function SuggestedVideos() {
  const [numberOfSuggestions, setNumberOfSuggestions] = useState(5);
  const [showMoreBtnState, setShowMoreBtnState] = useState(true);
  const { videoList } = useVideosContext();

  const handleIncreaseSuggestions = () => {
    if (numberOfSuggestions + 5 < videoList.length)
      setNumberOfSuggestions((prev) => prev + 5);
    else setShowMoreBtnState(false);
  };

  return (
    <div>
      <h5>Similar Videos</h5>
      <div className="flex flex-col gap-4">
        {videoList &&
          videoList.map((video, idx) => {
            if (idx < numberOfSuggestions)
              return (
                <Link
                  to={`/watch?vid=${video.id}`}
                  // className="bg-[var(--secondary-2)] w-full "
                  key={video.id}
                >
                  <div className="w-full rounded-md flex gap-2">
                    <img
                      src={`${baseUrl}${video.thumb}`}
                      alt="thumbnail for video"
                      width={128}
                      height={96}
                      className="rounded-lg"
                    />
                    <div className="flex flex-col">
                      <span>{video.title}</span>
                      <span className="opacity-50">{video.subtitle}</span>
                    </div>
                  </div>
                </Link>
              );
          })}
      </div>
      {showMoreBtnState && (
        <div>
          <button
            className="w-fit px-4 py-2 mx-auto flex gap-4 justify-center my-4 rounded-md bg-[var(--secondary-2)]"
            onClick={handleIncreaseSuggestions}
          >
            Show More
            <ChevronDownSVG />
          </button>
        </div>
      )}
    </div>
  );
}

export default SuggestedVideos;

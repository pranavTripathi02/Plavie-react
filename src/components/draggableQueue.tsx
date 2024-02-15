// import { TVideo } from "../types";
import DragSVG from "../assets/drag.svg?react";
import baseUrl from "../api/baseUrl";
import "./draggableQueue.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import usePlaylistContext from "../hooks/usePlaylistContext";
import useVideosContext from "../hooks/useVideosContext";
// import { TPlaylist } from "../context/playlistContext";

function DraggableQueue() {
  const { currentPlaylist, setCurrentPlaylist, updatePlaylistOrder } =
    usePlaylistContext();
  const playlistQueue = currentPlaylist?.playlistContents;

  const { videosList } = useVideosContext();
  const [draggingItemIdx, setDraggingItemIdx] = useState<number | null>(null);

  const currentPlaylistVideos = videosList.filter(
    (video) => currentPlaylist?.playlistContents?.includes(video.id),
  );

  if (!currentPlaylist?.playlistId) {
    return <div>No playlist selected</div>;
  }
  if (currentPlaylistVideos.length < 1) {
    return <div>Queue is empty</div>;
  }

  const handleDragBehind = (
    e: React.DragEvent<HTMLDivElement>,
    str: "start" | "end",
  ) => {
    // console.log(e.currentTarget);
    if (str === "start") {
      e.currentTarget.closest(".queueItem")?.classList.add("draggingOver");
    } else {
      e.currentTarget.closest(".queueItem")?.classList.remove("draggingOver");
    }
  };

  const handleDrag = (
    e: React.DragEvent<HTMLDivElement>,
    str: "start" | "end",
  ) => {
    if (str === "start") {
      const newDraggingItem = parseInt(
        e.currentTarget.closest(".queueItem")?.querySelector(".queue-index")
          ?.innerHTML || "",
      );
      setDraggingItemIdx(newDraggingItem);

      e.currentTarget.classList.add("dragging");
    } else {
      e.currentTarget.classList.remove("dragging");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const newIdxString = e.currentTarget
      .closest(".queueItem")
      ?.querySelector(".queue-index")?.innerHTML;
    const newIdx = parseInt(newIdxString!);
    // console.log(newIdx, draggingItem);

    const newQueue = playlistQueue!.map((playlistItem) => {
      if (playlistItem === draggingItemIdx) playlistItem = newIdx;
      else if (playlistItem === newIdx) playlistItem = draggingItemIdx!;
      return playlistItem;
    });

    updatePlaylistOrder({
      playlistId: currentPlaylist.playlistId,
      newPlaylistContents: newQueue,
    });

    setDraggingItemIdx(null);
  };

  return (
    <div>
      {currentPlaylistVideos.map((video) => (
        <div
          className="queueItem"
          key={video.id}
          draggable={true}
          // dragover used to recheck hover
          // onDragOver={(e) => handleDragBehind(e, "start")}
          onDragLeave={(e) => handleDragBehind(e, "end")}
          onDragStart={(e) => handleDrag(e, "start")}
          onDragEnd={(e) => handleDrag(e, "end")}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e)}
        >
          <Link
            to={`/watch?vid=${video.id}`}
            onClick={() => {
              // setCurrentPlaylist({
              //   ...currentPlaylist,
              //   playlistIdx:
              //     (currentPlaylist.playlistContents?.indexOf(video.id) || 0) +
              //     1,
              // });

              console.log(
                currentPlaylist,
                (currentPlaylist.playlistContents?.indexOf(video.id) || 0) + 1,
              );
            }}
          >
            <div
              className={`relative flex gap-8 items-center my-2 ${
                currentPlaylist.playlistIdx === video.id
                  ? "bg-[var(--text)] text-[var(--bg)]"
                  : "bg-[var(--secondary-2)] text-[var(--text)]"
              } rounded-md px-4 select-none`}
            >
              <div className="flex gap-4 items-center z-20">
                {/* drag video */}
                <div className="cursor-grabbing me-2">
                  <span className="hidden queue-index">{video.id}</span>
                  <DragSVG />
                </div>
                {/* video thumbnail */}
                <div>
                  <img
                    src={`${baseUrl}${video.thumb}`}
                    alt="video thumbnail"
                    width="100"
                  />
                </div>
                {/* video title */}
                <div>
                  <span>{video.title}</span>
                </div>
                {/* for consistent styling */}
                {/* <div className="absolute left-0 right-0 top-0 bottom-0"></div> */}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default DraggableQueue;

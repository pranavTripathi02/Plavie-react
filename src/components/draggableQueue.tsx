import DragSVG from "../assets/drag.svg?react";
import baseUrl from "../api/baseUrl";
import "./draggableQueue.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import usePlaylistContext from "../hooks/usePlaylistContext";
import useVideosContext from "../hooks/useVideosContext";
import { TVideo } from "../types";

function DraggableQueue() {
  const { playlists, currentPlaylist, updatePlaylist } = usePlaylistContext();
  const playlistQueue = currentPlaylist?.playlistContents;

  const { videoList } = useVideosContext();
  const [draggingItemIdx, setDraggingItemIdx] = useState<number | null>(null);

  const currentPlaylistVideos: TVideo[] = [];
  currentPlaylist?.playlistContents?.forEach((idx) => {
    const foundVideo = videoList.find((item) => item.id === idx);
    if (foundVideo) return currentPlaylistVideos.push(foundVideo);
  });

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
    e.stopPropagation();
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
      setDraggingItemIdx(playlistQueue!.indexOf(newDraggingItem));

      e.currentTarget.classList.add("dragging");
    } else {
      e.currentTarget.classList.remove("dragging");
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.closest(".queueItem")?.classList.remove("draggingOver");
    const newIdxString = e.currentTarget
      .closest(".queueItem")
      ?.querySelector(".queue-index")?.innerHTML;
    const newIdx = playlistQueue!.indexOf(parseInt(newIdxString!));
    const oldIdx = draggingItemIdx!;
    const playlistOldItem =
      currentPlaylist.playlistContents[currentPlaylist.playlistIdx];

    const rotateArr = (arr: number[], oldIdx: number, newIdx: number) => {
      const reorderForwards = (
        arr: number[],
        oldIdx: number,
        newIdx: number,
      ) => {
        const temp = arr[oldIdx];

        for (let i = oldIdx; i < newIdx; i++) {
          arr[i] = arr[i + 1];
        }
        arr[newIdx - 1] = temp;

        return arr;
      };
      const reorderReverse = (
        arr: number[],
        oldIdx: number,
        newIdx: number,
      ) => {
        const temp = arr[oldIdx];
        for (let i = oldIdx; i > newIdx; i--) {
          arr[i] = arr[i - 1];
        }
        arr[newIdx] = temp;
        return arr;
      };
      if (oldIdx < newIdx) {
        return reorderForwards(arr, oldIdx, newIdx);
      } else {
        return reorderReverse(arr, oldIdx, newIdx);
      }
    };
    let newQueue = playlistQueue!;
    newQueue = rotateArr(newQueue, oldIdx, newIdx);

    // update playlist order
    currentPlaylist.playlistContents = newQueue;
    // prevent change of currently playing
    currentPlaylist.playlistIdx =
      currentPlaylist.playlistContents.indexOf(playlistOldItem);
    updatePlaylist({
      playlistId: currentPlaylist.playlistId,
      playlist: currentPlaylist,
    });

    setDraggingItemIdx(null);
  };

  return (
    <div>
      {currentPlaylistVideos.map((video) => {
        const currentIdx =
          currentPlaylist.playlistContents?.indexOf(video.id) || 0;
        return (
          <div
            className="queueItem duration-100"
            key={video.id}
            draggable={true}
            onDragStart={(e) => handleDrag(e, "start")}
            onDragEnter={(e) => handleDragBehind(e, "start")}
            onDragLeave={(e) => handleDragBehind(e, "end")}
            onDragEnd={(e) => handleDrag(e, "end")}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e)}
          >
            <Link
              to={`/watch?pid=${
                currentPlaylist.playlistId
              }&pidx=${currentPlaylist.playlistContents?.indexOf(video.id)}`}
              onClick={() => {
                currentPlaylist.playlistIdx =
                  currentPlaylist.playlistContents?.indexOf(video.id) || 0;
                const findInPlaylists = playlists.find(
                  (it) => it.playlistId === currentPlaylist.playlistId,
                );
                if (findInPlaylists)
                  findInPlaylists.playlistIdx = currentPlaylist.playlistIdx;
              }}
            >
              <div
                className={`relative flex gap-8 items-center my-2 h-full ${
                  currentIdx === currentPlaylist.playlistIdx
                    ? "bg-[var(--text)] text-[var(--bg)]"
                    : "bg-[var(--secondary-2)] text-[var(--text)]"
                } rounded-md px-4 select-none`}
              >
                <div className="flex gap-4 items-center z-20 w-full">
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
                      width={120}
                      height={90}
                      className="min-h-[90px] min-w-[120px] bg-black m-auto ms-0"
                    />
                  </div>
                  {/* video title */}
                  <div className="w-full flex flex-col">
                    <span>{video.title}</span>
                    <span className="opacity-50">{video.subtitle}</span>
                  </div>
                  {/* for consistent styling */}
                  <div className="absolute left-0 right-0 top-0 bottom-0"></div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default DraggableQueue;

// import { TVideo } from "../types";
import DragSVG from "../assets/drag.svg?react";
import baseUrl from "../api/baseUrl";
import "./draggableQueue.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import usePlaylistContext from "../hooks/usePlaylistContext";
import useVideosContext from "../hooks/useVideosContext";
import { TVideo } from "../types";
// import { TPlaylist } from "../context/playlistContext";

function DraggableQueue() {
  const { playlists, currentPlaylist, updatePlaylistOrder } =
    usePlaylistContext();
  const playlistQueue = currentPlaylist?.playlistContents;
  // const navigate = useNavigate();

  const { videoList } = useVideosContext();
  const [draggingItemIdx, setDraggingItemIdx] = useState<number | null>(null);

  // const currentPlaylistVideos = videoList.filter(
  //   (video) => currentPlaylist?.playlistContents?.includes(video.id),
  // );
  const currentPlaylistVideos: TVideo[] = [];
  // currentPlaylistVideos = currentPlaylistVideos.push(
  currentPlaylist?.playlistContents?.forEach((idx) => {
    const foundVideo = videoList.find((item) => item.id === idx);
    if (foundVideo) return currentPlaylistVideos.push(foundVideo);
  });
  // );
  // if (!currentPlaylistVideos || currentPlaylistVideos.length < 1)
  //   currentPlaylistVideos = [];
  // console.log(currentPlaylist);

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
    const newIdxString = e.currentTarget
      .closest(".queueItem")
      ?.querySelector(".queue-index")?.innerHTML;
    const newIdx = playlistQueue!.indexOf(parseInt(newIdxString!));
    const oldIdx = draggingItemIdx!;
    // console.log(newIdx, newIdxString, draggingItemIdx);

    // const newQueue = playlistQueue!.map((playlistItem) => {
    //   if (playlistItem === draggingItemIdx) playlistItem = newIdx;
    //   else if (playlistItem === newIdx) playlistItem = draggingItemIdx!;
    //   return playlistItem;
    // });
    //
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
    // if (newIdx < oldIdx) {
    //   rotateArr(newQueue, oldIdx, newIdx);
    // } else {
    //   rotateArr(newQueue, oldIdx, newIdx);
    // }

    // const newQueue = playlistQueue!;

    updatePlaylistOrder({
      playlistId: currentPlaylist.playlistId,
      newPlaylistContents: newQueue,
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
              to={`/watch?vid=${video.id}&pid=${
                currentPlaylist.playlistId
              }&pidx=${currentPlaylist.playlistContents?.indexOf(video.id)}`}
              onClick={() => {
                currentPlaylist.playlistIdx =
                  (currentPlaylist.playlistContents?.indexOf(video.id) || 0) +
                  1;
                const findInPlaylists = playlists.find(
                  (it) => it.playlistId === currentPlaylist.playlistId,
                );
                if (findInPlaylists)
                  findInPlaylists.playlistIdx = currentPlaylist.playlistIdx;
                // navigate(
                //   `/watch?vid=${video.id}&pid=${currentPlaylist.playlistId}&pidx=${currentIdx}`,
                // );
              }}
            >
              <div
                className={`relative flex gap-8 items-center my-2 ${
                  currentIdx === currentPlaylist.playlistIdx
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
        );
      })}
    </div>
  );
}

export default DraggableQueue;

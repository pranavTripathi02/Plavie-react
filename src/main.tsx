import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { VideoContextProvider } from "./context/videosContext.tsx";
import { PlaylistContextProvider } from "./context/playlistContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PlaylistContextProvider>
        <VideoContextProvider>
          <App />
        </VideoContextProvider>
      </PlaylistContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

import React from "react";
import PlaylistsMod from "../Playlists/PlaylistsMod";
// import Visualizer from "./Visualizer";

function PlayerContainer() {
  return (
    <article className="player-container">
      <div className="player">
        {/* <Visualizer /> */}
        <PlaylistsMod title="Your's playlists" />
        <PlaylistsMod title="Recommendations" canCreatePlaylist={false} />
      </div>
    </article>
  );
}

export default PlayerContainer;

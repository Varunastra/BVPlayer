import React from "react";
import PlaylistsMod from "../Playlists/PlaylistsMod";
import { useSelector } from "react-redux";
import LikesPoster from "../../images/likes.png";
// import Visualizer from "./Visualizer";

function PlayerContainer() {
  const playlists = useSelector((state) => state.playlists.all);
  const recommendations = [{
    id: 'liked',
    name: 'Favourite',
    variant: 'likes',
    description: 'Tracks that you actually like',
    poster: LikesPoster,
  }];

  return (
    <article className="player-container">
      <div className="player">
        {/* <Visualizer /> */}
        <PlaylistsMod title="Your's playlists" playlists={playlists} />
        <PlaylistsMod title="Recommendations" playlists={recommendations} canCreatePlaylist={false} />
      </div>
    </article>
  );
}

export default PlayerContainer;

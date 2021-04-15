import React from "react";
import PlayerControls from "./PlayerControls";
import { useSelector } from "react-redux";
import defaultPoster from "../../images/poster.svg";

function TrackInfo() {
  const { title, poster, author } = useSelector(
    (state) => state.playlist.track
  );

  return (
    <div className="control-block">
      <div className="poster-container">
        <img
          src={poster ? `${process.env.REACT_APP_URL}${poster}` : defaultPoster}
          alt="poster"
          className="poster"
        />
      </div>
      <div>
        <strong>{author || "Sample author"}</strong> - {title || "Sample title"}
        <PlayerControls />
      </div>
    </div>
  );
}

export default TrackInfo;

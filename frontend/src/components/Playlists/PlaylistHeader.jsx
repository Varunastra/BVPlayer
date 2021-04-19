import React from "react";
import defaultPoster from "../../images/poster.svg";

function PlaylistHeader({ name, tracks }) {
  return (
    <div className="player-header">
      <img src={defaultPoster} alt={name} className="poster" />
      <section className="info">
        <h1>{name}</h1>
        <div className="songs-count">{tracks.length} songs</div>
      </section>
    </div>
  );
}

export default PlaylistHeader;

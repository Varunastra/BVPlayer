import React from "react";
import defaultPoster from "../../images/poster.svg";

function PlaylistHeader({ name, poster, description = '', tracks }) {
  return (
    <div className="player-header">
      <img src={poster || defaultPoster} alt={name} className="poster" />
      <section className="info">
        <h1>{name}</h1>
        <div className="songs-count">{tracks.length} song{tracks.length > 1 ? 's' : ''}</div>
        <div className="description">{description}</div>
      </section>
    </div>
  );
}

export default PlaylistHeader;

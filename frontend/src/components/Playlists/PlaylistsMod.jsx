import React from "react";
import NewPlaylistMod from "./NewPlaylistMod";
import PlaylistMod from "./PlaylistMod";

export function PlaylistsMod({ playlists, canCreatePlaylist = true, title }) {
  return (
    <div className="playlists-mod">
      <h2>{title}</h2>
      <div className="items">
        {/* <Spinner isLoading={isLoading} />
        <ErrorMessage hasIcon={true} error={error} /> */}
        {playlists &&
          playlists.map((playlist, i) => (
            <PlaylistMod
              key={i}
              playlist={playlist}
              description={playlist.description}
            />
          ))}
        {canCreatePlaylist && <NewPlaylistMod />}
      </div>
    </div>
  );
}

export default PlaylistsMod;

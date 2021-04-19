import React from "react";
import { useSelector } from "react-redux";
import NewPlaylistMod from "./NewPlaylistMod";
import PlaylistMod from "./PlaylistMod";

const fakePlaylists = [
  { name: "Sample title", tracks: [{ title: "SADSADSADSADAD" }], id: 1 },
  { name: "Sample title2", tracks: [], id: 2 },
  { name: "Sample title3", tracks: [{ title: "SADSADSADSADAD" }], id: 3 },
];

export function PlaylistsMod({ trackToAdd, onAddMessage, canCreatePlaylist = true, title }) {
  const playlists = useSelector((state) => state.playlists.all);
  const isLoading = useSelector((state) => state.playlists.isLoading);
  const error = useSelector((state) => state.playlists.error);

  const handleSuccess = (message) => {
    onAddMessage({ text: message, isError: false });
  };

  const handleError = (message) => {
    onAddMessage({ text: message, isError: true });
  };

  return (
    <div className="playlists-mod">
      <h2>{title}</h2>
      <div className="items">
        {/* <Spinner isLoading={isLoading} />
        <ErrorMessage hasIcon={true} error={error} /> */}
        {fakePlaylists &&
          fakePlaylists.map((playlist, i) => (
            <PlaylistMod
              key={i}
              trackToAdd={trackToAdd}
              playlist={playlist}
              handleAddError={handleError}
              handleAddSuccess={handleSuccess}
            />
          ))}
        {canCreatePlaylist && <NewPlaylistMod />}
      </div>
    </div>
  );
}

export default PlaylistsMod;

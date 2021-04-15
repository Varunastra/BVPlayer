import React from "react";
import { Playlist } from "./Playlist";
import { useSelector } from "react-redux";
import { Spinner } from "../UI/Spinner/Spinner";
import NewPlaylist from "./NewPlaylist";
import ErrorMessage from "../UI/Error/ErrorMessage";

export function Playlists({ trackToAdd, onAddMessage, style }) {
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
    <div className="playlists" style={style}>
      <div className="container">
        <Spinner isLoading={isLoading} />
        <ErrorMessage hasIcon={true} error={error} />
        {playlists &&
          playlists.map((playlist) => (
            <Playlist
              trackToAdd={trackToAdd}
              key={playlist.id}
              playlist={playlist}
              handleAddSuccess={handleSuccess}
              handleAddError={handleError}
            />
          ))}
        {!isLoading && !error && !trackToAdd && <NewPlaylist />}
      </div>
    </div>
  );
}

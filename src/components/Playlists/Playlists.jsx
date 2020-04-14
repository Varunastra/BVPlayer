import React from "react";
import { Playlist } from "./Playlist";
import { useSelector } from "react-redux";
import { Spinner } from "../UI/Spinner/Spinner";
import NewPlaylist from "./NewPlaylist";
import ErrorMessage from "../UI/Error/ErrorMessage";

export function Playlists() {
    const playlists = useSelector((state) => state.playlists.all);
    const isLoading = useSelector((state) => state.playlists.isLoading);
    const error = useSelector((state) => state.playlists.error);

    return (
        <div className="playlists">
            <Spinner isLoading={isLoading} />
            <ErrorMessage hasIcon={true} error={error} />
            {playlists &&
                playlists.map((playlist) => (
                    <Playlist key={playlist.id} {...playlist} />
                ))}
            {(!isLoading && !error) && <NewPlaylist />}
        </div>
    );
}
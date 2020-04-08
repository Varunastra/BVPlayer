import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Track } from "./Track";
import { fetchTracks } from "../../actions/playlist";
import { setIsOpen } from "../../actions/playlists";
import { Spinner } from "../UI/Spinner/Spinner";
import playlistLogo from "../../playlist.svg";
import NewTrack from "./NewTrack";

export function Tracks() {
    const tracks = useSelector((state) => state.playlist.tracks);
    const playlist = useSelector((state) => state.playlists.current);
    const isLoading = useSelector((state) => state.playlist.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTracks());
    }, [playlist, dispatch]);

    const onBackClicked = () => {
        dispatch(setIsOpen());
    };

    return (
        <div className="tracks">
            <div className="tracks-header">
                <div className="tracks-playlist">
                    <img
                        className="playlist-icon"
                        src={playlistLogo}
                        alt="Playlist"
                    />
                    <div className="name">{playlist.name}</div>
                </div>
                <i className="fas fa-times fa-lg" onClick={onBackClicked}></i>
            </div>
            <div className="container">
                <Spinner isLoading={isLoading} />
                {tracks.map((track) => (
                    <Track track={track} key={track.id} />
                ))}
                {!isLoading && <NewTrack />}
            </div>
        </div>
    );
}

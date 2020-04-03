import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Track } from "./Track";
import { setTrack } from "../actions/playlist";
import { setIsOpen } from "../actions/playlists";

export function Tracks() {
    const tracks = useSelector(state => state.playlist.tracks);
    const playlist = useSelector(state => state.playlists.current);
    const dispatch = useDispatch();

    const onBackClicked = () => {
        dispatch(setIsOpen());
    }

    useEffect(() => {
        dispatch(setTrack(tracks[0]));
    }, [dispatch, tracks]);

    const tracksRender = tracks.map(track => (
        <Track track={track} key={track.id} />
    ));

    return (
        <div className="tracks">
            <div className="header">
                <div className="playlist"> 
                    <img className="playlist-icon" src={process.env.PUBLIC_URL + "./playlist.svg"} />
                    <div className="name">{playlist.name}</div>
                </div>
                <i className="fas fa-arrow-left fa-lg" onClick={onBackClicked}></i>
            </div>
            <div className="container">{tracksRender}</div>
        </div>
    );
}

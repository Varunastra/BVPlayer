import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Track } from "./Track";
import { setTrack } from "../actions/playlist";

export function Tracks() {
    const tracks = useSelector(state => state.playlist.tracks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTrack(tracks[0]));
    }, [dispatch, tracks]);

    const tracksRender = tracks.map(track => (
        <Track track={track} key={track.id} />
    ));

    return (
        <div className="playlist">
            <div className="container">{tracksRender}</div>
        </div>
    );
}

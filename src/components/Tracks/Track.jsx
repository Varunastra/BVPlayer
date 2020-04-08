import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrack } from "../../actions/playlist";
import defaultPoster from "../../poster.png";

export function Track(props) {
    const current = useSelector(state => state.playlist.track);
    const isPlaying = props.track === current;

    const { title, author, poster } = props.track;
    const dispatch = useDispatch();

    const onTrackClicked = () => {
        dispatch(setTrack(props.track));
    };

    return (
        <div
            className={isPlaying ? "track playing" : "track"}
            onClick={onTrackClicked}
        >
            <img src={poster || defaultPoster} className="poster" alt="poster" />
            <div className="track-info">
                <div>{title || "Enter track name"}</div>
                <small className="author">{author || "Enter author"}</small>
            </div>
        </div>
    );
}

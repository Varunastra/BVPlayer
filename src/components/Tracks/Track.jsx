import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTrack } from "../../actions/playlist";
import defaultPoster from "../../images/poster.svg";
import { useHistory } from "react-router-dom";

export function Track(props) {
    const current = useSelector(state => state.playlist.track);
    const history = useHistory();
    const isPlaying = props.track === current;

    const { title, author, poster, id } = props.track;
    const dispatch = useDispatch();

    const onTrackClicked = () => {
        dispatch(setTrack(props.track));
    };

    const handleLinkClicked = (e) => {
        e.stopPropagation();
        history.push(`/tracks/${id}`);
    };

    return (
        <div
            className={isPlaying ? "track playing" : "track"}
            onClick={onTrackClicked}
        >
            <img src={poster ? `${process.env.REACT_APP_URL}${poster}`: defaultPoster} className="poster" alt="poster" />
            <div className="track-info">
                <div>
                    {title || "Enter track name"}
                </div>
                <small className="author">{author || "Enter author"}</small>
            </div>
            <i className="fas fa-external-link-alt" onClick={handleLinkClicked}></i>
        </div>
    );
}

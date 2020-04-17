import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVolume } from "../../actions/status";

export function VolumeControl({ type }) {
    const dispatch = useDispatch();
    const volume = useSelector(state => state.status.volume);

    const volumeChanged = e => {
        dispatch(setVolume(e.target.value));
    };

    return (
        <div className={`volume-control ${type || ''}`}>
            <span>
                <i className="fa fa-volume-up"></i>
            </span>
            <span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    className="slider"
                    onChange={volumeChanged}
                />
            </span>
        </div>
    );
}

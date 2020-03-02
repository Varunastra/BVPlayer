import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setVolume } from "../actions/settings";

export function VolumeControl() {
    const dispatch = useDispatch();
    const volume = useSelector(state => state.settings.volume);

    const volumeChanged = e => {
        dispatch(setVolume(e.target.value));
    };

    return (
        <div>
            <i className="fa fa-volume-down"></i>
            <input
                type="range"
                min="0"
                max="100"
                value={volume}
                className="slider"
                onChange={volumeChanged}
            />
            <i className="fa fa-volume-up"></i>
        </div>
    );
}

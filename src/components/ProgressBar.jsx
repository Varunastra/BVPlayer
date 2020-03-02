import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlayTime, setIsPlaying, setIsSeeking } from "../actions/status";

export function ProgressBar() {
    const currentTime = useSelector(state => state.status.currentTime);
    const duration = useSelector(state => state.status.duration);
    const isPlaying = useSelector(state => state.status.isPlaying);
    const dispatch = useDispatch();

    const fillPrecent = currentTime / duration;

    const calculateCurrentValue = currentTime => {
        const current_minute = parseInt(currentTime / 60) % 60,
            current_seconds_long = currentTime % 60,
            current_seconds = current_seconds_long.toFixed(),
            current_time =
                (current_minute < 10 ? "0" + current_minute : current_minute) +
                ":" +
                (current_seconds < 10
                    ? "0" + current_seconds
                    : current_seconds);

        return current_time;
    };

    const inputFillStyle = {
        background: `-webkit-linear-gradient(left, green 0%, 
            green ${fillPrecent * 100}%, black ${fillPrecent * 100}%)`
    };

    const onProgressMove = e => {
        const percent = e.target.value;
        dispatch(setIsPlaying(false));
        dispatch(setPlayTime(percent * duration));
        dispatch(setIsPlaying(true));
    };

    return (
        <div className="player-progress">
            <p>
                Oslo <small>by</small> Holy Esque
            </p>
            <span>
                <input
                    value={duration ? fillPrecent : 0}
                    max="1"
                    min="0"
                    style={inputFillStyle}
                    step="0.01"
                    type="range"
                    onChange={onProgressMove}
                />
            </span>
            <small className="start-time">
                {calculateCurrentValue(currentTime)}
            </small>
            <small className="end-time">
                {calculateCurrentValue(duration)}
            </small>
        </div>
    );
}

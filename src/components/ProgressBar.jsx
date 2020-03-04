import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPlayTime, setSeeking } from "../actions/status";
import debounce from "lodash.debounce";

export function ProgressBar() {
    const currentTime = useSelector(state => state.status.currentTime);
    const duration = useSelector(state => state.status.duration);
    const dispatch = useDispatch();

    const isMouseDown = useRef(false);
    const [progress, setProgress] = useState(0);

    const fillPrecent = currentTime / duration;

    useEffect(() => {
        if (!isMouseDown.current) {
            setProgress(fillPrecent);
        }
    }, [fillPrecent]);

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

    const progressFillStyle = {
        background: `-webkit-linear-gradient(left, green 0%, 
        green ${progress * 100}%, black ${progress * 100}%)`
    };

    const setBarProgress = e => {
        const rect = e.target.getBoundingClientRect();
        const x = e.nativeEvent.clientX - rect.left;
        setProgress(x / rect.width);
    };

    const onMouseMove = e => {
        if (isMouseDown.current) {
            setBarProgress(e);
        }
    };

    const onMouseDown = e => {
        isMouseDown.current = true;
    };

    const onMouseUp = e => {
        //setBarProgress(e);
        dispatch(setSeeking(true));
        dispatch(setPlayTime(progress * duration));
        isMouseDown.current = false;
    };

    return (
        <div className="player-progress">
            <p>
                Oslo <small>by</small> Holy Esque
            </p>
            <span>
                <div
                    className="full-progress"
                    style={progressFillStyle}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseDown={onMouseDown}
                >
                    {/* <div
                        className="current-progress"
                    /> */}
                </div>
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

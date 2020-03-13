import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsPlaying, setPlayTime, setSeeking } from "../../actions/status";
import { getContext } from "../../helpers/audioBuffer";
import { VolumeControl } from "./VolumeControl";
import { nextTrack, prevTrack } from "../../actions/playlist";

export function PlayerControls() {
    const dispatch = useDispatch();
    const isPlaying = useSelector(state => state.status.isPlaying);

    const onPlay = () => {
        getContext()
            .resume()
            .then(() => {
                dispatch(setIsPlaying(true));
            });
    };

    const onPause = () => {
        dispatch(setSeeking(true));
        dispatch(setIsPlaying(false));
    };

    const onStop = () => {
        dispatch(setSeeking(true));
        dispatch(setIsPlaying(false));
        dispatch(setPlayTime(0));
    };

    const onFoward = () => {
        dispatch(nextTrack());
    }

    const onBackward = () => {
        dispatch(prevTrack());
    }

    return (
        <>
            <div className="play-controls">
                {isPlaying ? (
                    <i
                        className="fa fa-pause"
                        onClick={onPause}
                        aria-hidden="true"
                    ></i>
                ) : (
                    <i
                        className="fa fa-play"
                        onClick={onPlay}
                        aria-hidden="true"
                    ></i>
                )}
                <i
                    className="fa fa-stop"
                    onClick={onStop}
                    aria-hidden="true"
                ></i>
                <i className="fa fa-backward" onClick={onBackward}></i>
                <i className="fa fa-forward" onClick={onFoward}></i>
            </div>
            <VolumeControl />
        </>
    );
}

import React from "react";
import { useDispatch } from "react-redux";
import { setIsPlaying, setPlayTime, setSeeking } from "../actions/status";
import { VolumeControl } from "./VolumeControl";
import { getContext } from "../audioBuffer";

export function PlayerControls() {
  const dispatch = useDispatch();

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

  return (
    <div>
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause}>Pause</button>
      <button onClick={onStop}>Stop</button>
      <VolumeControl />
    </div>
  );
}

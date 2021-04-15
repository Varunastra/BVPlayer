import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsPlaying, setPlayTime, setSeeking } from "../../actions/status";
import { getContext } from "../../helpers/audioBuffer";
import { VolumeControl } from "./VolumeControl";
import { nextTrack, prevTrack } from "../../actions/playlist";
import {
  BackwardOutlined,
  BorderOutlined,
  ForwardOutlined,
  PauseOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

function PlayerControls() {
  const dispatch = useDispatch();
  const isPlaying = useSelector((state) => state.status.isPlaying);

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
  };

  const onBackward = () => {
    dispatch(prevTrack());
  };

  return (
    <>
      <div className="play-controls">
        {isPlaying ? (
          <PauseOutlined onClick={onPause} />
        ) : (
          <PlayCircleOutlined onClick={onPlay} />
        )}
        <BorderOutlined onClick={onStop} />
        <BackwardOutlined onClick={onBackward} />
        <ForwardOutlined onClick={onFoward} />
      </div>
      <VolumeControl />
    </>
  );
}

export default PlayerControls;

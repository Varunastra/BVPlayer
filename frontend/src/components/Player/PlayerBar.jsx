import React from "react";
import defaultPoster from "../../images/poster.svg";
import PlayerProgressBar from "./PlayerProgressBar";
import { useSelector, useDispatch } from "react-redux";
import { nextTrack, prevTrack } from "../../actions/playlist";
import { setIsPlaying } from "../../actions/status";
import { VolumeControl } from "./VolumeControl";
import { useState } from "react";
import {
  BackwardOutlined,
  ForwardOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  SoundOutlined,
} from "@ant-design/icons";

export function PlayerBar() {
  const track = useSelector((state) => state.playlist.track);
  const isPlaying = useSelector((state) => state.status.isPlaying);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

  const dispatch = useDispatch();

  const handleFoward = () => {
    dispatch(nextTrack());
  };

  const handlePlay = () => {
    dispatch(setIsPlaying());
  };

  const handleBackward = () => {
    dispatch(prevTrack());
  };

  const onVolumeEnter = (e) => {
    setIsVolumeVisible(true);
  };

  const onVolumeLeave = (e) => {
    setIsVolumeVisible(false);
  };

  return (
    <div className="player-bar">
      <PlayerProgressBar />
      <div className="track-info">
        <div className="player-controls">
          <BackwardOutlined onClick={handleBackward} />
          {isPlaying ? (
            <PauseCircleOutlined onClick={handlePlay} />
          ) : (
            <PlayCircleOutlined onClick={handlePlay} />
          )}
          <ForwardOutlined onClick={handleFoward} />
        </div>
        <img
          src={track.poster || defaultPoster}
          alt="Poster"
        />
        <div className="description">
          <div className="title">{track.title}</div>
          <div className="author">{track.artist}</div>
        </div>
        <div
          className="volume"
          onMouseEnter={onVolumeEnter}
          onMouseLeave={onVolumeLeave}
        >
          <SoundOutlined />
          {isVolumeVisible && <VolumeControl type="vertical" />}
        </div>
      </div>
    </div>
  );
}

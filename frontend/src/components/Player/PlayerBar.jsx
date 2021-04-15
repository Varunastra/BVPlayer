import React from 'react';
import defaultPoster from "../../images/poster.svg";
import PlayerProgressBar from './PlayerProgressBar';
import { useSelector, useDispatch } from 'react-redux';
import { nextTrack, prevTrack } from '../../actions/playlist';
import { setIsPlaying } from '../../actions/status';
import { VolumeControl } from './VolumeControl';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export function PlayerBar() {
    const track = useSelector(state => state.playlist.track);
    const isPlaying = useSelector(state => state.status.isPlaying);
    const [isVolumeVisible, setIsVolumeVisible] = useState(false);
    const location = useLocation();

    const dispatch = useDispatch();

    const handleFoward = () => {
        dispatch(nextTrack());
    }

    const handlePlay = () => {
        dispatch(setIsPlaying());
    };

    const handleBackward = () => {
        dispatch(prevTrack());
    };

    const onVolumeEnter = e => {
        setIsVolumeVisible(true);
    };

    const onVolumeLeave = e => {
        setIsVolumeVisible(false);
    };

    return (
        <div className="player-bar">
            {location.pathname !== '/' && (
                <>
                    <PlayerProgressBar />
                    <div className="track-info">
                        <div className="player-controls">
                            <i className="fa fa-backward" onClick={handleBackward} />
                            {isPlaying
                                ? <i className="fa fa-pause" onClick={handlePlay} />
                                : <i className="fa fa-play" onClick={handlePlay} />}
                            <i className="fa fa-forward" onClick={handleFoward} />
                        </div>
                        <img src={track.poster ? `${process.env.REACT_APP_URL}${track.poster}` : defaultPoster} alt="Poster" />
                        <div className="description">
                            <div className="title">
                                {track.title}
                            </div>
                            <div className="author">
                                {track.author}
                            </div>
                        </div>
                        <div className="volume" onMouseEnter={onVolumeEnter} onMouseLeave={onVolumeLeave}>
                            <i className="fa fa-volume-up" />
                            {isVolumeVisible && <VolumeControl type="vertical" />}
                        </div>
                    </div>
                </>)
            }
        </div>
    )
};

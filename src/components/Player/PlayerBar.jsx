import React from 'react';
import defaultPoster from "../../images/poster.svg";
import PlayerProgressBar from './PlayerProgressBar';
import { useSelector, useDispatch } from 'react-redux';
import { nextTrack, prevTrack } from '../../actions/playlist';
import { setIsPlaying } from '../../actions/status';
import { VolumeControl } from './VolumeControl';

function PlayerBar() {
    const track = useSelector(state => state.playlist.track);
    const isPlaying = useSelector(state => state.status.isPlaying);
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
    
    return (
        <div className="player-bar">
            <PlayerProgressBar />
            <div className="track-info">
                <div className="player-controls">
                    <i className="fa fa-backward" onClick={handleBackward}/>
                    {isPlaying 
                        ?  <i className="fa fa-pause" onClick={handlePlay} />
                        :  <i className="fa fa-play" onClick={handlePlay} /> }
                    <i className="fa fa-forward" onClick={handleFoward} />
                </div>
                <img  src={track.poster ? `${process.env.REACT_APP_URL}${track.poster}` : defaultPoster} alt="Poster" />
                <div className="description">
                    <div className="title">
                        {track.title}
                    </div>
                    <div className="author">
                        {track.author}
                    </div>
                </div>
                <div className="volume">
                    <VolumeControl />
                </div>
            </div>        
        </div>
    )
}

export default PlayerBar;

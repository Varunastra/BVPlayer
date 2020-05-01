import React from 'react'
import PlayerProgressBar from "./PlayerProgressBar";
import TrackInfo from "./TrackInfo";
import Visualizer from './Visualizer';

function PlayerContainer({ audio }) {
    return (
        <article className="player-container">
            <div className="player">
                <Visualizer audio={audio} />
                <TrackInfo />
                <PlayerProgressBar />
            </div>
        </article>
    )
};

export default PlayerContainer;

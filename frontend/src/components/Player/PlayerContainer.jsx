import React from 'react'
import PlayerProgressBar from "./PlayerProgressBar";
import TrackInfo from "./TrackInfo";
import Visualizer from './Visualizer';

function PlayerContainer() {
    return (
        <article className="player-container">
            <div className="player">
                <Visualizer />
                <TrackInfo />
                <PlayerProgressBar />
            </div>
        </article>
    )
};

export default PlayerContainer;

import React from 'react';
import { useSelector } from 'react-redux';
import { Player } from './components/Player/Player';
import { useLocation } from 'react-router-dom';
import PlayerBar from './components/Player/PlayerBar';

function MiddleWares() {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const location = useLocation();

    const isHomePage = location.pathname === "/";

    return (
        <>
            {isAuthenticated && <Player />}
            {(!isHomePage && isAuthenticated) && <PlayerBar />}
        </>
    )
}

export default MiddleWares;
